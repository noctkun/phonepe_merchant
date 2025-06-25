import { NextResponse } from 'next/server';
import { validateMerchant } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { merchantId, password } = await request.json();

    if (!merchantId || !password) {
      return NextResponse.json(
        { error: 'Merchant ID and password are required' },
        { status: 400 }
      );
    }

    const isValid = validateMerchant(merchantId, password);

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Sign in error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
