// store.js
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './Todo_slice';

export default configureStore({
  reducer: {
    todos: todoReducer,
  },
});
