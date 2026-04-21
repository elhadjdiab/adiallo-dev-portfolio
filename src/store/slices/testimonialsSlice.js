import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  testimonials: [],
  loading: false,
  error: null,
};

const testimonialsSlice = createSlice({
  name: 'testimonials',
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.testimonials = action.payload;
    },
    fetchFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure } = testimonialsSlice.actions;

export const fetchTestimonials = () => async (dispatch) => {
  dispatch(fetchStart());
  try {
    const response = await fetch('/api/testimonials');
    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      throw new Error(payload.error || 'Impossible de recuperer les temoignages.');
    }
    const data = await response.json();
    dispatch(fetchSuccess(data));
  } catch (error) {
    dispatch(fetchFailure(error.message || 'Erreur inconnue.'));
  }
};

export default testimonialsSlice.reducer;