import React from "react";

import {
  GiPerspectiveDiceSixFacesFive,
  GiInvertedDice1,
  GiInvertedDice2,
  GiInvertedDice3,
  GiInvertedDice4,
  GiInvertedDice5,
  GiInvertedDice6,
} from "react-icons/gi";

import { BiErrorAlt } from "react-icons/bi";

// Roll! dice
import rDie from "img/R.png";
import oDie from "img/O.png";
import lDie from "img/L.png";
import exclaimDie from "img/e.png";

import { combineClasses } from "js/utility.js";
import styles from "./Die.module.scss";

const dieImageLookup = {
  r: rDie,
  o: oDie,
  l: lDie,
  e: exclaimDie,
  "!": exclaimDie,
  exclaim: exclaimDie,
};

const lightDieIconLookup = [
  GiPerspectiveDiceSixFacesFive,
  GiInvertedDice1,
  GiInvertedDice2,
  GiInvertedDice3,
  GiInvertedDice4,
  GiInvertedDice5,
  GiInvertedDice6,
];

export default function Die(props) {
  const { face, size = "medium", style = {}, innerStyle = {} } = props;

  const img = dieImageLookup[face] && (
    <img style={innerStyle} src={dieImageLookup[face]} alt={`${face} die`} />
  );

  const Icon = lightDieIconLookup[face];

  return (
    <div
      data-index={props.index === undefined ? "none" : props.index}
      className={combineClasses(styles.die, styles[size] || styles.small)}
      style={style}
      {...props}
    >
      {img || (Icon && <Icon style={innerStyle} />) || <BiErrorAlt />}
    </div>
  );
}
