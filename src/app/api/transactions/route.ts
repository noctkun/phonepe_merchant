import { NextResponse } from 'next/server';
import { createTransaction, getAnalytics } from '@/lib/data';

export async function POST(req: Request) {
  const tx = await req.json();
  createTransaction(tx);
  return NextResponse.json({ success: true });
}

export async function GET() {
  const analytics = getAnalytics();
  return NextResponse.json(analytics);
} 