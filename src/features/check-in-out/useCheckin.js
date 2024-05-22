import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, { status: "checked-in", isPaid: true }),

    // onSuccess function accepts data that returns from mutationFn
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);

      queryClient.invalidateQueries({ active: true }); // alternative to passing queryKey, this will invalidate all the queries that are currently active on the page

      navigate("/");
    },

    onError: () => {
      toast.error("There was an error while checking in");
    },
  });

  return { checkin, isCheckingIn };
}
