import {associatedsGroup} from "../utils/associateds";

export const isUserAdmin = async (
  metadata: any,
  userJid: string
): Promise<boolean> => {

  const admins = metadata.participants
    .filter((p: { admin: string; }) => p.admin === "admin" || p.admin === "superadmin")
    .map((p: { id: any; }) => p.id);

  return admins.includes(userJid);
};

export const isRegisteredGroup = async (
  metadata: any,
): Promise<any> => {

  const registeredGroup = associatedsGroup.find((group: any)=> metadata.subject.toLowerCase().includes(group.keyword.toLowerCase())) || false

  return registeredGroup 
};
