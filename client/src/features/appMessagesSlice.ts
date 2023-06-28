import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// Types

type MessageState = {
  type: "error" | "success" | "Pending";
  message: string;
};

export const initialState: MessageState = {
  type: "success",
  message: "",
};

export const appMessagesSlice = createSlice({
  name: "appMessages",
  initialState,
  reducers: {
    setTypeValue: (
      state,
      action: PayloadAction<"error" | "success" | "Pending">
    ) => {
      state.type = action.payload;
    },
    setMessageValue: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTypeValue, setMessageValue } = appMessagesSlice.actions;

export default appMessagesSlice.reducer;
