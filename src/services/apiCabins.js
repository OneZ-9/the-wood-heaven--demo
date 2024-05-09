import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

// *******************************************************************************************************
export async function createCabin(newCabin) {
  // We have not only upload the image but also specify the path to the image in the bucket with newCabin
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  // https://ycntrqogldapvdatsdvs.supabase.co/storage/v1/object/public/cabin-images/cabin-003.jpg
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1) Create cabin

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }]) // it is important to have shape of the supabase table in newCabin obj (same names etc)
    // .insert([{ some_column: "someValue", other_column: "otherValue" }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  // 2) Upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3) Delete the cabin IF there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);

    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and cabin was not created"
    );
  }
}

// *******************************************************************************************************
export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  // .eq("some_column", "someValue");

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
}
