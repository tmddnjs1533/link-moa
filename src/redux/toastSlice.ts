import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AlertColor } from "@mui/material";

export interface ToastContext {
  show: boolean;
  status?: AlertColor;
  message?: string;
}

export type ToastOptionContext = Omit<ToastContext, "show">;

const initialState: ToastContext = {
  show: false,
  status: "success",
  message: "정상정으로 처리되었습니다.",
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    setToastShow: {
      reducer(state, action: PayloadAction<ToastOptionContext>) {
        state.show = true;
        state.message = action.payload.message;
        state.status = action.payload.status;
      },
      prepare({
        message = "정상정으로 처리되었습니다.",
        status = "success",
      }: ToastOptionContext) {
        return {
          payload: { message, status },
        };
      },
    },
    setToastHide: (state) => {
      state.show = false;
    },
  },
});

export const { setToastShow, setToastHide } = toastSlice.actions;
export default toastSlice.reducer;
