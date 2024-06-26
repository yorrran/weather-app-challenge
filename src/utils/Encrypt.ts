import CryptoJS from "crypto-js";

export const encryptData = (data: string) => {
  const key: any = process.env.REACT_APP_CRYPTO_KEY ?? "12345";
  const encrypted = CryptoJS.AES.encrypt(data, key);
  return encrypted.toString();
};

export const decryptData = (data: string) => {
  const key: any = process.env.REACT_APP_CRYPTO_KEY ?? "12345";
  const decrypted = CryptoJS.AES.decrypt(data, key);
  const originalMessage = decrypted.toString(CryptoJS.enc.Utf8);
  return originalMessage;
};
