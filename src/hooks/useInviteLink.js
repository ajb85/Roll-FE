import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import useAxios from "./useAxios";

export default function useInviteLink(getLink) {
  const { game_id } = useParams();
  const [link, setLink] = useState("");
  const [axios, isLoading, error, setError] = useAxios();

  useEffect(() => {
    if (!link && getLink) {
      axios.get(`/games/invite/create/${game_id}`).then((res) => {
        if (res?.uuid) {
          const { uuid } = res;
          setLink(`${window.location.protocol}//${window.location.host}/j/${uuid}`);
        } else {
          console.log("RES: ", res);
          setError(true);
        }
      });
    }
  }, [getLink, axios, link, game_id, setError]);

  return [link, isLoading, error, setError];
}
