// src/utils/landlord/createRoom.ts
export async function createBedroom(data: FormData) {
    const res = await fetch("https://bayyinti-project.onrender.com/bedrooms/", {
      method: "POST",
      body: data,
    });
    if (!res.ok) throw new Error("Failed to create bedroom");
    return res.json();
  }
  
  export async function createSharedSpace(data: FormData) {
    const res = await fetch(
      "https://bayyinti-project.onrender.com/shared-spaces/",
      {
        method: "POST",
        body: data,
      }
    );
    if (!res.ok) throw new Error("Failed to create shared space");
    return res.json();
  }
  