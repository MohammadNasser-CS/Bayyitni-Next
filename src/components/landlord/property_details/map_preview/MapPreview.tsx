"use client";

import { useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker, NavigationControl } from "react-map-gl/mapbox";

interface MapPreviewProps {
  lat: string;
  lon: string;
}

export default function MapPreview({ lat, lon }: MapPreviewProps) {
  const latitude = parseFloat(lat);
  const longitude = parseFloat(lon);
  const isValid = !isNaN(latitude) && !isNaN(longitude);

  const [viewState, setViewState] = useState({
    latitude: isValid ? latitude : 31.7683, // fallback: Palestine center
    longitude: isValid ? longitude : 35.2137,
    zoom: 14,
  });

  // Don’t render the map at all if lat/lon are invalid
  if (!isValid) {
    return (
      <div className="w-full h-48 flex items-center justify-center bg-red-50 text-red-500 text-sm rounded-md">
        Invalid location coordinates
      </div>
    );
  }

  return (
    <div className="w-full h-48 rounded-md overflow-hidden border border-gray-200 shadow-sm">
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        initialViewState={viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: "100%", height: "100%" }}
      >
        <NavigationControl position="top-right" />
        <Marker
          latitude={viewState.latitude}
          longitude={viewState.longitude}
          color="#3b82f6"
        />
      </Map>
    </div>
  );
}
