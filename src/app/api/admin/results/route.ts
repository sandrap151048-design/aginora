import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Result } from '@/models/index';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

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
    const contentType = request.headers.get('content-type') || '';

    let name = '', course = '', rank = '', image = '';

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      name = formData.get('name') as string || '';
      course = formData.get('course') as string || '';
      rank = formData.get('rank') as string || '';
      const file = formData.get('file') as File | null;

      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const uploadDir = join(process.cwd(), 'public', 'uploads');
        await mkdir(uploadDir, { recursive: true });
        const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
        await writeFile(join(uploadDir, fileName), buffer);
        image = `/uploads/${fileName}`;
      }
    } else {
      const body = await request.json();
      name = body.name; course = body.course; rank = body.rank; image = body.image || '';
    }

    if (!name || !course || !rank) {
      return NextResponse.json({ success: false, error: 'Name, course, and rank are required' }, { status: 400 });
    }

    const newResult = await Result.create({ name, course, rank, image });
    return NextResponse.json({ success: true, data: newResult }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create result' }, { status: 500 });
  }
}
