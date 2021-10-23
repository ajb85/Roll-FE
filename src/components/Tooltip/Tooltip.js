import { useState, useEffect, useCallback } from "react";
import { Tooltip as ShardsTooltip } from "shards-react";

// import styles from "./Tooltip.module.scss";

export default function Tooltip(props) {
  const { toggle: propsToggle } = props;
  const [isOpen, setIsOpen] = useState(false);
  const target = props.target ? `#${props.target}` : undefined;

  useEffect(() => {
    if (props.isOpen !== undefined) {
      setIsOpen(props.isOpen);
    }
  }, [props.isOpen]);

  const toggle = useCallback(() => {
    const value = !isOpen;
    propsToggle?.(value);
    setIsOpen(value);
  }, [isOpen, setIsOpen, propsToggle]);

  return (
    <ShardsTooltip
      className={props.className}
      trigger={props.trigger || "hover"}
      open={isOpen}
      target={target}
      toggle={toggle}
    >
      {props.children}
    </ShardsTooltip>
  );
}
