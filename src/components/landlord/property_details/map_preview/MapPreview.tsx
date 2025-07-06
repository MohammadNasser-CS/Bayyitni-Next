"use client";

import { useRef, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

type MapPreviewProps = {
  lat: string;
  lon: string;
};

export default function MapPreview({ lat, lon }: MapPreviewProps) {
  const latitude = parseFloat(lat);
  const longitude = parseFloat(lon);
  const isValid = !isNaN(latitude) && !isNaN(longitude);

  const [viewState, setViewState] = useState({
    latitude: isValid ? latitude : 31.7683, // fallback: Palestine center
    longitude: isValid ? longitude : 35.2137,
    zoom: 14,
  });
  const mapRef = useRef<google.maps.Map | null>(null);
  const [zoom, setZoom] = useState(14);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });
  const handleZoomIn = () => {
    const newZoom = zoom + 1;
    setZoom(newZoom);
    mapRef.current?.setZoom(newZoom);
  };

  const handleZoomOut = () => {
    const newZoom = zoom - 1;
    setZoom(newZoom);
    mapRef.current?.setZoom(newZoom);
  };

  const handleOnLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };
  if (!isLoaded) return <p>Loading map...</p>;
  // Don’t render the map at all if lat/lon are invalid
  if (!isValid) {
    return (
      <div className="w-full h-48 flex items-center justify-center bg-red-50 text-red-500 text-sm rounded-md">
        Invalid location coordinates
      </div>
    );
  }

  return (
    <div className="relative w-full h-48 rounded-md overflow-hidden border border-gray-200 shadow-sm">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={{ lat: latitude, lng: longitude }}
        zoom={zoom}
        onLoad={handleOnLoad}
        options={{ disableDefaultUI: true }}
      >
        <Marker
          position={{ lat: latitude, lng: longitude }}
          title="Hello World!"
        />
      </GoogleMap>

      {/* Zoom Buttons */}
      <div className="absolute top-2 right-2 flex flex-col space-y-2">
        <button
          onClick={handleZoomIn}
          className="bg-white text-black rounded shadow p-1 text-sm hover:bg-gray-100"
        >
          ➕
        </button>
        <button
          onClick={handleZoomOut}
          className="bg-white text-black rounded shadow p-1 text-sm hover:bg-gray-100"
        >
          ➖
        </button>
      </div>
    </div>
  );
}
