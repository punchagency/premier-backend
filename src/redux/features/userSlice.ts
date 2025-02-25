import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface UserType {
  _id?: string;
  name?: string;
  email?: string;
  phone?: string;
  role?: string;
}

interface UserState {
  user: UserType | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const updateUserDetails = createAsyncThunk(
  'user/updateDetails',
  async (
    { name, phone }: { name: string; phone: string },
    { getState, rejectWithValue }
  ) => {
    try {
      const { user } = (getState() as any).user;
      
      if (!user?.email) {
        return rejectWithValue('User not authenticated');
      }
      
      const response = await fetch('/api/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.email, name, phone }),
      });
      
      console.log(response, "response");
      const data = await response.json();
      
      if (!data.success) {
        return rejectWithValue(data.message);
      }
      
      return data.user;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update user details');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType | null>) => {
      console.log(action.payload, "action.payload");
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.error = null;
    },
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setUser, setAuthenticated, logout } = userSlice.actions;
export default userSlice.reducer;