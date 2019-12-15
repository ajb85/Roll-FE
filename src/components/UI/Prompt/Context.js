import React, { useState, createContext } from 'react';

export const PromptContext = createContext();

const initialPrompt = {
  cancel: () => console.error('NO CANCEL FUNCTION GIVEN TO PROMPT'),
  confirm: () => console.error('NO CONFIRM FUNCTION GIVEN TO PROMPT'),
  copy: '',
  showPrompt: false,
  yesButtonText: 'Yes',
  noButtonText: 'Cancel'
};

export function PromptProvider(props) {
  const [promptState, setPromptState] = useState(initialPrompt);

  const updatePromptState = data => setPromptState({ ...promptState, ...data });

  const resetPrompt = () => setPromptState(initialPrompt);

  const togglePrompt = () =>
    setPromptState({ ...promptState, showPrompt: !promptState.showPrompt });

  const { Provider } = PromptContext;

  return (
    <Provider
      value={{
        promptState,
        setPromptState: updatePromptState,
        resetPrompt,
        togglePrompt
      }}
    >
      {props.children}
    </Provider>
  );
}
