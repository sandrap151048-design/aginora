import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Enquiry } from '@/models/index'; 

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await connectDB();
    
    // The models/index.ts exports mongoose.models.Enquiry || ... as default
    // Wait, let me check how I exported it.
    // I used export default mongoose.models.Enquiry || mongoose.model("Enquiry", EnquirySchema);
    // And others as named exports.
    
    const enquiry = await Enquiry.create(body);
    
    return NextResponse.json({ success: true, data: enquiry }, { status: 201 });
  } catch (error: any) {
    console.error("Enquiry Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
