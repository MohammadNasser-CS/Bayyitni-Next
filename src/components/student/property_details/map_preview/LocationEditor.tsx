"use client";

import { useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "12rem", // 48px * 4 = 192px
};

type Props = {
  lat: number;
  lon: number;
  onChange: (lat: number, lon: number) => void;
};

export default function LocationEditor({ lat, lon, onChange }: Props) {
  const isValid = !isNaN(lat) && !isNaN(lon);
  const [markerPos, setMarkerPos] = useState({ lat: lat, lng: lon });

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const handleUseMyLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const newPos = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      };
      setMarkerPos(newPos);
      onChange(newPos.lat, newPos.lng);
    });
  };

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <div className="relative space-y-2">
      <div className="relative">
        {/* 📍 Floating Button */}
        <button
          onClick={handleUseMyLocation}
          className="absolute z-10 top-2 left-2 bg-white border border-gray-300 shadow-md text-xs text-gray-800 px-2 py-1 rounded hover:bg-gray-100"
        >
          📍 Use My Location
        </button>

        {/* 🗺️ Google Map */}
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={markerPos}
          zoom={14}
          onClick={(e) => {
            const lat = e.latLng?.lat();
            const lng = e.latLng?.lng();
            if (lat && lng) {
              setMarkerPos({ lat, lng });
              onChange(lat, lng);
            }
          }}
        >
          <Marker
            position={markerPos}
            draggable={true}
            onDragEnd={(e) => {
              const newLat = e.latLng?.lat();
              const newLng = e.latLng?.lng();
              if (newLat && newLng) {
                setMarkerPos({ lat: newLat, lng: newLng });
                onChange(newLat, newLng);
              }
            }}
          />
        </GoogleMap>
      </div>
    </div>
  );
}
