import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { logout as logoutApi } from "../../services/apiAuth";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,

    onSuccess: () => {
      queryClient.removeQueries(); //  remove all the queries
      navigate("/login", { replace: true }); // erase previous page from history stack
    },
  });
  return { logout, isLoading };
}
