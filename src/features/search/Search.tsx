import { Autocomplete } from "@base-ui/react/autocomplete";
import type { Location } from "@/api/types";
import { useSearch } from "./useSearch";
import { useWeatherContext } from "@/context/WeatherContext";
import { FaSearch } from "react-icons/fa";

import "./Search.scss";

const Search = () => {
  const { searchValue, setSearchValue, searchResults, isFetching, status } =
    useSearch();
  const { setCoord, setTimezone, setLocationName } = useWeatherContext();

  const isSearchResultHidden = !status && searchResults.length === 0;

  return (
    <Autocomplete.Root
      items={searchResults}
      value={searchValue}
      onValueChange={(nextValue) => setSearchValue(nextValue)}
      itemToStringValue={(item: Location) => item.name}
    >
      <label className="search-wrapper">
        <FaSearch
          className="search-icon"
          color="var(--clr-slate-400)"
          size={14}
        />
        <Autocomplete.Input
          className="search-input"
          placeholder="Search for a city or town"
        />
      </label>

      <Autocomplete.Portal hidden={isSearchResultHidden}>
        <Autocomplete.Positioner
          className="search-positioner"
          sideOffset={4}
          align="start"
        >
          <Autocomplete.Popup className="search-popup">
            <Autocomplete.Status>
              {status && (
                <div className="search-status">
                  {isFetching && <span className="search-spinner" />}
                  {status}
                </div>
              )}
            </Autocomplete.Status>
            <Autocomplete.List>
              {(location: Location) => (
                <Autocomplete.Item
                  className="search-item"
                  key={location.id}
                  value={location}
                  onClick={() => {
                    setCoord({
                      lat: location.latitude,
                      lon: location.longitude,
                    });
                    setTimezone(location.timezone);
                    setLocationName(location.name);
                  }}
                >
                  <span className="search-item__name">{location.name}</span>
                  <span className="search-item__country">
                    {location.admin1 ? `${location.admin1}, ` : ""}
                    {location.country}
                  </span>
                </Autocomplete.Item>
              )}
            </Autocomplete.List>
          </Autocomplete.Popup>
        </Autocomplete.Positioner>
      </Autocomplete.Portal>
    </Autocomplete.Root>
  );
};

export default Search;
