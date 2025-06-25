import { NextResponse } from 'next/server';
import { generateOTP, storeOTP } from '@/lib/auth';
import { getMerchantById } from '@/lib/data';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const { merchantId, phoneNumber } = await request.json();

    if (!merchantId || !phoneNumber) {
      return NextResponse.json(
        { error: 'Merchant ID and phone number are required' },
        { status: 400 }
      );
    }

    // Check if merchant already exists
    const existingMerchant = await getMerchantById(merchantId);
    if (existingMerchant) {
      return NextResponse.json(
        { error: 'Merchant ID already exists' },
        { status: 409 }
      );
    }

    // Generate and store OTP
    const otp = generateOTP();
    storeOTP(phoneNumber, otp);

    // Send OTP via SMS (using the provided API)
    try {
      const options = {
        method: 'POST',
        url: 'https://sms-verify3.p.rapidapi.com/send-numeric-verify',
        headers: {
          'x-rapidapi-key': process.env.RAPIDAPI_KEY,
          'x-rapidapi-host': 'sms-verify3.p.rapidapi.com',
          'Content-Type': 'application/json'
        },
        data: { target: phoneNumber }
      };

      await axios.request(options);
    } catch (smsError) {
      console.error('SMS sending failed:', smsError);
      // For demo purposes, we'll continue even if SMS fails
      console.log(`Demo OTP for ${phoneNumber}: ${otp}`);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'OTP sent successfully',
      // For demo purposes only - remove in production
      demoOTP: otp 
    });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
