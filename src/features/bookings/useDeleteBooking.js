import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

export function useDeleteBooking() {
  // to invalidate query after mutation (auto refresh the state after mutation onSuccess)
  // have to call invalidateQueries from queryClient
  const queryClient = useQueryClient();

  const { isLoading: isDeletingBooking, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });

      toast.success("Booking successfully deleted");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isDeletingBooking, deleteBooking };
}
