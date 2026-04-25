const { Jimp } = require('jimp');

async function processLogo() {
  try {
    console.log("Loading image...");
    const image = await Jimp.read('public/logo-clean.png');
    const w = image.bitmap.width;
    const h = image.bitmap.height;
    
    // Create a visited matrix
    const visited = new Array(h).fill(0).map(() => new Array(w).fill(false));
    
    // Stack for DFS flood fill
    const stack = [];
    
    // Helper to check if a pixel is "white"
    const isWhite = (x, y) => {
      if (x < 0 || x >= w || y < 0 || y >= h) return false;
      const idx = image.getPixelIndex(x, y);
      const r = image.bitmap.data[idx + 0];
      const g = image.bitmap.data[idx + 1];
      const b = image.bitmap.data[idx + 2];
      return r > 240 && g > 240 && b > 240;
    };
    
    // Add all edges to stack if they are white
    for (let x = 0; x < w; x++) {
      if (isWhite(x, 0)) stack.push([x, 0]);
      if (isWhite(x, h - 1)) stack.push([x, h - 1]);
    }
    for (let y = 0; y < h; y++) {
      if (isWhite(0, y)) stack.push([0, y]);
      if (isWhite(w - 1, y)) stack.push([w - 1, y]);
    }
    
    console.log("Starting flood fill...");
    // Perform flood fill
    while (stack.length > 0) {
      const [x, y] = stack.pop();
      
      if (x < 0 || x >= w || y < 0 || y >= h) continue;
      if (visited[y][x]) continue;
      
      if (isWhite(x, y)) {
        visited[y][x] = true;
        // Make pixel transparent
        const idx = image.getPixelIndex(x, y);
        image.bitmap.data[idx + 3] = 0; // set alpha to 0
        
        // Add neighbors
        stack.push([x + 1, y]);
        stack.push([x - 1, y]);
        stack.push([x, y + 1]);
        stack.push([x, y - 1]);
      }
    }
    
    // Create the white-text version for dark backgrounds
    const darkImage = image.clone();
    
    // Make dark text white
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (!visited[y][x]) {
          const idx = darkImage.getPixelIndex(x, y);
          const r = darkImage.bitmap.data[idx + 0];
          const g = darkImage.bitmap.data[idx + 1];
          const b = darkImage.bitmap.data[idx + 2];
          // If dark text, invert to white
          if (r < 80 && g < 80 && b < 80) {
            darkImage.bitmap.data[idx + 0] = 255;
            darkImage.bitmap.data[idx + 1] = 255;
            darkImage.bitmap.data[idx + 2] = 255;
          }
        }
      }
    }
    
    console.log("Writing images...");
    await image.write('public/logo-transparent-v2.png');
    await darkImage.write('public/logo-transparent-white-text-v2.png');
    
    console.log("Done!");
  } catch(err) {
    console.error(err);
  }
}
processLogo();
