import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Result } from '@/models/index';

export async function GET() {
  try {
    await dbConnect();
    const results = await Result.find().sort({ _id: -1 });
    return NextResponse.json({ success: true, data: results });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch results' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    
    if (!body.name || !body.course || !body.rank) {
      return NextResponse.json({ success: false, error: 'Name, course, and rank are required' }, { status: 400 });
    }

    const newResult = await Result.create(body);
    return NextResponse.json({ success: true, data: newResult }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create result' }, { status: 500 });
  }
}
