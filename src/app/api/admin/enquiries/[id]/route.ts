import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Enquiry } from '@/models/index';

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    if (!id) return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });

    console.log("Attempting to delete enquiry with ID:", id);
    const result = await Enquiry.deleteOne({ _id: id });
    console.log("Delete result:", result);

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: 'Submission not found or already deleted' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete' }, { status: 500 });
  }
}
