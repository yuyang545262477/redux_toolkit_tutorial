import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const USER_URL = "https://jsonplaceholder.typicode.com/users";


export interface UserItem {
    id: string;
    name: string;
}

export type UserState = UserItem[];

const initialState: UserItem[] = [];

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
    const response = await axios.get(USER_URL);
    return [...response.data];
});


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            return action.payload;
        });

    },
});

export const selectAllUser = (state) => state.users;
export const selectUserById = (state, userId) => state.users.find(user => user.id === userId);

export default userSlice.reducer;
