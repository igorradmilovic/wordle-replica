import { configureStore } from "@reduxjs/toolkit";
import wordleReducer from "./features/wordle/wordleSlice";

export const store = configureStore({
  reducer: {
    wordle: wordleReducer,
  },
  devTools: {
    trace: true,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
