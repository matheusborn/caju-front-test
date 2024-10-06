export const formatCpf = (value: string) => {
  const formatted = value.replace(/\D/g, "");

  if (formatted.length <= 3) return formatted;
  if (formatted.length <= 6)
    return `${formatted.slice(0, 3)}.${formatted.slice(3)}`;
  if (formatted.length <= 9)
    return `${formatted.slice(0, 3)}.${formatted.slice(3, 6)}.${formatted.slice(
      6
    )}`;
  return `${formatted.slice(0, 3)}.${formatted.slice(3, 6)}.${formatted.slice(
    6,
    9
  )}-${formatted.slice(9, 11)}`;
};

export const validateEmail = (email: string) => {
  email = email.toLowerCase();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    throw new Error("Invalid email format.");
  }

  return true;
};
