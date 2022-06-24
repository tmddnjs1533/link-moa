import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DialogContext {
  show: boolean;
  title?: string;
  message?: string;
}

export type DialogTextContext = Omit<DialogContext, "show">;

const initialState: DialogContext = {
  show: false,
  title: "",
  message: "",
};

export const customDialogSlice = createSlice({
  name: "customDialog",
  initialState,
  reducers: {
    setShow: (state) => {
      state.show = true;
    },
    setHide: (state) => {
      state.show = false;
    },
    setMessage: {
      reducer(state, action: PayloadAction<DialogTextContext>) {
        state.title = action.payload.title;
        state.message = action.payload.message;
      },
      prepare({
        title = "계속하시겠습니까?",
        message = "",
      }: DialogTextContext) {
        return {
          payload: { title, message },
        };
      },
    },
  },
});

export const { setShow, setHide, setMessage } = customDialogSlice.actions;
export default customDialogSlice.reducer;
