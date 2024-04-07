import { useParams } from "react-router-dom";
import ManageHotelForm from "../forms/ManageHotelForms/ManageHotelForm";
import { useMutation, useQuery } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../context/AppContext";

const EditHotel = () => {
  const { hotelId } = useParams();
  const { showToast } = useAppContext();
  const { data: hotel } = useQuery(
    "getHotelById",
    () => apiClient.getHotelById(hotelId || ""),
    {
      enabled: !!hotelId,
    }
  );

  const { mutate, isLoading } = useMutation(apiClient.updateHotelById, {
    onSuccess: () => {
      showToast({ message: "Hotel Saved!", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Hotel not Saved!", type: "ERROR" });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };
  return (
    <ManageHotelForm onSave={handleSave} hotel={hotel} isLoading={isLoading} />
  );
};

export default EditHotel;
