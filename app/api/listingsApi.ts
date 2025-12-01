import type { Listing } from "../listings/types";

const LISTINGS_API_URL = import.meta.env.VITE_LISTINGS_API_URL as
  | string
  | undefined;

const mapDealToListing = (deal: any): Listing => {
  const address = deal?.address ?? {};
  const userData = deal?.userData ?? {};
  const zillow = deal?.zillowData ?? {};

  const fullAddress: string =
    address.formattedAddress ??
    [address.streetNumber, address.route].filter(Boolean).join(" ");

  const city: string = address.locality ?? "";
  const state: string = address.stateCode ?? address.state ?? "";
  const zip: string = address.zipcode ?? "";

  const rawLocation = Array.isArray(address.location)
    ? address.location
    : undefined;
  const lat =
    rawLocation && typeof rawLocation[0] === "number"
      ? rawLocation[0]
      : undefined;
  const lng =
    rawLocation && typeof rawLocation[1] === "number"
      ? rawLocation[1]
      : undefined;

  const googlePlaceId: string | undefined =
    typeof address.googlePlaceId === "string"
      ? address.googlePlaceId
      : undefined;

  const price: number =
    userData.askingPrice ??
    userData.updatedAskingPrice?.[0] ??
    zillow.zestimate ??
    0;

  const beds: number = zillow.bedrooms ?? 0;
  const baths: number = zillow.bathrooms ?? 0;
  const sqft: number = zillow.livingAreaValue ?? 0;

  const rawDateSold = zillow.dateSold;
  const dateSold: string | undefined =
    typeof rawDateSold === "string"
      ? rawDateSold
      : typeof rawDateSold === "number"
      ? new Date(rawDateSold).toISOString()
      : undefined;

  const listingStatus: "active" | "sold" =
    zillow.dateSold != null ? "sold" : "active";

  return {
    id: String(deal?._id),
    address: fullAddress,
    city,
    state,
    zip,
    price,
    beds,
    baths,
    sqft,
    lat,
    lng,
    googlePlaceId,
    dateSold,
    listingStatus,
  };
};

export const fetchListingsFromApi = async (): Promise<Listing[]> => {
  if (!LISTINGS_API_URL) {
    if (import.meta.env.DEV) {
      console.error("VITE_LISTINGS_API_URL is not defined");
    }
    return [];
  }

  const response = await fetch(LISTINGS_API_URL);
  if (!response.ok) {
    throw new Error(`Failed to load listings: ${response.status}`);
  }

  const data = await response.json();
  const deals = Array.isArray((data as any).deals)
    ? (data as any).deals
    : [];

  return deals.map(mapDealToListing);
};


