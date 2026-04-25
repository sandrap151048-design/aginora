const galleryItems = [
  {
    title: "State-of-the-Art Classrooms",
    type: "image",
    url: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=1200&auto=format&fit=crop"
  },
  {
    title: "Expert Faculty Mentorship",
    type: "image",
    url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop"
  },
  {
    title: "Interactive Smart Boards",
    type: "image",
    url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop"
  },
  {
    title: "Extensive Library Resources",
    type: "image",
    url: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1200&auto=format&fit=crop"
  },
  {
    title: "Focus on JEE Preparation",
    type: "image",
    url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200&auto=format&fit=crop"
  },
  {
    title: "NEET Success Strategies",
    type: "image",
    url: "https://images.unsplash.com/photo-1576091160501-bbe57469278b?q=80&w=1200&auto=format&fit=crop"
  }
];

async function seedGallery() {
  console.log("Starting targeted gallery seeding...");
  
  for (const item of galleryItems) {
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
        console.log(`Successfully added: ${item.title}`);
      } else {
        console.error(`Failed to add ${item.title}:`, data.error);
      }
    } catch (error) {
      console.error(`Error connecting to API for ${item.title}:`, error.message);
    }
  }
  
  console.log("Gallery seeding complete!");
}

seedGallery();
