async function checkGallery() {
  try {
    const res = await fetch("http://localhost:3000/api/admin/gallery");
    const data = await res.json();
    
    if (data.success && data.data) {
      console.log(`Currently ${data.data.length} items in DB:`);
      for (const item of data.data) {
        console.log(`- ${item.title}`);
      }
    }
  } catch(err) {
    console.error("Error:", err.message);
  }
}
checkGallery();
