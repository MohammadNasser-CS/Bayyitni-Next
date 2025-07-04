// src/utils/landlord/getPropertyDetails.ts
export async function getPropertyDetails(property_id :string) {
      const res = await fetch(`https://bayyinti-project.onrender.com/property-listings/${property_id}`, {
        headers: {
          "Content-Type": "application/json",
        //   "Authorization": `Bearer ${process.env.ADMIN_API_TOKEN}`,
        },
        cache: "no-store",
      });
    
      if (!res.ok) throw new Error("Failed to fetch listings");
      const data = await res.json();
      return data;
    }
    