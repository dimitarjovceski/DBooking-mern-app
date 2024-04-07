import React from "react";
import { hotelTypes } from "../config/types-hotel-config";

export type Props = {
  selectedTypes: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const HotelTypesFilter = ({ selectedTypes, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5 text-white">
      <h4 className="text-lg font-semibold mb-2">Hotel Types</h4>
      {hotelTypes.map((type) => (
        <label key={type} className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="rounded"
            value={type}
            checked={selectedTypes.includes(type)}
            onChange={onChange}
          />
          <span>{type}</span>
        </label>
      ))}
    </div>
  );
};

export default HotelTypesFilter;
