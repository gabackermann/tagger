const groupCache: {
  [groupId: string]: {
    nome: string;
    metadata: any;
    timestamp: number;
  };
} = {};

export const getGroupMetadata = async (sock: any, groupId: string) => {
  const agora = Date.now();
  const cache = groupCache[groupId];

  if (cache && agora - cache.timestamp < 10 * 60 * 1000) {
    return cache.metadata;
  }

  const metadata = await sock.groupMetadata(groupId);
  groupCache[groupId] = {
    nome: metadata.subject,
    metadata,
    timestamp: agora,
  };

  return metadata;
};
