import { useProviderState } from "../providers/ScreenSizeProvider";

export default function useColorMode() {
  return useProviderState();
}
