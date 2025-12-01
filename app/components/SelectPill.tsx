import { memo } from "react";

type Props = {
  value: string;
  displayValue?: string;
  onChange: (value: string) => void;
  options: Record<string, string>;
  leadingIconClassName?: string;
  showChevron?: boolean;
};

export const SelectPill = memo(({
  value,
  displayValue,
  onChange,
  options,
  leadingIconClassName,
  showChevron = true,
}: Props) => {
  return (
    <label className="filter-pill">
      {leadingIconClassName && (
        <i
          className={`${leadingIconClassName} filter-pill__icon`}
          aria-hidden="true"
        />
      )}
      <span className="filter-pill__label">
        {displayValue ?? options[value] ?? ""}
      </span>
      {showChevron && (
        <i
          className="fa-solid fa-chevron-down filter-pill__chevron"
          aria-hidden="true"
        />
      )}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {Object.entries(options).map(([optionValue, label]) => <option key={optionValue} value={optionValue}>
              {label as string}
            </option>
        )}
      </select>
    </label>
  );
});


