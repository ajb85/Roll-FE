import { combineClasses } from "js/utility";
import { useState, useEffect, useCallback } from "react";
import {
  Dropdown as DropdownShard,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "shards-react";

import styles from "./Dropdown.module.scss";

export default function Dropdown(props) {
  const { toggle: propsToggle } = props;
  const [isOpen, setIsOpen] = useState(false);

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
    <div className={styles.dropdown}>
      <DropdownShard open={isOpen} toggle={toggle}>
        <DropdownToggle className={combineClasses(!props.buttonBorder && styles.noBorder)}>
          {props.children}
        </DropdownToggle>
        <DropdownMenu right={!!props.right}>
          {props.menu?.map((item) => {
            const { onClick, label, ...itemProps } = item;
            return (
              <DropdownItem {...itemProps} key={label} onClick={onClick}>
                {label}
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </DropdownShard>
    </div>
  );
}
