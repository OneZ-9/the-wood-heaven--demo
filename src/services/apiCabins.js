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
export async function createEditCabin(newCabin, id) {
  // console.log(newCabin, id);
  // console.log(newCabin.image);

  // check when editing (if image was edited or not)
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  // We have not only upload the image but also specify the path to the image in the bucket with newCabin
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  // https://ycntrqogldapvdatsdvs.supabase.co/storage/v1/object/public/cabin-images/cabin-003.jpg
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1) Create/Edit cabin
  let query = supabase.from("cabins");

  // A) CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]); // it is important to have shape of the supabase table in newCabin obj (same names etc)

  // B) EDIT
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  // 2) Upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3) Delete the cabin IF there was an error uploading image
  if (storageError) {
    const { error: imageFailed_CabinDeleteError } = await supabase
      .from("cabins")
      .delete()
      .eq("id", data.at(0).id); // data array returned from supabase contains new id, not the newCabin object // console.log(data);

    console.error(imageFailed_CabinDeleteError);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and cabin was not created"
    );
  }
  return data;
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
