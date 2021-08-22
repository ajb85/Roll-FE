import { useProviderState } from "../providers/ColorProvider";

export default function useColorMode() {
  return useProviderState();
}
