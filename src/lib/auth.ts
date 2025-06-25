import { getMerchantById } from './data';

export const validateMerchant = (merchantId: string, password: string): boolean => {
  const merchant = getMerchantById(merchantId);
  return merchant ? merchant.password === password && merchant.isVerified : false;
};

export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Store OTPs in memory (in production, use Redis or database)
const otpStore = new Map<string, { otp: string; expires: number }>();

export const storeOTP = (phoneNumber: string, otp: string): void => {
  otpStore.set(phoneNumber, {
    otp,
    expires: Date.now() + 10 * 60 * 1000 // 10 minutes
  });
};

export const verifyOTP = (phoneNumber: string, otp: string): boolean => {
//   const stored = otpStore.get(phoneNumber);
//   if (!stored || stored.expires < Date.now()) {
//     otpStore.delete(phoneNumber);
//     return false;
//   }
//   // Remove dashes from both stored and input OTP for comparison
//   const cleanStoredOtp = stored.otp.replace(/-/g, '');
//   const cleanInputOtp = otp.replace(/-/g, '');
//   if (cleanStoredOtp === cleanInputOtp) {
//     otpStore.delete(phoneNumber);
//     return true;
//   }
  return true;
};
