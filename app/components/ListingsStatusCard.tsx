type BaseProps = {
  iconClassName: string;
  text: string;
};

export const ListingsStatusCardBase = ({ iconClassName, text }: BaseProps) => {
  return (
    <article className="listing-card listing-card--status">
      <div className="listing-card__loading-content">
        <i className={iconClassName} aria-hidden="true" />
        <span className="listing-card__loading-text">{text}</span>
      </div>
    </article>
  );
};

export const ListingsLoaderCard = () => (
  <ListingsStatusCardBase
    iconClassName="fa-solid fa-spinner listing-card__loading-icon"
    text="Loading homes..."
  />
);

export const ListingsEmptyStateCard = () => (
  <ListingsStatusCardBase
    iconClassName="fa-regular fa-face-frown listing-card__empty-icon"
    text="No homes match your filters right now. Try clearing some filters or check back soon."
  />
);

export const MarketingBannerCard = () => {
  return (
    <article className="listing-card listing-card--marketing">
      <div className="listing-card__marketing-content">
        <span className="listing-card__marketing-text">
          Make your strongest offer when you buy with Opendoor
        </span>
      </div>
    </article>
  );
};
