import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  admissionDate: string;
  email: string;
  employeeName: string;
  status: string;
  cpf: string;
  id: string;
}

const fetchUsers = createAsyncThunk<User[]>("users/fetchUsers", async () => {
  const response = await axios.get("http://localhost:3000/registrations");
  return response.data;
});

const fetchUserByCpf = createAsyncThunk<User, string>(
  "users/fetchUserByCpf",
  async (cpf) => {
    const cleanedCpf = cpf.replace(/[^\d]/g, "");
    const response = await axios.get(
      `http://localhost:3000/registrations?cpf=${cleanedCpf}`
    );
    return response.data[0];
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [] as User[],
    user: null as User | null,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    resetUsers: (state) => {
      state.users = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching users";
      })
      .addCase(fetchUserByCpf.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserByCpf.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserByCpf.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching user";
      });
  },
});

export const { resetUsers } = userSlice.actions;
export default userSlice.reducer;
export { fetchUsers, fetchUserByCpf };
