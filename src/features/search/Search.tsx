import { Autocomplete } from "@base-ui/react/autocomplete";
import type { Location } from "@/api/types";
import { useSearch } from "./useSearch";
import { useWeatherContext } from "@/context/WeatherContext";
import { FaSearch } from "react-icons/fa";

import styles from "./Search.module.scss";

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
      <label className={styles.wrapper}>
        <FaSearch
          className={styles.icon}
          color="var(--clr-slate-400)"
          size={14}
        />
        <Autocomplete.Input
          className={styles.input}
          placeholder="Search for a city or town"
        />
      </label>

      <Autocomplete.Portal hidden={isSearchResultHidden}>
        <Autocomplete.Positioner
          className={styles.positioner}
          sideOffset={4}
          align="start"
        >
          <Autocomplete.Popup className={styles.popup}>
            <Autocomplete.Status>
              {status && (
                <div className={styles.status}>
                  {isFetching && <span className={styles.spinner} />}
                  {status}
                </div>
              )}
            </Autocomplete.Status>
            <Autocomplete.List>
              {(location: Location) => (
                <Autocomplete.Item
                  className={styles.item}
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
                  <span className={styles.name}>{location.name}</span>
                  <span className={styles.country}>
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
