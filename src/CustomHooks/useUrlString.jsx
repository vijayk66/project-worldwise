import { useSearchParams } from "react-router-dom";

export function useUrlString() {
  const [search, setSearch] = useSearchParams();
  const lat = search.get("lat");
  const lng = search.get("lng");

  return [lat, lng, setSearch];
}
