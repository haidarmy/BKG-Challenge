import Config from 'react-native-config';
import {HOTEL_INFO_INIT_VALUE} from '@constants';
import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {HotelInfo, HotelResponse} from '@types';
import axios from 'axios';

type InitialState = {
  loading: boolean;
  hotel_info: HotelInfo;
  error: string;
};

const initialState: InitialState = {
  loading: false,
  hotel_info: HOTEL_INFO_INIT_VALUE,
  error: '',
};

const config = {
  headers: {
    'X-Parse-Application-Id': Config.APPLICATION_ID_2,
    'X-Parse-REST-API-Key': Config.API_KEY_2,
  },
  timeout: 2000,
};

export const fetchHotelInfo = createAsyncThunk('hotel/fetchHotelInfo', async () => {
  const res = await axios.get(`${Config.BASE_URL as string}/classes/hotel/bVonXoSUHK`, config);
  const data = res.data as HotelResponse;
  const hotelData = data.chosen_hotel.data.get_chosen_hotel;
  return hotelData;
});

const hotelSlice = createSlice({
  name: 'hotel',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchHotelInfo.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchHotelInfo.fulfilled, (state, action: PayloadAction<HotelInfo>) => {
      state.loading = false;
      state.hotel_info = action.payload;
      state.error = '';
    });
    builder.addCase(fetchHotelInfo.rejected, (state, action) => {
      state.loading = false;
      state.hotel_info = null as unknown as HotelInfo;
      state.error = action.error.message || 'Something went wrong';
    });
  },
});

export default hotelSlice.reducer;
