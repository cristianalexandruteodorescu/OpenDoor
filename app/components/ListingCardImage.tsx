import { memo, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import type { Listing } from "../listings/types";
import { useAppDispatch, useAppSelector } from "../store";
import { toggleFavorite } from "../listings/listingsSlice";
import { imageUrls, CAROUSEL_AUTOPLAY_DELAY } from "../constants/listingCardImages";
import "swiper/css";
import "swiper/css/pagination";

type Props = {
  listing: Listing;
};

export const ListingCardImage = memo(({ listing }: Props) => {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector(
    (state) => state.listings.favorites[listing.id]
  );

  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  const handleFavoriteClick = () => {
    dispatch(toggleFavorite(listing.id));
  };

  const handleImageError = (index: number) => {
    setImageErrors((prev) => new Set(prev).add(index));
  };

  const hasImages = useMemo(() => {
    return Math.random() > 0.5;
  }, [listing.id]);

  const validImages = imageUrls.filter(
    (_, index) => !imageErrors.has(index)
  );

  return (
    <div className="listing-card__image-wrap">
      {hasImages && validImages.length > 0 ? (
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{
            delay: CAROUSEL_AUTOPLAY_DELAY,
            disableOnInteraction: false,
          }}
          pagination={
            imageUrls.length > 1
              ? { clickable: true, dynamicBullets: true }
              : false
          }
          className="listing-card__swiper"
        >
          {imageUrls.map((imageUrl, index) => {
            if (imageErrors.has(index)) return null;
            return (
              <SwiperSlide key={index}>
                <img
                  src={imageUrl}
                  alt={`${listing.address} - Photo ${index + 1}`}
                  className="listing-card__image"
                  onError={() => handleImageError(index)}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <div className="listing-card__image listing-card__image--fallback">
          <i
            className="fa-regular fa-image listing-card__image-fallback-icon"
            aria-hidden="true"
          />
          <span className="visually-hidden">Photo unavailable</span>
        </div>
      )}
      <div className="listing-card__brand-pill">
        <span className="listing-card__brand-logo">O</span>
        <span className="listing-card__brand-text">Opendoor</span>
      </div>
      <button
        type="button"
        className={`listing-card__favorite ${
          isFavorite ? "listing-card__favorite--active" : ""
        }`}
        onClick={handleFavoriteClick}
        aria-pressed={isFavorite}
      >
        <span className="visually-hidden">
          {isFavorite ? "Remove from favorites" : "Save home"}
        </span>
        <i
          className={`fa-${
            isFavorite ? "solid" : "regular"
          } fa-heart listing-card__favorite-icon`}
          aria-hidden="true"
        />
      </button>
    </div>
  );
});

