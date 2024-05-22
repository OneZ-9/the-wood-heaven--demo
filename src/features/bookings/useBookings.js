import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
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

  // QUERY
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

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  // pre-fetch next page
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }), // work same as object in useQuery, but fetch next page
    });

  // pre-fetch previous page
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }), // work same as object in useQuery, but fetch previous page
    });

  return { isLoading, bookings, count, error };
}
