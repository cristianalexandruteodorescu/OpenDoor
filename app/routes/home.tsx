import { FilterBar } from "../components/FilterBar";
import { ListingCard } from "../components/ListingCard";
import { SectionListings } from "../components/SectionListings";
import { ListingsMap } from "../components/ListingsMap";
import { MarketingBannerCard } from "../components/ListingsStatusCard";
import { useListings } from "../hooks/useListings";
import {
  HOME_TITLE,
  HOME_SUBTITLE_SUFFIX,
} from "../constants/homePageMessages";
import "../styles/listings.scss";

const BASE_CLASS = "listings-page";

const HomePage = () => {
  const { listings, count, isLoading } = useListings();

  return (
    <main className={BASE_CLASS}>
      <div className={`${BASE_CLASS}__content`}>

        <div className={`${BASE_CLASS}__map-container`}>
          <ListingsMap listings={listings} />
        </div>
        
        <div className={`${BASE_CLASS}__list-container`}>
        
          <header className={`${BASE_CLASS}__header`}>
            <h1 className={`${BASE_CLASS}__title`}>{HOME_TITLE}</h1>
            <p className={`${BASE_CLASS}__subtitle`}>
              {count} {HOME_SUBTITLE_SUFFIX}
            </p>
          </header>
        
          <FilterBar />
        
            <SectionListings
              items={listings}
              isLoading={isLoading}
              marketingBanner={<MarketingBannerCard />}
              renderItem={(listing) => (
                <ListingCard key={listing.id} listing={listing} />
              )}
            />

        </div>
      </div>
    </main> 
  );
}

export default HomePage;