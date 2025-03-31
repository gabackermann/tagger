export const formatPhoneNumber = (phone: string): string => {
  return phone.replace(/\D/g, "");
};

export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
