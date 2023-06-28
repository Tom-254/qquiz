import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// Types

type UserState = {
  id: string;
  full_name: string;
  email: string;
  profile_image: string | null;
};

export const initialState: UserState = {
  id: "",
  full_name: "",
  email: "",
  profile_image: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIdValue: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setNameValue: (state, action: PayloadAction<string>) => {
      state.full_name = action.payload;
    },
    setEmailValue: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setProfileImageValue: (state, action: PayloadAction<string | null>) => {
      state.profile_image = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setIdValue, setNameValue, setEmailValue, setProfileImageValue } = userSlice.actions;

export default userSlice.reducer;
