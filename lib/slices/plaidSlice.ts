import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlaidState {
  isConnected: boolean;
  accessToken: string | null;
}

const initialState: PlaidState = {
  isConnected: false,
  accessToken: null,
};

const plaidSlice = createSlice({
  name: "plaid",
  initialState,
  reducers: {
    setPlaidConnection: (state, action: PayloadAction<string>) => {
      state.isConnected = true;
      state.accessToken = action.payload;
    },
    resetPlaidConnection: (state) => {
      state.isConnected = false;
      state.accessToken = null;
    },
  },
});

export const { setPlaidConnection, resetPlaidConnection } = plaidSlice.actions;
export default plaidSlice.reducer;
