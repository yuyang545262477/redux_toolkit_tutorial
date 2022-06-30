import {createSlice} from "@reduxjs/toolkit";

export interface UserItem {
    id: string;
    name: string;
}

export type UserState = UserItem[];

const initialState: UserItem[] = [
    {
        id: "0",
        name: "Dummy",
    },
    {
        id: "1",
        name: "Dummy2",
    },
    {
        id: "2",
        name: "Dummy3",
    },
];

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
});

export const selectAllUser = (state) => state.users;
export default userSlice.reducer;
