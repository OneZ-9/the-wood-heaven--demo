import supabase, { supabaseUrl } from "./supabase";

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

// Update User
export async function updateCurrentUser({ password, fullName, avatar }) {
  // 1. Update password OR fullName
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } }; // because fullName inside options object when we signup

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // 2. Upload the avatar img
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar); // upload(fileName, file)

  if (storageError) throw new Error(storageError.message);

  // 3. Update avatar in the user
  const { data: updatedUserData, error: error2 } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (error2) throw new Error(error2.message);

  return updatedUserData;
}
