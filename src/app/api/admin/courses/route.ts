import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Course } from '@/models/index';

export async function GET() {
  try {
    await dbConnect();
    const courses = await Course.find().sort({ _id: -1 });
    return NextResponse.json({ success: true, data: courses });
  } catch (error) {
    console.error("Courses GET Error:", error);
    return NextResponse.json({ success: false, error: 'Failed to fetch courses' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { name, description, duration, fees, status, eligibility, syllabus, features } = body;

    if (!name) {
      return NextResponse.json({ success: false, error: 'Name is required' }, { status: 400 });
    }

    const newCourse = await Course.create({ name, description, duration, fees, status, eligibility, syllabus, features });
    return NextResponse.json({ success: true, data: newCourse }, { status: 201 });
  } catch (error) {
    console.error("Courses POST Error:", error);
    return NextResponse.json({ success: false, error: 'Failed to create course' }, { status: 500 });
  }
}
