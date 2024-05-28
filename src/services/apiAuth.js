import supabase from "./supabase";

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { fullName, avatar: "" } }, // optional, and can add some optional data into new user
  });

  if (error) throw new Error(error.message);

  //   console.log(data);
  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  //   console.log(data);
  return data;
}

// re-fetch user when reloading application
// check wether current user exists in supabase and isAuthenticated
export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession(); // check wether there is an active session and get session data from local storage

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser(); // even if there is session data exists in local storage(means there is an active session), but refetch user details everytime we reload the page is more secure than get the user from session data
  //   console.log(data);

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut(); // if there is an error, store that and trow that, doesnt return any data

  if (error) throw new Error(error.message);
}
