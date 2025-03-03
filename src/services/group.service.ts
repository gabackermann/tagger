export const isUserAdmin = async (
  sock: any,
  groupJid: string,
  userJid: string
): Promise<boolean> => {
  const groupMetadata = await sock.groupMetadata(groupJid);

  const admins = groupMetadata.participants
    .filter((p) => p.admin === "admin" || p.admin === "superadmin")
    .map((p) => p.id);

  return admins.includes(userJid);
};
