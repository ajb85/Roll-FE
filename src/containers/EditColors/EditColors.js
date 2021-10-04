import { useState, useEffect, useCallback } from "react";
import { InputGroup, InputGroupText, InputGroupAddon, FormInput, Button } from "shards-react";
import { SketchPicker } from "react-color";

import { colorKeys } from "hooks/useColorThemes";
import Dropdown from "components/Dropdown/";
import Tooltip from "components/Tooltip";
import Die from "components/Die/";

import { useColorThemes } from "hooks";
import { combineClasses, noFunc, noProp } from "js/utility";
import { addSubscription } from "js/closeOnClick";

import styles from "./EditColors.module.scss";

export default function EditColors(props) {
  const colorState = useColorThemes();

  const [colors, setColors] = useState(colorState.colors);
  const [themeName, setThemeName] = useState("");
  const [prompts, setPrompts] = useState(
    colorKeys.reduce((acc, color) => {
      acc[color.name] = false;
      return acc;
    }, {})
  );

  const noChangesMade = colorKeys.every((color) => {
    return colorState.colors[color.name] === colors[color.name];
  });

  const openPrompt = useCallback(
    (e) => {
      let target = e.target;

      while (!target.dataset.color) {
        target = target.parentNode;
      }
      if (target.dataset.color) {
        setPrompts(
          colorKeys.reduce((acc, color) => {
            acc[color.name] = target.dataset.color === color.name;
            return acc;
          }, {})
        );
      }
    },
    [setPrompts]
  );

  const closePrompts = useCallback(() => {
    setPrompts(
      colorKeys.reduce((acc, color) => {
        acc[color.name] = false;
        return acc;
      }, {})
    );
  }, [setPrompts]);

  const updatethemeName = useCallback((e) => setThemeName(e.target.value), [setThemeName]);

  const saveColors = useCallback(() => {
    colorState.addTheme(colorState.colors.name, colors);
  }, [colorState.addTheme, colorState.colors.name, colors]);

  const saveColorsAs = useCallback(() => {
    themeName && colorState.addTheme(themeName, colors);
    setThemeName("");
  }, [colorState.addTheme, themeName, colors]);

  useEffect(() => {
    const allPromptsClosed = Object.values(prompts).every((v) => !v);
    addSubscription("colorMenus", allPromptsClosed ? noFunc : closePrompts);
  }, [prompts, closePrompts]);

  useEffect(() => {
    colorState.updateCSSColors(colors);
    return () => colorState.updateCSSColors(colorState.colors);
  }, [colors]);

  useEffect(() => {
    setColors(colorState.colors);
  }, [colorState.colors]);

  const saveAsButtonDisabled = noChangesMade || !themeName;
  return (
    <div className={styles.editWrapper}>
      {!noChangesMade && (
        <h2 className={styles.unsaved}>
          <Die face={6} size="small" /> You have unsaved changes! <Die face={6} size="small" />
        </h2>
      )}
      <h2>Customize App Colors</h2>
      <div className={styles.dropdownWrapper}>
        <div className={styles.controlsWrapper}>
          <div>
            <span>Theme</span>
            <Dropdown
              menu={Object.keys(colorState.themes).map((theme) => ({
                label: colorState.themes[theme].name,
                onClick: () => colorState.setTheme(theme),
              }))}
              buttonBorder
            >
              {colors.name}
            </Dropdown>
          </div>
          {!colorState.colors.preset && (
            <div id={styles.saveColorsButton}>
              <Button id={styles.saveColorsButton} disabled={noChangesMade} onClick={saveColors}>
                Save
              </Button>
            </div>
          )}
          {!colorState.colors.preset && noChangesMade && (
            <Tooltip target={styles.saveColorsButton}>No changes made to save</Tooltip>
          )}
        </div>
        <div className={styles.saveAsWrapper}>
          <FormInput value={themeName} onChange={updatethemeName} placeholder="Theme Name" />
          <div id={styles.saveColorsAsButton}>
            <Button disabled={saveAsButtonDisabled} onClick={saveColorsAs}>
              Save As
            </Button>
          </div>
          {saveAsButtonDisabled && (
            <Tooltip target={styles.saveColorsAsButton}>
              {noChangesMade ? "No changes made to save" : !themeName ? "No theme name given" : ""}
            </Tooltip>
          )}
        </div>
      </div>
      {colorKeys.map((color) => {
        return (
          <div key={color.name} className={styles.inputWrapper}>
            <InputGroup>
              <InputGroupAddon type="append">
                <InputGroupText className={styles.prefix}>{color.displayName}</InputGroupText>
              </InputGroupAddon>
              <FormInput
                readOnly
                onClick={openPrompt}
                data-color={color.name}
                value={colors[color.name]}
              />
              <InputGroupAddon onClick={openPrompt} data-color={color.name} type="append">
                <InputGroupText>
                  <div
                    style={{ backgroundColor: colors[color.name] }}
                    className={combineClasses(styles.colorBlock)}
                  />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>

            {prompts[color.name] && (
              <div className={styles.colorPrompt} onClick={noProp}>
                <div>
                  <SketchPicker
                    color={colors[color.name]}
                    onChangeComplete={(e) => setColors({ ...colors, [color.name]: e.hex })}
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}
      <div className={styles.reserveSpace} />
    </div>
  );
}
