async function clearGallery() {
  console.log("Fetching gallery items...");
  try {
    const res = await fetch("http://localhost:3000/api/admin/gallery");
    const data = await res.json();
    
    if (data.success && data.data) {
      console.log(`Found ${data.data.length} items to delete.`);
      
      for (const item of data.data) {
        const delRes = await fetch(`http://localhost:3000/api/admin/gallery/${item._id}`, {
          method: 'DELETE'
        });
        if (delRes.ok) {
          console.log(`Deleted: ${item.title}`);
        } else {
          console.error(`Failed to delete: ${item.title}`);
        }
      }
      console.log("Gallery cleared successfully!");
    } else {
      console.log("No items found or failed to fetch.");
    }
  } catch(err) {
    console.error("Error:", err.message);
  }
}

clearGallery();
