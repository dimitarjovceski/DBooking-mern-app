import { useQuery } from "react-query";
import { useSearchContext } from "../context/SearchContext";
import * as apiClient from "../api-client";
import React, { useState } from "react";
import SearchCard from "../components/SearchCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypesFilter from "../components/HotelTypesFilter";
import HotelFacilitiesFilter from "../components/HotelFacilitiesFilter";
import PriceFilter from "../components/PriceFilter";

const Search = () => {
  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
  const [sortOptions, setSortOptions] = useState<string>("");

  const search = useSearchContext();
  const searchParams = {
    destination: search?.destination,
    checkIn: search?.checkIn.toISOString(),
    checkOut: search?.checkOut.toISOString(),
    adultCount: search?.adultCount.toString(),
    childCount: search?.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedTypes,
    facilities: selectedFacilities,
    maxPrice: selectedPrice?.toString(),
    sortOptions,
  };

  const { data: hotelData } = useQuery(["searchHotels", searchParams], () =>
    apiClient.searchHotels(searchParams)
  );

  const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;

    setSelectedStars((prevStars) =>
      event.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating)
    );
  };

  const handleTypesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const hotelType = event.target.value;

    setSelectedTypes((prevType) =>
      event.target.checked
        ? [...prevType, hotelType]
        : prevType.filter((type) => type !== hotelType)
    );
  };

  const handleFacilitiesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const hotelFacility = event.target.value;

    setSelectedFacilities((prevFacility) =>
      event.target.checked
        ? [...prevFacility, hotelFacility]
        : prevFacility.filter((facility) => facility !== hotelFacility)
    );
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10 bg-slate-700">
        <div className="space-y-5">
          <h3 className="text-2xl font-semibold border-b border-slate-300 pb-5 text-white">
            Filter Types:
          </h3>
          <StarRatingFilter
            onChange={handleStarsChange}
            selectedStars={selectedStars}
          />
          <HotelTypesFilter
            onChange={handleTypesChange}
            selectedTypes={selectedTypes}
          />
          <HotelFacilitiesFilter
            onChange={handleFacilitiesChange}
            selectedFacilites={selectedFacilities}
          />
          <PriceFilter
            selectedPrice={selectedPrice}
            onChange={(value?: number) => setSelectedPrice(value)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-xl ">
            {hotelData?.pagination.totalHotels} Hotels found
            {search?.destination ? ` in ${search?.destination}` : ""}
          </span>
          <select
            className="p-2 rounded-md border border-slate-400"
            value={sortOptions}
            onChange={(event) => setSortOptions(event.target.value)}
          >
            <option value="">Sort By</option>
            <option value="starRating">Star Rating</option>
            <option value="pricePerNightAsc">
              Price per night (low to high)
            </option>
            <option value="pricePerNightDesc">
              Price per night (high to low)
            </option>
          </select>
        </div>
        {hotelData?.data.map((hotel) => (
          <SearchCard hotel={hotel} />
        ))}
        <div>
          <Pagination
            page={hotelData?.pagination.page || 1}
            pages={hotelData?.pagination.pages || 1}
            onPageChanged={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
