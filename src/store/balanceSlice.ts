import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

interface BalanceState {
  amount: number | null;
  loading: boolean;
  error: string | null;
  showBalance: boolean;
}

const initialState: BalanceState = {
  amount: null,
  loading: false,
  error: null,
  showBalance: localStorage.getItem('showBalance') === 'true',
};

export const fetchBalance = createAsyncThunk('balance/fetch', async () => {
  const response = await api.get('/balance');
  return response.data.data.balance;
});

const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    toggleShowBalance: (state) => {
      state.showBalance = !state.showBalance;
      localStorage.setItem('showBalance', state.showBalance.toString());
    },
    clearBalance: (state) => {
      state.amount = null;
      state.error = null;
      state.showBalance = false;
      localStorage.removeItem('showBalance');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.amount = action.payload;
      })
      .addCase(fetchBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch balance';
      });
  },
});

export const { toggleShowBalance, clearBalance } = balanceSlice.actions;
export default balanceSlice.reducer;
