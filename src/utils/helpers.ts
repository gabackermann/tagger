export const formatPhoneNumber = (phone: string): string => {
    return phone.replace(/\D/g, "");
  };
  