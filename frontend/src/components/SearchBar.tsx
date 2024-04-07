import { FormEvent, useState } from "react";
import { useSearchContext } from "../context/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const search = useSearchContext();
  const navigate = useNavigate();

  const [destination, setDestination] = useState<string>(search?.destination);
  const [checkIn, setCheckIn] = useState<Date>(search?.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search?.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search?.adultCount);
  const [childCount, setChildCount] = useState<number>(search?.childCount);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );
    navigate("/search");
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  return (
    <form
      onSubmit={handleSubmit}
      className="-mt-8 p-3 bg-slate-800 gap-5 rounded shadow-md items-center grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-5"
    >
      <div className="flex flex-col sm:flex-row items-center flex-1 bg-white p-2">
        <MdTravelExplore size={25} className="mr-2" />
        <input
          placeholder="Where are you going?"
          className="text-md w-full focus:outline-none"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>

      <div className="flex bg-white px-2 py-1 gap-2">
        <label className="flex flex-col sm:flex-row items-center">
          Adults:
          <input
            type="number"
            min={1}
            max={20}
            className="w-full p-1 focus:outline-none font-bold"
            value={adultCount}
            onChange={(e) => setAdultCount(parseInt(e.target.value))}
          />
        </label>

        <label className="flex flex-col sm:flex-row items-center">
          Children:
          <input
            type="number"
            min={0}
            max={20}
            className="w-full p-1 focus:outline-none font-bold"
            value={childCount}
            onChange={(e) => setChildCount(parseInt(e.target.value))}
          />
        </label>
      </div>
      <div>
        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-in Date"
          className="min-w-full bg-white p-2 focus:outline-none"
          wrapperClassName="min-w-full"
        />
      </div>
      <div>
        <DatePicker
          selected={checkOut}
          onChange={(date) => setCheckOut(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-Out Date"
          className="min-w-full bg-white p-2 focus:outline-none"
          wrapperClassName="min-w-full"
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-500 p-2 rounded-md text-white hover:bg-blue-300 text-xl w-full"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
