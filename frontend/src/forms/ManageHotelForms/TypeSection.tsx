import { hotelTypes } from "../../config/types-hotel-config";
import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const TypeSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className="sm:text-2xl font-bold mb-3">Type</h2>
      <div className="grid sm:grid-cols-5 gap-2">
        {hotelTypes.map((type) => (
          <label className="bg-gray-300 rounded-lg cursor-pointer p-1">
            <input
              type="radio"
              className="mx-1 hidden"
              value={type}
              {...register("type", {
                required: "This field is required",
              })}
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className="text-red-500">{errors.type.message}</span>
      )}
    </div>
  );
};

export default TypeSection;
