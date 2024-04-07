import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { BsMap, BsBuilding } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";

const MyHotels = () => {
  const { data: hotelData } = useQuery("getHotels", apiClient.getHotels, {
    onError: () => {},
  });

  if (!hotelData || hotelData.length === 0) {
    return (
      <div className="text-2xl font-bold text-center h-[200px]">
        Hotels not found!
        <span className="flex flex-col mt-5">
          <Link to="/add-hotel">
            <button className="bg-slate-700 font-bold text-white p-2 rounded-md hover:bg-slate-500">
              Add Hotel
            </button>
          </Link>
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <span className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
        <h2 className="text-2xl font-bold">My Hotels</h2>
        <Link to="/add-hotel">
          <button className="bg-slate-700 font-bold text-white p-2 rounded-md hover:bg-slate-500">
            Add Hotel
          </button>
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-8">
        {hotelData?.map((hotel) => (
          <div className="flex flex-col justify-between border p-5 border-slate-300 rounded-lg gap-5">
            <h2 className="sm:text-2xl font-bold">{hotel.name}</h2>
            <div className="hidden sm:block whitespace-pre-line">{hotel.description}</div>
            <div className="grid sm:grid-cols-5 gap-2">
              <div className="text-sm border border-slate-300 rounded-md p-3 flex items-center bg-slate-600 text-white hover:bg-slate-800">
                <BsMap className="mr-1" />
                {hotel.city}, {hotel.country}
              </div>
              <div className="text sm border border-slate-300 rounded-md p-3 flex items-center bg-slate-600 text-white hover:bg-slate-800">
                <BsBuilding className="mr-1" />
                {hotel.type}
              </div>
              <div className="text-sm border border-slate-300 rounded-md p-3 flex items-center bg-slate-600 text-white hover:bg-slate-800">
                <BiMoney className="mr-1" />${hotel.pricePerNight} per night
              </div>
              <div className="text-sm border border-slate-300 rounded-md p-3 flex items-center bg-slate-600 text-white hover:bg-slate-800">
                <BiHotel className="mr-1" />
                {hotel.adultCount} adults, {hotel.childCount} children
              </div>
              <div className="text-sm border border-slate-300 rounded-md p-3 flex items-center bg-slate-600 text-white hover:bg-slate-800">
                <BiStar className="mr-1" />
                {hotel.starRating} Star Rating
              </div>
            </div>
            <span className="flex justify-end">
              <Link
                to={`/edit-hotel/${hotel._id}`}
                className="bg-slate-700 font-bold text-white p-2 rounded-md hover:bg-slate-500"
              >
                View Details
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotels;
