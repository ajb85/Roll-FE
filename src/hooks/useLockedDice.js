import { useState, createContext, useContext, useCallback } from "react";

const context = createContext();
const { Provider } = context;

const initialLockedDice = [false, false, false, false, false];

export function LockedDiceProvider(props) {
  const [lockedDice, setLockedDice] = useState(initialLockedDice);

  const resetLockedDice = useCallback(() => setLockedDice(initialLockedDice), [setLockedDice]);

  const toggleLockOnDie = useCallback(
    (e) => {
      let target = e.target;
      while (target?.dataset && target.dataset.index === undefined) {
        target = target.parentNode;
      }

      const index = Number(target.dataset.index);
      setLockedDice(lockedDice.map((v, i) => (i === index ? !v : v)));
    },
    [lockedDice, setLockedDice]
  );

  const value = { lockedDice, toggleLockOnDie, resetLockedDice };
  return <Provider value={value}>{props.children}</Provider>;
}

export default function useLockedDice() {
  return useContext(context);
}
