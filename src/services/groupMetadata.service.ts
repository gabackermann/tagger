const groupCache = new Map<string, { metadata: any; timestamp: number }>();
const CACHE_TTL = 2 * 60 * 1000; // 2 minutes

export const getGroupMetadata = async (sock: any, groupJid: string) => {
  const cached = groupCache.get(groupJid);
  const now = Date.now();

  if (cached && now - cached.timestamp < CACHE_TTL) {
    return cached.metadata;
  }

  try {
    const metadata = await sock.groupMetadata(groupJid);
    groupCache.set(groupJid, { metadata, timestamp: now });
    return metadata;
  } catch (error) {
    console.error(`Erro ao buscar metadados do grupo ${groupJid}:`, error);
    return null;
  }
};
