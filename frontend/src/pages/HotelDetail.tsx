import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { AiFillStar } from "react-icons/ai";
import GuestsForm from "../forms/GuestsForm/GuestsForm";
const HotelDetail = () => {
  const { hotelId } = useParams();

  const { data: hotel } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    }
  );

  if (!hotel) {
    return <></>;
  }
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {hotel?.imageUrls.map((image) => (
          <div className="h-[300px]">
            <img
              src={image}
              alt={hotel.name}
              className="rounded-md w-full h-full object-cover object-center"
            />
          </div>
        ))}
        <div className="text-2xl ">
          <h2 className="font-bold">{hotel.name}</h2>
        
          <div className="text-sm font-bold">
            <span>{hotel.city}, {hotel.country}</span>
          </div>
          <span className="flex mt-2">
            {Array.from({ length: hotel.starRating }).map(() => (
              <AiFillStar className="fill-yellow-400" />
            ))}
          </span>
          <div className="mt-2 font-bold">
            {hotel.type}
          </div>
        </div>
       
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {hotel?.facilities.map((facility) => (
          <div className="border border-slate-300 bg-slate-600 text-center text-white rounded-md p-3 hover:bg-slate-800 cursor-pointer">
            {facility}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
        <div className="whitespace-pre-line">{hotel?.description}</div>
        <div className="h-fit mt-4 sm:mt-4">
          <GuestsForm
            hotelId={hotelId as string}
            pricePerNight={hotel.pricePerNight}
          />
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;
