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

  // SORT
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isLoading,
    data: { data: bookings, count } = {},
    // data,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page], // act like dependancy array of useQuery
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // Ensure data is defined before destructuring
  // const bookings = data?.data || [];
  // const count = data?.count || 0;

  return { isLoading, bookings, count, error };
}
