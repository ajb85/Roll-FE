import { useCallback, memo, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";

import styles from "./EmojiPrompt.module.scss";
import { noFunc, noProp } from "js/utility";
import { addSubscription } from "js/closeOnClick";

export default memo(function EmojiPrompt(props) {
  const { onChange, close, isOpen } = props;
  const onEmojiClick = useCallback(
    (event, emojiObject) => {
      onChange?.(emojiObject);
    },
    [onChange]
  );

  useEffect(() => {
    close && addSubscription("emojiMenu", isOpen ? close : noFunc);
  }, [isOpen, close]);

  if (!props.isOpen) {
    return null;
  }

  return (
    <div className={styles.emojiWrapper} onClick={noProp}>
      <EmojiPicker preload onEmojiClick={onEmojiClick} />
    </div>
  );
});
