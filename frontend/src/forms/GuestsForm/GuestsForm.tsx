import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useSearchContext } from "../../context/SearchContext";
import { useAppContext } from "../../context/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  hotelId: string;
  pricePerNight: number;
};

type GuestsFormData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};

const GuestsForm = ({ hotelId, pricePerNight }: Props) => {
  const search = useSearchContext();
  const { isLoggedIn } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<GuestsFormData>({
    defaultValues: {
      childCount: search.childCount,
      adultCount: search.adultCount,
      checkIn: search.checkIn,
      checkOut: search.checkOut,
    },
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const onSignIn = (data: GuestsFormData) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.childCount,
      data.adultCount
    );

    navigate("/sign-in", { state: { from: location } });
  };

  const onSubmit = (data: GuestsFormData) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.childCount,
      data.adultCount
    );

    navigate(`/hotel/${hotelId}/booking`);
  };

  return (
    <div className="flex flex-col bg-slate-700 p-5 gap-4 rounded-md">
      <h3 className="text-white text-lg">${pricePerNight}</h3>
      <form
        onSubmit={isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignIn)}
      >
        <div className="grid grid-cols-1 items-center gap-3">
          <div>
            <DatePicker
              selected={checkIn}
              onChange={(date) => setValue("checkIn", date as Date)}
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
          <div>
            <DatePicker
              selected={checkOut}
              onChange={(date) => setValue("checkOut", date as Date)}
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

          <div className="flex bg-white px-2 py-1 gap-2">
            <label className="flex flex-col sm:flex-row items-center flex-1 gap-2">
              Adults:
              <input
                type="number"
                min={1}
                max={20}
                className="w-full p-1 focus:outline-none font-bold"
                {...register("adultCount", {
                  required: "This field is required",
                  min: {
                    value: 1,
                    message: "There must be at least one adult",
                  },
                  valueAsNumber: true,
                })}
              />
            </label>

            <label className="flex flex-col sm:flex-row items-center flex-1 gap-2">
              Children:
              <input
                type="number"
                min={0}
                max={20}
                className="w-full p-1 focus:outline-none font-bold"
                {...register("childCount", {
                  valueAsNumber: true,
                })}
              />
            </label>
            {errors.adultCount && (
              <span className="text-red-500 font-semibold text-sm">
                {errors.adultCount.message}
              </span>
            )}
          </div>
          {isLoggedIn ? (
            <button className="bg-blue-500 p-2 rounded-md text-white hover:bg-blue-300 sm:text-xl">
              Book Now
            </button>
          ) : (
            <button className="bg-blue-500 p-2 rounded-md text-white hover:bg-blue-300 sm:text-xl">
              Sign in to Book
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default GuestsForm;
