import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  // mutation logic - Update Setting
  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    // mutationFn: (updatedSetting) => updateSettingApi(updatedSetting),
    mutationFn: updateSettingApi,

    onSuccess: () => {
      toast.success("Setting successfully updated");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },

    onError: (err) => toast.error(err.message),
  });
  return { updateSetting, isUpdating };
}
