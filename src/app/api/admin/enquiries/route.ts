import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Enquiry } from '@/models/index';

export async function GET() {
  try {
    await dbConnect();
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: enquiries });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch enquiries' }, { status: 500 });
  }
}
