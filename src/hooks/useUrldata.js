import { useSearchParams } from "react-router-dom";

export function useUrldata() {
  const [searchparams] = useSearchParams();
  const lat = searchparams.get("lat");
  const lng = searchparams.get("lng");
  return { lat, lng };
}
