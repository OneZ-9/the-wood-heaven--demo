import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createCabin(newCabin) {
  const { data, error } = await supabase
    .from("cabins")
    .insert([newCabin]) // it is important to have shape of the supabase table in newCabin obj (same names etc)
    // .insert([{ some_column: "someValue", other_column: "otherValue" }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  // .eq("some_column", "someValue");

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
}
