import { memo } from "react";
import type { Listing } from "../listings/types";
import { ListingCardImage } from "./ListingCardImage";
import { ListingCardBody } from "./ListingCardBody";

type Props = {
  listing: Listing;
};

export const ListingCard = memo(({ listing }: Props) => {
  return (
    <article className="listing-card">
      <ListingCardImage listing={listing} />
      <ListingCardBody listing={listing} />
    </article>
  );
});


