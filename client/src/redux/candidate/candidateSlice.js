import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, register, update } from "./rest";

const initialState = {
  candidate: null,
  isError: false,
  isSuccess: false,
  isFetching: false,
  error: null,
};

const loginCandidate = createAsyncThunk(
  "/api/candidate/login",
  (body, thunkAPI) => {
    return new Promise(async (resolve, reject) => {
      await login(body)
        .then((data) => resolve(data))
        .catch((error) => {
          reject(thunkAPI.rejectWithValue(error));
        });
    });
  }
);

const registerCandidate = createAsyncThunk(
  "/api/candidate/register",
  (body, thunkAPI) => {
    return new Promise(async (resolve, reject) => {
      register(body)
        .then((data) => resolve(data))
        .catch((error) => {
          reject(thunkAPI.rejectWithValue(error));
        });
    });
  }
);

const updateCandidate = createAsyncThunk(
  "/api/candidate/update",
  (body, thunkAPI) => {
    return new Promise(async (resolve, reject) => {
      update(body)
        .then((data) => resolve(data))
        .catch((error) => {
          reject(thunkAPI.rejectWithValue(error));
        });
    });
  }
);

const candidateSlice = createSlice({
  name: "candidateState",
  initialState,
  reducers: {
    clearState: (state) => {
      state.candidate = null;
      state.isSuccess = false;
      state.isError = false;
      state.error = "";
    },
  },
  extraReducers: {
    //login
    [loginCandidate.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [loginCandidate.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.candidate = payload.candidate;
    },
    [loginCandidate.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.error = payload;
    },
    //register
    [registerCandidate.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [registerCandidate.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.candidate = payload.candidate;
    },
    [registerCandidate.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      console.log(payload);
      state.error = payload;
    },
    //update
    [updateCandidate.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [updateCandidate.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.candidate = payload.candidate;
    },
    [updateCandidate.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.error = payload;
    },
  },
});

export { loginCandidate, registerCandidate, updateCandidate };

export const { clearState } = candidateSlice.actions;

export const selectCandidate = (state) => state.candidateState;

export default candidateSlice.reducer;
