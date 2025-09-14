// src/utils/landlord/room/updateRoom.ts
export const updateRoom = async (roomId: number, updatedData: Record<string, any>) => {
    if (Object.keys(updatedData).length === 0) return null; // nothing to update

    const response = await fetch(`https://bayyitni-laravel-2.onrender.com/api/room/${roomId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
        throw new Error("Failed to update room");
    }

    return await response.json();
};
