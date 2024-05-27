import supabase from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  //   console.log(data);
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession(); // get session data from local storage

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser(); // refetch user details everytime we reload the page is more secure than get the user from session data
  console.log(data);

  if (error) throw new Error(error.message);

  return data?.user;
}
