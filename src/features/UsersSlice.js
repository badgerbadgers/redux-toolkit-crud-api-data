import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: { data: [] },
  reducers: {
    getUsers: (state, action) => {
      state.data = action.payload;
      console.log("state get users", state.data);
      console.log("action.payload", action.payload);
    },
    addUser: (state, action) => {
      //uses push method to modify array's data
      state.data.push(action.payload);
      console.log("state add users", state.data);
      console.log("action.payload in  adduser", action.payload);
    },

    deleteUser: (state, action) => {
      //uses filter to create a shallow array
      console.log("deleteUser action.payload", action.payload);
      state.data = state.data.filter(
        (user) => user.email !== action.payload.id
      );
    },

    updateUsername: (state, action) => {
      console.log(action.payload);
      //users map method and if statement to modify the index
      state.data.map((user) => {
        if (user.email === action.payload.id) {
          user.email = action.payload.email;
        }
      });
      console.log("state.data", state.data);
    }
  }
});

export const {
  getUsers,
  addUser,
  deleteUser,
  updateUsername
} = userSlice.actions;
export default userSlice.reducer;
