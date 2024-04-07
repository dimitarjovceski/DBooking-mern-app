import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../config/types-hotel-config";
import { HotelFormData } from "./ManageHotelForm";
const FacilitySection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="sm:text-2xl font-bold mb-3">Facilities</h2>
      <div className="grid sm:grid-cols-5 gap-2">
        {hotelFacilities.map((facility) => (
          <label className="text-sm flex gap-1 text-gray-700">
            <input
              type="checkbox"
              value={facility}
              {...register("facilities", {
                validate: (facilities) => {
                  if (facilities && facilities.length > 0) {
                    return true;
                  } else {
                    return "At least one facility is required";
                  }
                },
              })}
            />
            <span>{facility}</span>
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-red-500">{errors.facilities.message}</span>
      )}
    </div>
  );
};

export default FacilitySection;
