import { useEffect } from "react";

import { useGames } from "hooks/";

export default function AllGames(props) {
  const { getUsersGames } = useGames();

  useEffect(getUsersGames, [getUsersGames]);

  return null;
}
