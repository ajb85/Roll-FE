import { useRef } from "react";
import { useParams } from "react-router-dom";

import LoadingDice from "components/LoadingDice/LoadingDice";

import { useJoinLink } from "hooks";

export default function JoinFromLink(props) {
  const didMount = useRef(false);
  const { uuid } = useParams();
  const { setJoinLink } = useJoinLink();

  !didMount.current && uuid && setJoinLink(uuid);
  didMount.current = true;

  return <LoadingDice />;
}
