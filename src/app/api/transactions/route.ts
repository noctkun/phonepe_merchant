import { NextResponse } from 'next/server';
import { createTransaction, getAnalytics, getTransactions } from '@/lib/data';
import fs from 'fs';
import path from 'path';

const TRANSACTIONS_FILE = path.join(process.cwd(), 'data', 'transactions.json');

export async function POST(req: Request) {
  const tx = await req.json();
  if (tx.edit) {
    // Edit transaction status
    const transactions = getTransactions();
    const idx = transactions.findIndex(t => t.id === tx.id);
    if (idx !== -1) {
      transactions[idx].status = tx.status;
      fs.writeFileSync(TRANSACTIONS_FILE, JSON.stringify(transactions, null, 2));
      return NextResponse.json({ success: true, edited: true });
    }
    return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
  } else {
    createTransaction(tx);
    return NextResponse.json({ success: true });
  }
}

export async function GET() {
  const analytics = getAnalytics();
  return NextResponse.json(analytics);
} 