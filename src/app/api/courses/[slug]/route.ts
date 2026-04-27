import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Course } from '@/models/index';

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await dbConnect();
    const { slug } = await params;
    
    if (!slug) return NextResponse.json({ success: false, error: 'Slug is required' }, { status: 400 });

    const course = await Course.findOne({ slug });
    
    if (!course) {
      return NextResponse.json({ success: false, error: 'Course not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: course });
  } catch (error) {
    console.error("Course GET Error:", error);
    return NextResponse.json({ success: false, error: 'Failed to fetch course' }, { status: 500 });
  }
}
