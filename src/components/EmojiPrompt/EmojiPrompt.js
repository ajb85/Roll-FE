import { useCallback, memo, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";

import styles from "./EmojiPrompt.module.scss";
import { combineClasses, noFunc, noProp } from "js/utility";
import { addSubscription } from "js/closeOnClick";
import { useScreenSize } from "hooks";

export default memo(function EmojiPrompt(props) {
  const { onChange, close, isOpen } = props;
  const { isDesktop } = useScreenSize();

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
    <div
      className={combineClasses(styles.emojiWrapper, !isDesktop && styles.mobile)}
      onClick={noProp}
    >
      <EmojiPicker preload onEmojiClick={onEmojiClick} />
    </div>
  );
});
