const defaultGallery = [
  { title: 'Modern Classrooms', type: 'image', url: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=800' },
  { title: 'Interactive Sessions', type: 'image', url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800' },
  { title: 'Expert Mentorship', type: 'image', url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800' },
  { title: 'Library Facilities', type: 'image', url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800' },
];

async function restoreGallery() {
  console.log("Restoring original gallery items...");
  
  for (const item of defaultGallery) {
    try {
      const response = await fetch("http://localhost:3000/api/admin/gallery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
      });
      
      const data = await response.json();
      if (data.success) {
        console.log(`Successfully restored: ${item.title}`);
      } else {
        console.error(`Failed to restore ${item.title}:`, data.error);
      }
    } catch (error) {
      console.error(`Error connecting to API for ${item.title}:`, error.message);
    }
  }
  
  console.log("Gallery restore complete!");
}

restoreGallery();
