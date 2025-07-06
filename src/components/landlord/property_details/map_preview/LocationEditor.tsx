"use client";

import { useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "12rem", // 48px * 4 = 192px
};

type Props = {
  lat: string;
  lon: string;
  onChange: (lat: string, lon: string) => void;
};

export default function LocationEditor({ lat, lon, onChange }: Props) {
  const latitude = parseFloat(lat);
  const longitude = parseFloat(lon);
  const isValid = !isNaN(latitude) && !isNaN(longitude);
  const [markerPos, setMarkerPos] = useState({ lat: latitude, lng: longitude });

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
      onChange(newPos.lat.toString(), newPos.lng.toString());
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
              onChange(lat.toString(), lng.toString());
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
                onChange(newLat.toString(), newLng.toString());
              }
            }}
          />
        </GoogleMap>
      </div>
    </div>
  );
}
