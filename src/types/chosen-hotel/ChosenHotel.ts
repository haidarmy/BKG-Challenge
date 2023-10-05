interface HotelRoom {
  meal: string;
  region: string;
  meal_code: string;
  room_name: string;
  sply_code: string;
  avail_sply: string;
  hotel_sply: string;
  room_grade: string;
  vendor_code: string;
  hotel_room_type_selected: string;
}

type Image = {
  url: string;
  title: string;
  thumbnail: string;
};

type Description = {
  title: string;
  description: string;
};

interface HotelDetail {
  zip: string;
  star: number;
  phone: string;
  images: Image[];
  address: string;
  latitude: number;
  longitude: number;
  facilities: string[];
  hotel_name: string;
  descriptions: Description[];
  region_hotel: string;
  is_recommended: boolean;
}

interface HotelParams {
  check_in: string;
  check_out: string;
  hotel_code: string;
  hotel_name: string;
  total_room: number;
  guest_adult: number;
  guest_infant: number;
  guest_children: number;
  guest_children_ages: number[];
}

type Policies = {
  cxl_fee: number;
  cxl_remark: string;
  cxl_end_date: Date;
  cxl_start_date: Date;
};

type PriceDetail = {
  total: number;
  currency: string;
  origin_total: number;
  corporate_fee: number;
  discount_price: number;
};

type ImportantInformation = {
  info: string;
};

interface HotelPrices {
  cxl_policies: Policies[];
  precode_book: string;
  price_detail: PriceDetail;
  is_refundable: boolean;
  discount_description: string;
  important_informations: ImportantInformation[];
}

export interface HotelInfo {
  chosen_hotel_room: HotelRoom;
  chosen_hotel_detail: HotelDetail;
  chosen_hotel_params: HotelParams;
  chosen_hotel_prices: HotelPrices;
  chosen_hotel_expired: Date;
}
