import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export function useEditCabin() {
  const queryClient = useQueryClient();

  // mutation logic - Edit Cabin
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ data, id }) => createEditCabin(data, id), // mutationFn only accept one aregument, so we have to pass an object

    onSuccess: () => {
      toast.success("Cabin successfully edited");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },

    onError: (err) => toast.error(err.message),
  });
  return { editCabin, isEditing };
}
