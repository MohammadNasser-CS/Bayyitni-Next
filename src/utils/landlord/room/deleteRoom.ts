// src/utils/landlord/room/deleteRoom.ts
export const deleteRoom = async (roomId: number) => {
    const response = await fetch(`https://bayyitni-laravel-2.onrender.com/api/room/${roomId}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to delete room");
    }

    return true;
};
