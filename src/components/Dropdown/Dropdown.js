import {
  Dropdown as DropdownShard,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "shards-react";

import styles from "./Dropdown.module.scss";

export default function Dropdown(props) {
  return (
    <div className={styles.dropdown}>
      <DropdownShard open={props.isOpen} toggle={props.toggle}>
        <DropdownToggle>{props.children}</DropdownToggle>
        <DropdownMenu right={!!props.right}>
          {props.menu?.map((item) => {
            const { onClick, label, ...itemProps } = item;
            return (
              <DropdownItem {...itemProps} onClick={onClick}>
                {label}
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </DropdownShard>
    </div>
  );
}
