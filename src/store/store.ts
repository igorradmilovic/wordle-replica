import { configureStore, combineReducers } from "@reduxjs/toolkit";
import wordleReducer from "./features/wordle/wordleSlice";

export const rootReducer = combineReducers({
  wordle: wordleReducer,
});

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export const store = configureStore({
  reducer: rootReducer,
  devTools: {
    trace: true,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch;
