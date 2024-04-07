import { AiFillStar } from "react-icons/ai";
import { HotelType } from "../../../backend/src/shared/types";
import { Link } from "react-router-dom";

type Props = {
  hotel: HotelType;
};

const SearchCard = ({ hotel }: Props) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border bg-white rounded-md border-slate-400 gap-2 p-6">
      <div className="w-full h-[300px]">
        <img
          src={hotel.imageUrls[0]}
          className="w-full h-full object-cover object-center rounded-md"
        />
      </div>
      <div className="grid grid-rows-[1fr_2fr_3fr]">
        <div className="flex items-center">
          <span className="flex">
            {Array.from({ length: hotel.starRating }).map(() => (
              <AiFillStar className="fill-yellow-400" />
            ))}
          </span>
          <span className="text-sm ml-1">{hotel.type}</span>
        </div>
        <div>
          <Link
            to={`/hotels/${hotel._id}`}
            className="font-lg font-bold cursor-pointer"
          >
            {hotel.name}
          </Link>
        </div>

        <div>
          <span className="line-clamp-4">{hotel.description}</span>
        </div>

        <div className="grid grid-cols-2 items-end whitespace-nowrap">
          <div className="flex gap-1 items-center">
            {hotel.facilities.slice(0, 3).map((facility) => (
              <span
                key={facility}
                className="bg-slate-300 p-2 rounded-md font-bold text-xs whitespace-nowrap"
              >
                {facility}
              </span>
            ))}
            <span className="text-sm">
              {hotel.facilities.length > 3 &&
                `+${hotel.facilities.length - 3} more`}
            </span>
          </div>
          <div className="flex flex-col justify-end items-end gap-2">
            <span className="text-sm font-bold">
              ${hotel.pricePerNight} per night
            </span>
            <Link
              className="bg-slate-700 p-2 h-full text-white hover:bg-slate-500 cursor-pointer rounded-md"
              to={`/hotels/${hotel._id}`}
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
