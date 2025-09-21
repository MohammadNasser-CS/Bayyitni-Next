// components/property/Step1/MapPicker.tsx
"use client";

import { GoogleMap, Marker } from "@react-google-maps/api";
import { CreatePropertyRequest } from "@/types/property/property";

interface Props {
  t: any;
  location_lat: number;
  location_lon: number;
  onLocationChange: (lat: number, lng: number) => void;
  errors: Record<string, string[]>;
}

export default function MapPicker({
  t,
  location_lat,
  location_lon,
  onLocationChange,
  errors,
}: Props) {
  const center = {
    lat: location_lat || 31.9522,
    lng: location_lon || 35.2332,
  };
  const zoom = 15;

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      onLocationChange(e.latLng.lat(), e.latLng.lng());
    }
  };

  const handleMarkerDragEnd = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      onLocationChange(e.latLng.lat(), e.latLng.lng());
    }
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((position) => {
      onLocationChange(position.coords.latitude, position.coords.longitude);
    });
  };

  return (
    <div className="space-y-1 px-4 mt-4">
      <label className="text-sm font-medium text-gray-700">
        {t(
          "landlord.manageListings.addPropertyPage.detailsCard.locationOnMap.title"
        )}{" "}
        *
      </label>

      <div className="relative rounded-md overflow-hidden border border-gray-300">
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "200px" }}
          center={center}
          zoom={zoom}
          onClick={handleMapClick}
          options={{ disableDefaultUI: false }}
        >
          <Marker
            position={{ lat: center.lat, lng: center.lng }}
            draggable
            onDragEnd={handleMarkerDragEnd}
          />
        </GoogleMap>

        <div className="absolute top-1 left-1 flex flex-wrap gap-1 z-10">
          <button
            onClick={handleUseCurrentLocation}
            className="bg-white shadow px-2 py-1 text-sm rounded hover:bg-gray-100"
            type="button"
          >
            {t(
              "landlord.manageListings.addPropertyPage.detailsCard.locationOnMap.myLocation"
            )}
          </button>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-1">
        {t(
          "landlord.manageListings.addPropertyPage.detailsCard.locationOnMap.hint"
        )}
      </p>

      {errors.location_lat &&
        errors.location_lat.map((err, idx) => (
          <p key={idx} className="text-red-500 text-xs">
            {err}
          </p>
        ))}

      {errors.location_lon &&
        errors.location_lon.map((err, idx) => (
          <p key={idx} className="text-red-500 text-xs">
            {err}
          </p>
        ))}
    </div>
  );
}
