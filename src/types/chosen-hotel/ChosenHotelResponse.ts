import {HotelInfo} from './ChosenHotel';

type Data = {
  get_chosen_hotel: HotelInfo;
};
type Header = {
  reason: string;
  messages: string[];
  error_code: string;
  process_time: number;
};

type ChosenHotel = {
  data: Data;
  header: Header;
};

export type HotelResponse = {
  objectId: string;
  createdAt: Date;
  updatedAt: Date;
  chosen_hotel: ChosenHotel;
};
