import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import authServices from "./userServices";
import LoginModel from "../../common/models/loginModel";
import User from "../../common/models/userModel";


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
      const res = await authServices.loginUser(loginModel);
      const user: User = {
        name: res.data.name,
        email: res.data.email,
        password: res.data.password,
        id: res.data.id,
        token: res.token
      };
      console.log("user abdddd");
      console.log(user);
      console.log("user dd");
      return user;
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
      const res = await authServices.addUser(registerModel);
      const user: User = {
        name: res.data.name,
        email: res.data.email,
        password: res.data.password,
        id: res.data.id,
        token: res.token
      };
      console.log("user abdddd");
      console.log(user);
      console.log("user dd");
      return user;
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
export const logout = createAsyncThunk("auth/logout", async () => {
  await authServices.logout();
});
const user: any = JSON.parse(localStorage.getItem("user") as string);

interface UserState {
  loading: boolean;
  error: string | null;
  auth: any;
  isSuccess: boolean;
}

const initialState: UserState = {
  loading: false,
  error: null,
  auth: user ? user : null,
  isSuccess: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = null;
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.auth = action.payload;
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
        state.auth = action.payload;
        state.isSuccess = true;
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
        console.log(action.payload);
        state.auth = null;
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
        state.auth = null;
        state.isSuccess = true;
      })
      .addCase(logout.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { reset } = userSlice.actions;
export default userSlice.reducer;
