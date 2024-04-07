export type UserType = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type HotelType = {
  _id: string;
  userId: string;
  name: string;
  city: string;
  description: string;
  country: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageUrls: string[];
  lastUpdated: Date;
  bookings: BookingType[];
};

export type BookingType = {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  totalCost: number,
  adultCount: number;
  childCount: number;
  checkIn: Date;
  checkOut: Date;
};

export type HotelSearchResponse = {
  data: HotelType[];
  pagination: {
    totalHotels: number;
    page: number;
    pages: number;
  };
};

export type PaymentIntentResponse = {
  paymentIntentId: string;
  clientSecret: string;
  totalCost: number;
};
