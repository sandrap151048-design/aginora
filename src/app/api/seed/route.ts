import { NextResponse } from 'next/server';
import { seed } from '@/lib/seed-db';

export async function GET() {
  try {
    await seed();
    return NextResponse.json({ success: true, message: 'Database seeded successfully' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
