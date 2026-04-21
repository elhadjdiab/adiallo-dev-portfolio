import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projects: [],
  loading: false,
  error: null,
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.projects = action.payload;
    },
    fetchFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure } = projectsSlice.actions;

export const fetchProjects = () => async (dispatch) => {
  dispatch(fetchStart());
  try {
    const response = await fetch('/api/projects');
    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      throw new Error(payload.error || 'Impossible de recuperer les projets.');
    }
    const data = await response.json();
    dispatch(fetchSuccess(data));
  } catch (error) {
    dispatch(fetchFailure(error.message || 'Erreur inconnue.'));
  }
};

export default projectsSlice.reducer;