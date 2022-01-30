import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, logout, register, fetchCandidates } from "./rest";

const initialState = {
  hr: null,
  isError: false,
  isSuccess: false,
  isFetching: false,
  isLoggedIn: false,
  candidates: [],
  error: null,
};

const loginHR = createAsyncThunk("/api/hr/login", (body, thunkAPI) => {
  return new Promise(async (resolve, reject) => {
    await login(body)
      .then((data) => resolve(data))
      .catch((error) => {
        reject(thunkAPI.rejectWithValue(error));
      });
  });
});

const registerHR = createAsyncThunk("/api/hr/register", (body, thunkAPI) => {
  return new Promise(async (resolve, reject) => {
    register(body)
      .then((data) => resolve(data))
      .catch((error) => {
        reject(thunkAPI.rejectWithValue(error));
      });
  });
});

const logoutHR = createAsyncThunk("/api/hr/logout", (body, thunkAPI) => {
  return new Promise(async (resolve, reject) => {
    logout(body)
      .then((data) => resolve(data))
      .catch((error) => {
        reject(thunkAPI.rejectWithValue(error));
      });
  });
});

const getCandidates = createAsyncThunk("/api/hr/logout", (body, thunkAPI) => {
  return new Promise(async (resolve, reject) => {
    fetchCandidates(body)
      .then((data) => resolve(data))
      .catch((error) => {
        reject(thunkAPI.rejectWithValue(error));
      });
  });
});

const HRSlice = createSlice({
  name: "HRState",
  initialState,
  reducers: {
    clearState: (state) => {
      state.hr = null;
      state.isSuccess = false;
      state.isError = false;
      state.isLoggedIn = false;
      state.candidates = [];
      state.error = "";
    },
  },
  extraReducers: {
    //login
    [loginHR.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [loginHR.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.isLoggedIn = true;
      state.hr = payload;
    },
    [loginHR.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.error = payload;
    },
    //register
    [registerHR.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [registerHR.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.isLoggedIn = true;
      state.hr = payload;
    },
    [registerHR.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.error = payload;
    },
    //logout
    [logoutHR.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [logoutHR.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.isLoggedIn = false;
      state.hr = null;
    },
    [logoutHR.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.error = payload;
    },
    //getCandidates
    [getCandidates.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [getCandidates.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.isLoggedIn = false;
      state.candidates = payload;
    },
    [getCandidates.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.error = payload;
    },
  },
});

export { loginHR, registerHR, logoutHR, getCandidates };

export const { clearState } = HRSlice.actions;

export const selectHR = (state) => state.HRState;

export default HRSlice.reducer;
