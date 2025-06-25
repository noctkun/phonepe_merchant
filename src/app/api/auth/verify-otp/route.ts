import { NextResponse } from 'next/server';
import { verifyOTP } from '@/lib/auth';
import { saveMerchant } from '@/lib/data';
import { Merchant } from '@/types';

export async function POST(request: Request) {
  try {
    const { phoneNumber, otp, merchantData } = await request.json();

    if (!phoneNumber || !otp || !merchantData) {
      return NextResponse.json(
        { error: 'Phone number, OTP, and merchant data are required' },
        { status: 400 }
      );
    }

    // Verify OTP
    const isValidOTP = verifyOTP(phoneNumber, otp);
    if (!isValidOTP) {
      return NextResponse.json(
        { error: 'Invalid or expired OTP' },
        { status: 400 }
      );
    }

    // Create merchant account with correct camelCase keys
    const merchant: Merchant = {
      merchantId: merchantData.merchantId,
      phoneNumber: merchantData.phoneNumber,
      password: merchantData.password,
      businessName: merchantData.businessName || '',
      createdAt: new Date().toISOString(),
      isVerified: true
    };

    await saveMerchant(merchant);

    return NextResponse.json({ 
      success: true, 
      message: 'Account created successfully' 
    });
  } catch (error) {
    console.error('OTP verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
