import dbConnect from '../src/lib/db';
import { Gallery } from '../src/models/index';

async function updateAnnualDayImage() {
  try {
    await dbConnect();
    const result = await Gallery.updateMany(
      { title: /Annual Day/i },
      { url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800' }
    );
    console.log(`Updated ${result.modifiedCount} items.`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

updateAnnualDayImage();
