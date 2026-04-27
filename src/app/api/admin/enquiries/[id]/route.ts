import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Enquiry } from '@/models/index';

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    if (!id) return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });

    console.log("Attempting to delete enquiry with ID:", id);
    const deletedEnquiry = await Enquiry.findByIdAndDelete(id);
    console.log("Deleted document:", deletedEnquiry);

    if (!deletedEnquiry) {
      return NextResponse.json(
        { success: false, error: 'Submission not found or already deleted' }, 
        { status: 404, headers: { 'Cache-Control': 'no-store' } }
      );
    }
    
    return NextResponse.json(
      { success: true, message: 'Deleted successfully' },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete' }, { status: 500 });
  }
}
