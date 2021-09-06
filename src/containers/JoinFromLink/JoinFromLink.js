import { useParams } from "react-router-dom";
import LoadingDice from "components/LoadingDice/LoadingDice";

import { useJoinLink } from "hooks";

export default function JoinFromLink(props) {
  const { uuid } = useParams();
  const { setJoinLink } = useJoinLink();

  uuid && setJoinLink(uuid);

  return <LoadingDice />;
}
