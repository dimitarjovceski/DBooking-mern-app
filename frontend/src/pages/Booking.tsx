import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import BookingForm from "../forms/BookingForm/BookingForm";
import { useSearchContext } from "../context/SearchContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingInfoSummary from "../components/BookingInfoSummary";
import { Elements } from "@stripe/react-stripe-js";
import { useAppContext } from "../context/AppContext";

const Booking = () => {
  const search = useSearchContext();
  const { stripePromise } = useAppContext();
  const { hotelId } = useParams();
  const [numOfNights, setNumOfNights] = useState<number>(0);

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (1000 * 60 * 60 * 24);

      setNumOfNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);

  const { data: paymentIntentData } = useQuery(
    "createPaymentIntent",
    () =>
      apiClient.createPaymentIntent(hotelId as string, numOfNights.toString()),
    {
      enabled: !!hotelId && numOfNights > 0,
    }
  );

  const { data: hotel } = useQuery(
    "getHotelById",
    () => apiClient.getHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    }
  );
  const { data: currentUser } = useQuery(
    "getCurrentUser",
    apiClient.getCurrentUser
  );

  if (!hotel) {
    return <></>;
  }

  return (
    <div className="grid md:grid-cols-[1fr_2fr] gap-2">
      <div className="bt-green-200">
        <BookingInfoSummary
          checkIn={search.checkIn}
          checkOut={search.checkOut}
          adultCount={search.adultCount}
          childCount={search.childCount}
          numsOfNights={numOfNights}
          hotel={hotel}
        />
      </div>
      {currentUser && paymentIntentData && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: paymentIntentData.clientSecret,
          }}
        >
          <BookingForm
            currentUser={currentUser}
            paymentIntent={paymentIntentData}
          />
        </Elements>
      )}
    </div>
  );
};

export default Booking;
