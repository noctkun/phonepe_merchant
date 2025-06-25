import { NextResponse } from 'next/server';
import { createTransaction, getAnalytics, getTransactions } from '@/lib/data';

export async function POST(req: Request) {
  const tx = await req.json();
  if (tx.edit) {
    // Editing transactions is not supported in Supabase upsert logic here (implement if needed)
    return NextResponse.json({ error: 'Edit not implemented in Supabase version' }, { status: 501 });
  } else {
    await createTransaction(tx);
    return NextResponse.json({ success: true });
  }
}

export async function GET() {
  const analytics = await getAnalytics();
  return NextResponse.json(analytics);
} 