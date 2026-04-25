const { Jimp } = require('jimp');

async function processLogo() {
  try {
    const image = await Jimp.read('public/logo-clean.png');
    
    // Process image: make white background transparent
    // And for the dark version, make dark pixels white
    const darkImage = image.clone();

    // Iterate over all pixels
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const red = this.bitmap.data[idx + 0];
      const green = this.bitmap.data[idx + 1];
      const blue = this.bitmap.data[idx + 2];
      
      // If pixel is very close to white, make it transparent
      if (red > 240 && green > 240 && blue > 240) {
        this.bitmap.data[idx + 3] = 0; // Alpha
      }
    });

    darkImage.scan(0, 0, darkImage.bitmap.width, darkImage.bitmap.height, function(x, y, idx) {
      const red = this.bitmap.data[idx + 0];
      const green = this.bitmap.data[idx + 1];
      const blue = this.bitmap.data[idx + 2];
      
      // If pixel is very close to white, make it transparent
      if (red > 240 && green > 240 && blue > 240) {
        this.bitmap.data[idx + 3] = 0; // Alpha
      } 
      // If pixel is dark grey/black (the text), make it white
      else if (red < 80 && green < 80 && blue < 80) {
        this.bitmap.data[idx + 0] = 255;
        this.bitmap.data[idx + 1] = 255;
        this.bitmap.data[idx + 2] = 255;
      }
    });

    await image.write('public/logo-transparent.png');
    await darkImage.write('public/logo-transparent-white-text.png');
    
    console.log("Logos processed successfully!");
  } catch (err) {
    console.error(err);
  }
}

processLogo();
