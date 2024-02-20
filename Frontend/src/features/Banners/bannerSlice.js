import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import bannerService from "./bannerService";

export const createBanners = createAsyncThunk(
    "banner/create-banners",
    async (banner,thunkAPI) => {
      try {
        return await bannerService.createBanner(banner);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

export const getBanner = createAsyncThunk(
    "banner/get-banners",
    async (thunkAPI) => {
      try {
        return await bannerService.getBanners();
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  export const updateBanners = createAsyncThunk(
    "banner/update-banner",
    async (data, thunkAPI) => {
      try {
        return await bannerService.updateBanner(data);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);
  export const deleteABanner = createAsyncThunk(
    "banner/delete-banner",
    async (id, thunkAPI) => {
      try {
        return await bannerService.deleteBanner(id);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
);
export const resetState = createAction("Reset_all");

const initialState = {
    banners: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};
export const bannerSlice = createSlice({
    name: "banners",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getBanner.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getBanner.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.banners = action.payload;
        })
        .addCase(getBanner.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        })
        .addCase(createBanners.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(createBanners.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.createBanner = action.payload;
        })
        .addCase(createBanners.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        })
        .addCase(updateBanners.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(updateBanners.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.updatedBanner = action.payload;
        })
        .addCase(updateBanners.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        })
        .addCase(deleteABanner.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(deleteABanner.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.deleteBanner = action.payload;
        })
        .addCase(deleteABanner.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isSuccess = false;
          state.message = action.error;
        })
      .addCase(resetState, () => initialState);

    },
  });
  export default bannerSlice.reducer;