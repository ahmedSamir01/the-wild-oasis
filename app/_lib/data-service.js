import { supabase } from "./supabase";

function getImageUrl(image) {
  if (!image) return null;

  // DB may store a full URL or just a filename
  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  return `${process.env.SUPABASE_URL}/storage/v1/object/public/cabin-images/${image}`;
}

export async function getCabin(id) {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .eq("id", id)
    .single();

  // For testing
  // await new Promise((res) => setTimeout(res, 1000));

  if (error) {
    console.error(error);
  }

  if (!data) return null;

  return { ...data, image: getImageUrl(data.image) };
}

export async function getCabins() {
  const { data, error } = await supabase
    .from("cabins")
    .select("id, name, maxCapacity, regularPrice, discount, image")
    .order("name");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data.map((cabin) => ({
    ...cabin,
    image: getImageUrl(cabin.image),
  }));
}
