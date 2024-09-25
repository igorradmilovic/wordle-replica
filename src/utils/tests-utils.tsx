import React, { PropsWithChildren } from "react";
import { AppStore, RootState, setupStore } from "../store/store";
import { render, RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import words from "../words.json";

export const initialWordleState = {
  allAvailableWords: words,
  guesses: [],
  word: "test",
  currentGuessIndex: 0,
  warning: "",
};

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  { preloadedState, store = setupStore(preloadedState), ...renderOptions }: ExtendedRenderOptions
) {
  function Wrapper({ children }: PropsWithChildren<{}>) {
    return <Provider store={store}>{children}</Provider>;
  }

  return { ...store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
