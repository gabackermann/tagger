import { Injectable, OnModuleInit } from '@nestjs/common';
import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason,
} from '@whiskeysockets/baileys';
import * as qrcode from 'qrcode-terminal';

@Injectable()
export class WhatsappService implements OnModuleInit {
  private sock: any;
  private processedMessageIds: Set<string> = new Set(); // Armazena os IDs das mensagens processadas

  // Array de grupos vinculados ao bot
  private registeredGroups = [
    // {
    //   responsibleId: '5527988534645', // Número do responsável (sem @s.whatsapp.net)
    //   keyword: 'Ilha', // Palavra-chave do grupo
    // },
    {
      responsibleId: '5527988534645', // Número do responsável (sem @s.whatsapp.net)
      keyword: 'Testebot', // Palavra-chave do grupo
    },
    // {
    //   responsibleId: '5517999754660',
    //   keyword: 'Takahashi',
    // },
    // {
    //   responsibleId: '5511972115879',
    //   keyword: 'pokéhub',
    // },
  ];

  async onModuleInit() {
    console.log('Iniciando conexão com WhatsApp...');
    await this.connectToWhatsApp();
  }

  private async connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState('./auth_info');

    this.sock = makeWASocket({
      auth: state,
      printQRInTerminal: true,
    });

    this.sock.ev.on('creds.update', saveCreds);

    this.sock.ev.on('connection.update', (update) => {
      const { connection, lastDisconnect } = update;
      if (connection === 'close') {
        const shouldReconnect =
          (lastDisconnect?.error as any)?.output?.statusCode !==
          DisconnectReason.loggedOut;
        if (shouldReconnect) {
          this.connectToWhatsApp();
        }
      } else if (connection === 'open') {
        console.log('✅ Conectado ao WhatsApp!');
      }
    });

    // Monitorando mensagens recebidas
    this.sock.ev.on('messages.upsert', async (m) => {
      const message = m.messages[0];
      if (!message.message) return;

      // Se já processamos essa mensagem, não a processamos novamente
      if (this.processedMessageIds.has(message.key.id)) {
        return;
      }

      const remoteJid = message.key.remoteJid;
      const text =
        message.message.conversation ||
        message.message.extendedTextMessage?.text;

      // Apenas processa mensagens de grupos
      if (!remoteJid?.endsWith('@g.us')) return;

      const groupMetadata = await this.sock.groupMetadata(remoteJid);

      // Verifica se o grupo contém alguma palavra-chave do array
      const groupConfig = this.registeredGroups.find((group) =>
        groupMetadata.subject
          .toLowerCase()
          .includes(group.keyword.toLowerCase()),
      );

      if (!groupConfig) {
        console.log(
          `🚫 O grupo "${groupMetadata.subject}" não está registrado.`,
        );
        return;
      }

      console.log(`✅ O grupo "${groupMetadata.subject}" está registrado!`);

      const sender = message.key.participant || message.participant; // Quem enviou a mensagem
      console.log(remoteJid);
      console.log(sender);
      const isAdmin = await this.isUserAdmin(remoteJid, sender);
      console.log(isAdmin);
      if (isAdmin) {
        if (text?.toLowerCase() === '!mencionar') {
          await this.mentionAll(remoteJid);
        }
      } else {
        console.log('nao é admin');
      }

      // Registra a mensagem como processada
      this.processedMessageIds.add(message.key.id);
    });

    this.sock.ev.on('qr', (qr) => {
      qrcode.generate(qr, { small: true }, (qrcodeString) => {
        console.log(`QR Code:\n${qrcodeString}`);
      });
    });
  }

  // Função para verificar se o usuário é admin do grupo
  private async isUserAdmin(
    groupJid: string,
    userJid: string,
  ): Promise<boolean> {
    const groupMetadata = await this.sock.groupMetadata(groupJid);

    // Pegamos a lista de participantes que são administradores
    const admins = groupMetadata.participants
      .filter((p) => p.admin === 'admin' || p.admin === 'superadmin') // Filtra apenas admins/superadmins
      .map((p) => p.id); // Mapeia apenas os IDs dos administradores

    // Retorna true se o userJid estiver na lista de admins
    return Boolean(admins.includes(userJid));
  }

  // Função para mencionar todos os membros do grupo
  async mentionAll(groupJid: string) {
    const groupMetadata = await this.sock.groupMetadata(groupJid);
    const participants = groupMetadata.participants.map((p) => p.id);

    // Criando um texto com menções invisíveis
    const invisibleChar = '\u200B'; // Caractere invisível (Zero Width Space)
    const mentionsText = participants.map(() => invisibleChar).join('');

    await this.sock.sendMessage(groupJid, {
      text: `MARCANDO TODOS\n${mentionsText}`, // Apenas "MARCANDO TODOS" visível
      mentions: participants, // Mantendo as menções invisíveis
    });
  }
}
