import { configureStore } from '@reduxjs/toolkit';
import { api } from '../api/api';
import userReducer from "../features/userSlice"
import messagesReducer from "../features/appMessagesSlice"

export const store =  configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user: userReducer,
    messages: messagesReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch