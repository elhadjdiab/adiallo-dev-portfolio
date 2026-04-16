import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import projectsReducer from './slices/projectSlice';
import testimonialsReducer from './slices/testimonialsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer,
    testimonials: testimonialsReducer,
  },
});

export default store;