import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get("status");
  // console.log(filterValue);
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue, method: "eq" };

  //  If multiple conditions, pass array of objects
  // [{ field: "status", value: filterValue, method: "eq" }, { field: "totalPrice", value: 7000, method: "gte" }];

  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings", filter], // act like dependancy array of useQuery
    queryFn: () => getBookings({ filter }),
  });

  return { isLoading, bookings, error };
}
