import { memo } from "react";
import type { Listing } from "../listings/types";

type Props = {
  listing: Listing;
};

export const ListingCardBody = memo(({ listing }: Props) => {
  return (
    <div className="listing-card__body">
      <h2 className="listing-card__price">
        ${listing.price.toLocaleString()}
      </h2>
      <p className="listing-card__meta">
        {listing.beds} bd • {listing.baths} ba •{" "}
        {listing.sqft.toLocaleString()} sqft
      </p>
      <p className="listing-card__address-line">{listing.address}</p>
      <p className="listing-card__address-line">
        {listing.city}, {listing.state}
      </p>
    </div>
  );
});

