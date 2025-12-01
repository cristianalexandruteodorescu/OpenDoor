import { useMemo, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import type { Listing } from "../listings/types";
import {
  MAP_CONTAINER_STYLE,
  DEFAULT_CENTER,
  MAP_OPTIONS,
} from "../constants/listingsMap";

type Props = {
  listings: Listing[];
};

export const ListingsMap = ({ listings }: Props) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [bounds, setBounds] = useState<google.maps.LatLngBounds | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
  });

  const listingsWithLocation = useMemo(
    () =>
      listings.filter(
        (listing) =>
          typeof listing.lat === "number" && typeof listing.lng === "number"
      ),
    [listings]
  );

  const center = useMemo(() => {
    if (listingsWithLocation.length > 0) {
      const first = listingsWithLocation[0];
      return { lat: first.lat as number, lng: first.lng as number };
    }
    return DEFAULT_CENTER;
  }, [listingsWithLocation]);

  const visibleListings = useMemo(() => {
    if (!bounds) {
      return listingsWithLocation;
    }

    return listingsWithLocation.filter((listing) => {
      if (typeof listing.lat !== "number" || typeof listing.lng !== "number") {
        return false;
      }
      return bounds.contains({ lat: listing.lat, lng: listing.lng });
    });
  }, [bounds, listingsWithLocation]);

  if (loadError) {
    return (
      <div className="listings-map listings-map--error">
        <p>Error loading map</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="listings-map listings-map--loading">
        <p>Loading map...</p>
      </div>
    );
  }

  return (
    <div className="listings-map">
      <GoogleMap
        mapContainerStyle={MAP_CONTAINER_STYLE}
        center={center}
        zoom={11}
        options={MAP_OPTIONS}
        onLoad={(mapInstance) => {
          setMap(mapInstance);
          const currentBounds = mapInstance.getBounds();
          if (currentBounds) {
            setBounds(currentBounds);
          }
        }}
        onIdle={() => {
          if (!map) return;
          const currentBounds = map.getBounds();
          if (currentBounds) {
            setBounds(currentBounds);
          }
        }}
      >
        {visibleListings.map((listing) => (
          <Marker
            key={listing.id}
            position={{ lat: listing.lat as number, lng: listing.lng as number }}
            title={`${listing.address}, ${listing.city}, ${listing.state}`}
          />
        ))}
      </GoogleMap>
    </div>
  );
}
