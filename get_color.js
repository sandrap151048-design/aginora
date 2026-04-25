const { Jimp } = require('jimp');

async function getColor() {
  try {
    const image = await Jimp.read('public/logo-dark-bg.png');
    // Read the top-left pixel
    const idx = image.getPixelIndex(0, 0);
    const r = image.bitmap.data[idx];
    const g = image.bitmap.data[idx + 1];
    const b = image.bitmap.data[idx + 2];
    
    // Convert to hex
    const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
    
    console.log("Top left pixel color:", rgbToHex(r, g, b));
  } catch(err) {
    console.error(err);
  }
}
getColor();
