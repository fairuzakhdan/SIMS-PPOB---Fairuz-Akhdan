import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

interface ProfileData {
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string;
}

interface ProfileState {
  data: ProfileData | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchProfile = createAsyncThunk('profile/fetch', async () => {
  const response = await api.get('/profile');
  return response.data.data;
});

export const updateProfile = createAsyncThunk(
  'profile/update',
  async (data: { first_name: string; last_name: string }) => {
    const response = await api.put('/profile/update', data);
    return response.data.data;
  }
);

export const updateProfileImage = createAsyncThunk(
  'profile/updateImage',
  async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.put('/profile/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.data;
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfile: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch profile';
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(updateProfileImage.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
