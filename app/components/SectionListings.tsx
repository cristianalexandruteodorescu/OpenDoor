import { useEffect, useMemo, useState } from "react";
import { Virtuoso } from "react-virtuoso";
import type { Listing } from "../listings/types";
import { MARKETING_BANNER_INSERT_INDEX } from "../constants/sectionListings";
import {
  ListingsLoaderCard,
  ListingsEmptyStateCard,
} from "./ListingsStatusCard";

type Props = {
  items: Listing[];
  renderItem: (item: Listing) => React.ReactNode;
  isLoading?: boolean;
  marketingBanner?: React.ReactNode;
};

export const SectionListings = ({
  items,
  renderItem,
  isLoading,
  marketingBanner,
}: Props) => {
  const [isClient, setIsClient] = useState(false);
  const [shouldVirtualize, setShouldVirtualize] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleResize = () => {
      setShouldVirtualize(window.innerWidth >= 769);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const itemsWithBanner = useMemo(() => {
    if (!marketingBanner || items.length === 0) return items;
    
    const result = [...items];
    result.splice(MARKETING_BANNER_INSERT_INDEX + 1, 0, null as any);
    return result;
  }, [items, marketingBanner]);

  const hasItems = items.length > 0;

  if (isLoading) {
    return (
      <section className="listings-page__grid" aria-label="Home listings">
        <ListingsLoaderCard />
      </section>
    );
  }

  if (!hasItems) {
    return (
      <section className="listings-page__grid" aria-label="Home listings">
        <ListingsEmptyStateCard />
      </section>
    );
  }

  if (!isClient || !shouldVirtualize) {
    return (
      <section
        className="listings-page__grid"
        aria-label="Home listings"
      >
        {itemsWithBanner.map((item, index) => (
          <div
            className="listings-page__item"
            key={item ? item.id : `banner-${index}`}
          >
            {item ? renderItem(item) : marketingBanner}
          </div>
        ))}
      </section>
    );
  }

  return (
    <section
      className="listings-page__grid"
      aria-label="Home listings"
    >
      <Virtuoso
        data={itemsWithBanner}
        itemContent={(_, item: Listing | null) => (
          <div className="listings-page__item">
            {item ? renderItem(item) : marketingBanner}
          </div>
        )}
        style={{ height: "100%" }}
      />
    </section>
  );
};
