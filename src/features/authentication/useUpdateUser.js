import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  // mutation logic - Edit Cabin
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,

    onSuccess: ({ user }) => {
      toast.success("User account successfully updated");
      //   queryClient.setQueryData(["user"], user); // Manually set cache data (if updated data do not loading instantly)

      queryClient.invalidateQueries({ queryKey: ["user"] });
    },

    onError: (err) => toast.error(err.message),
  });
  return { updateUser, isUpdating };
}
