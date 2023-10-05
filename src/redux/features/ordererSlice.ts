import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {GuestData, User} from '@types';

type InitialState = {
  user: User;
  guest: GuestData[];
};

const initialState: InitialState = {
  user: {
    prefix: 'Tn.',
    name: 'Lucy Herzog',
    email: 'Joshuah.Koss41@example.org',
    phone: '+62 990 970 4548',
  },
  guest: [
    {
      id: 'f0de4ed4-1ae1-4cfe-adb0-390c2a56c429',
      prefix: 'Tn.',
      name: 'Sean Prohaska',
      isChosen: false,
    },
    {
      id: '5acf1d9e-29e3-44d3-bbd2-86b70d150498',
      prefix: 'Ny.',
      name: 'Drew Pollich',
      isChosen: true,
    },
    {
      id: 'dfaa5c0e-4f71-4c2f-953b-8a6854f76a32',
      prefix: 'Tn.',
      name: 'Vicki Brekke',
      isChosen: false,
    },
    {
      id: 'ae761dd4-21c6-43d5-99ea-251d837fa0db',
      prefix: 'Tn.',
      name: 'Marsha Schmidt',
      isChosen: false,
    },
    {
      id: '24ee3ff5-7e0f-4024-9f7d-15fe3e84f692',
      prefix: 'Ny.',
      name: 'Yvette Kuhic',
      isChosen: false,
    },
  ],
};

const ordererSlice = createSlice({
  initialState,
  name: 'orderer',
  reducers: {
    editGuest: (state, action: PayloadAction<GuestData[]>) => {
      state.guest = action.payload;
    },
  },
});

export const {editGuest} = ordererSlice.actions;
export default ordererSlice.reducer;
