import { NextResponse } from 'next/server';
import { Gallery } from '@/models/index';
import dbConnect from '@/lib/db';

import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function GET() {
  try {
    await dbConnect();
    const galleryItems = await Gallery.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: galleryItems });
  } catch (error) {
    console.error("Gallery GET Error:", error);
    return NextResponse.json({ success: false, error: 'Failed to fetch gallery items' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    
    const contentType = request.headers.get('content-type') || '';
    
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const title = formData.get('title') as string || '';
      const type = formData.get('type') as string || 'image';
      const file = formData.get('file') as File;
      const urlInput = formData.get('url') as string || '';

      let finalUrl = urlInput;

      if (file && type === 'image') {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadDir = join(process.cwd(), 'public', 'uploads');
        await mkdir(uploadDir, { recursive: true });

        const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
        const filePath = join(uploadDir, fileName);
        await writeFile(filePath, buffer);
        finalUrl = `/uploads/${fileName}`;
      }

      if (!finalUrl) {
        return NextResponse.json({ success: false, error: 'URL or File is required' }, { status: 400 });
      }

      const newGalleryItem = await Gallery.create({ title, type, url: finalUrl });
      return NextResponse.json({ success: true, data: newGalleryItem }, { status: 201 });
    } else {
      const body = await request.json();
      const { title, type, url } = body;

      if (!type || !url) {
        return NextResponse.json({ success: false, error: 'Type and URL are required' }, { status: 400 });
      }

      const newGalleryItem = await Gallery.create({ title, type, url });
      return NextResponse.json({ success: true, data: newGalleryItem }, { status: 201 });
    }
  } catch (error) {
    console.error("Gallery POST Error:", error);
    return NextResponse.json({ success: false, error: 'Failed to create gallery item' }, { status: 500 });
  }
}
