import { memo } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import {
  setSort,
  setStatusFilter,
  type SortOption,
  type StatusFilter,
} from "../listings/listingsSlice";
import { SORT_LABEL_MAP, STATUS_LABEL_MAP } from "../constants/filterBarOptions";
import { SelectPill } from "./SelectPill";

export const FilterBar = memo(() => {
  const dispatch = useAppDispatch();
  const sort = useAppSelector((state) => state.listings.sort);
  const statusFilter = useAppSelector((state) => state.listings.statusFilter);

  const handleSortChange = (value: string) => dispatch(setSort(value as SortOption));
  const handleStatusChange = (value: string) => dispatch(setStatusFilter(value as StatusFilter));

  return (
    <section className="filter-bar">  
      <SelectPill
        value={sort}
        onChange={(value) => handleSortChange(value as SortOption)}
        options={SORT_LABEL_MAP}  
        showChevron
      />

      <SelectPill
        value={statusFilter}
        displayValue="More filters"
        onChange={(value) => handleStatusChange(
          value as StatusFilter
        )}
        options={STATUS_LABEL_MAP}
        leadingIconClassName="fa-solid fa-sliders"
        showChevron={false}
      />
    </section>
  );
});


