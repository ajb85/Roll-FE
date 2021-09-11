import { ColorProvider } from "../../hooks/useColorMode.js";
import { ScreenSizeProvider } from "../../hooks/useScreenSize.js";
import { AccountProvider } from "hooks/useAccount.js";
import { ErrorsProvider } from "hooks/useErrors.js";
import { GamesProvider } from "hooks/useGames.js";
import { LockedDiceProvider } from "hooks/useLockedDice.js";
import { SocketProvider } from "hooks/useSocket/useSocket.js";
import { TokenProvider } from "hooks/useToken.js";
import { JoinLinkProvider } from "hooks/useJoinLink.js";
import { ViewingPlayerProvider } from "hooks/useViewingPlayer.js";

export default function Providers({ children }) {
  return (
    <TokenProvider>
      <ScreenSizeProvider>
        <ColorProvider>
          <LockedDiceProvider>
            <ErrorsProvider>
              <AccountProvider>
                <ViewingPlayerProvider>
                  <GamesProvider>
                    <JoinLinkProvider>
                      <SocketProvider>{children}</SocketProvider>
                    </JoinLinkProvider>
                  </GamesProvider>
                </ViewingPlayerProvider>
              </AccountProvider>
            </ErrorsProvider>
          </LockedDiceProvider>
        </ColorProvider>
      </ScreenSizeProvider>
    </TokenProvider>
  );
}
