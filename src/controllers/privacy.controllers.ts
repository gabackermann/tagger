import { waitForExcelUpload } from "../services/excel.service";

export const handlePrivateCommand = async (
  sock: any,
  remoteJid: string,
  text: string,
  responsableId: string,
) => {
  if (text === "!p") {
    console.log('nada')
    return
  //  await waitForExcelUpload(sock, remoteJid, responsableId);
  }
};
