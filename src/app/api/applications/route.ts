import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Enquiry } from '@/models/index';

export async function POST(req: Request) {
  try {
    await dbConnect();
    
    let body;
    try {
      body = await req.json();
    } catch (e) {
      return NextResponse.json({ success: false, error: 'Invalid JSON body' }, { status: 400 });
    }

    console.log("Incoming Application Body:", body);

    if (!body.name || !body.phone || !body.course) {
      return NextResponse.json({ success: false, error: 'Missing required fields (Name, Phone, or Course)' }, { status: 400 });
    }

    const enquiry = await Enquiry.create(body);
    return NextResponse.json({ success: true, data: enquiry }, { status: 201 });
  } catch (error: any) {
    console.error('Application API Error:', error);
    
    // Extract specific mongoose validation error if it exists
    let errorMessage = 'Failed to submit application';
    if (error.name === 'ValidationError') {
      errorMessage = Object.values(error.errors).map((err: any) => err.message).join(', ');
    } else if (error.code === 11000) {
      errorMessage = 'This email or phone is already registered.';
    } else if (error.message) {
      errorMessage = error.message;
    }

    return NextResponse.json({ 
      success: false, 
      error: errorMessage,
      debug: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}
