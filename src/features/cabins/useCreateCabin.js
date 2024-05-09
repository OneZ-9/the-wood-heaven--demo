import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  // mutation logic - Create Cabin
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: (data) => createEditCabin(data), // same as createCabin,

    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },

    onError: (err) => toast.error(err.message),
  });
  return { createCabin, isCreating };
}
