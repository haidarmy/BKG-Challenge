import {configureStore} from '@reduxjs/toolkit';
import hotelReducer from './features/hotelSlice';
import ordererReducer from './features/ordererSlice';

const store = configureStore({
  reducer: {
    hotel: hotelReducer,
    orderer: ordererReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
