import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Enquiry } from '@/models/index';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    console.log("Incoming Application Body:", body);
    const enquiry = await Enquiry.create(body);
    return NextResponse.json({ success: true, data: enquiry }, { status: 201 });
  } catch (error: any) {
    console.error('Application API Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'Failed to submit application',
      details: error
    }, { status: 500 });
  }
}
