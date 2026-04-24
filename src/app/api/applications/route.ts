import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Enquiry } from '@/models/index';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const enquiry = await Enquiry.create(body);
    return NextResponse.json({ success: true, data: enquiry });
  } catch (error) {
    console.error('Application Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to submit application' }, { status: 500 });
  }
}
