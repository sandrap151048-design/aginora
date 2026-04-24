import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Result } from '@/models/index';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const { id } = params;
    if (!id) return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });

    await Result.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const { id } = params;
    const body = await request.json();
    if (!id) return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });

    const updated = await Result.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update' }, { status: 500 });
  }
}
