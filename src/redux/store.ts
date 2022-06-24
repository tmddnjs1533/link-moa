import { configureStore } from "@reduxjs/toolkit";
import dialogSlice from "./dialogSlice";
import toastSlice from "./toastSlice";
export const store = configureStore({
  reducer: {
    dialog: dialogSlice,
    toast: toastSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export const dialogState = (state: ReturnType<typeof store.getState>) =>
  state.dialog;
export const toastState = (state: ReturnType<typeof store.getState>) =>
  state.toast;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
