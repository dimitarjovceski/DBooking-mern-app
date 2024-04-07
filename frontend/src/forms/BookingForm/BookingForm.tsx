import { useForm } from "react-hook-form";
import {
  PaymentIntentResponse,
  UserType,
} from "../../../../backend/src/shared/types";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useSearchContext } from "../../context/SearchContext";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import * as apiClient from "../../api-client";
import { useAppContext } from "../../context/AppContext";

type Props = {
  currentUser: UserType;
  paymentIntent: PaymentIntentResponse;
};

export type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  childCount: number;
  adultCount: number;
  checkIn: string;
  checkOut: string;
  hotelId: string;
  totalCost: number;
  paymentIntentId: string;
};

const BookingForm = ({ currentUser, paymentIntent }: Props) => {
  const search = useSearchContext();
  const { hotelId } = useParams();
  const { showToast } = useAppContext();

  const { mutate: bookRoom, isLoading} = useMutation(apiClient.createBookRoom, {
    onSuccess: () => {
      showToast({ message: "Booking Saved!", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Booking Failed!", type: "ERROR" });
    },
  });

  const { register, handleSubmit } = useForm<BookingFormData>({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      childCount: search.childCount,
      adultCount: search.adultCount,
      checkIn: search.checkIn.toISOString(),
      checkOut: search.checkOut.toISOString(),
      hotelId: hotelId,
      totalCost: paymentIntent.totalCost,
      paymentIntentId: paymentIntent.paymentIntentId,
    },
  });

  const stripe = useStripe();
  const elements = useElements();

  const onSubmit = async (formData: BookingFormData) => {
    const result = await stripe?.confirmCardPayment(
      paymentIntent.clientSecret,
      {
        payment_method: {
          card: elements?.getElement(CardElement) as StripeCardElement,
        },
      }
    );

    if (result?.paymentIntent?.status === "succeeded") {
      bookRoom({ ...formData, paymentIntentId: result.paymentIntent.id });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-5 rounded-lg border border-e-slate-300 p-4">
      <span className="sm:text-3xl font-bold">Confirm Your Details</span>
      <div className="grid grid-cols-2 gap-6">
        <label className="text-grey-700 text-sm font-bold flex-1">
          First Name
          <input
            type="text"
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200"
            disabled
            readOnly
            {...register("firstName")}
          />
        </label>
        <label className="text-grey-700 text-sm font-bold flex-1">
          Last Name
          <input
            type="text"
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200"
            disabled
            readOnly
            {...register("lastName")}
          />
        </label>
        <label className="text-grey-700 text-sm font-bold flex-1">
          Email
          <input
            type="text"
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200"
            disabled
            readOnly
            {...register("email")}
          />
        </label>
      </div>
      <div className="space-y-2">
        <h2>Your Price Summary</h2>

        <div className="bg-blue-200 p-4 rounded-md">
          <div className="font-semibold text-lg">
            Total Cost: ${paymentIntent.totalCost.toFixed(2)}
          </div>
          <div className="text-xs">Includes taxes or charges</div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="sm:text-xl font-semibold">Payment Details</h3>
        <CardElement
          id="payment-element"
          className="border rounded-md p-2 text-sm"
        />
      </div>

      <div className="flex justify-center sm:justify-end">
        <button disabled={isLoading} className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-300 text-md w-full">
          {isLoading ? "Saving..." : "Confirm Booking"}
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
