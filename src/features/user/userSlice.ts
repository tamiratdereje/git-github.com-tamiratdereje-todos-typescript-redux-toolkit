import { createAsyncThunk, createSlice, PayloadAction,  } from "@reduxjs/toolkit";
import authServices from "./userServices";
import LoginModel from "../../common/models/loginModel";
import User from "../../common/models/userModel";

// const user = JSON.parse(localStorage.getItem('user')??'');


export const fetchUserById = createAsyncThunk(
  "users/fetchById",
  async (userId, thunkAPI) => {
    try {
      const response = await fetch(`https://reqres.in/api/users/${userId}`);
      return await response.json();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const login = createAsyncThunk(
  "users/login",
  async (loginModel: LoginModel, thunkAPI) => {
    try {
      return await authServices.loginUser(loginModel);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const register = createAsyncThunk(
    "users/register",
    async (registerModel: User, thunkAPI) => {
        try {
            return await authServices.addUser(registerModel);
        } catch (error: any) {
        const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);
export const logout = createAsyncThunk('auth/logout', async () => {
    await authServices.logout()
  })


interface UserState {
  loading: boolean;
  error: string | null;
  data: any;
  isSuccess: boolean;
}

const initialState: UserState = {
  loading: false,
  error: null,
  data: null,
  isSuccess: false,
  

};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset : (state) => {
        state.loading = false;
        state.error = null;
        state.data = null;
        state.isSuccess = false;
    }
  },
  extraReducers: (builder) =>{
    builder
    .addCase(fetchUserById.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
    })
    .addCase(fetchUserById.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(login.pending, (state) => {
        state.loading = true;
    })
    .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
    })
    .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(register.pending, (state) => {
        state.loading = true;
    })
    .addCase(register.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
    })
    .addCase(register.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(logout.pending, (state) => {
        state.loading = true;
    })
    .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
    })
    .addCase(logout.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
    })
  },
});
export const { reset } = userSlice.actions;
export default userSlice.reducer;
