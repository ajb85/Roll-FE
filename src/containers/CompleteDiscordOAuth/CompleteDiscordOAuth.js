import { useParams, Redirect } from "react-router-dom";
import { useAccount } from "hooks/";

export default function CompleteDiscordOAuth(props) {
  const { code } = useParams();
  const { saveCode } = useAccount();

  saveCode(code);
  return <Redirect to="/profile" />;
}
