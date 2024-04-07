import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const GuestSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className="sm:text-2xl font-bold mb-3">Guests</h2>
      <div className="grid grid-cols-2 gap-2 ">
        <label className="text-grey-700 text-sm font-semibold">
          Adults
          <input
            type="number"
            min={1}
            className="border rounded w-full px-3 py-2 font-normal"
            {...register("adultCount", {
              required: "This field is required",
            })}
          />
          {errors.adultCount?.message && (
            <span className="text-red-500">{errors.adultCount.message}</span>
          )}
        </label>

        <label className="text-grey-700 text-sm font-semibold">
          Children
          <input
            type="number"
            min={0}
            className="border rounded w-full px-3 py-2 font-normal"
            {...register("childCount", {
              required: "This field is required",
            })}
          />
          {errors.childCount?.message && (
            <span className="text-red-500">{errors.childCount.message}</span>
          )}
        </label>
      </div>
    </div>
  );
};

export default GuestSection;
