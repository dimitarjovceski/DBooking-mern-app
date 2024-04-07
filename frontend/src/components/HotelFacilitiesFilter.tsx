import React from "react";
import { hotelFacilities } from "../config/types-hotel-config";

export type Props = {
  selectedFacilites: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const HotelFacilitiesFilter = ({ selectedFacilites, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5 text-white">
      <h4 className="text-lg font-semibold mb-2">Facilities</h4>
      {hotelFacilities.map((facility) => (
        <label key={facility} className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="rounded"
            value={facility}
            checked={selectedFacilites.includes(facility)}
            onChange={onChange}
          />
          <span>{facility}</span>
        </label>
      ))}
    </div>
  );
};

export default HotelFacilitiesFilter;
