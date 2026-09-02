import { eachDayOfInterval } from "date-fns";
import { notFound } from "next/navigation";
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
    notFound();
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

export async function getBookedDatesByCabinId(cabinId) {
  let today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  today = today.toISOString();

  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("cabinId", cabinId)
    .or(`startDate.gte.${today},status.eq.checked-in`);

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  const bookedDates = data
    .map((booking) =>
      eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      }),
    )
    .flat();

  return bookedDates;
}

export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }

  return data;
}

export async function getCountries() {
  try {
    const res = await fetch(
      "https://cdn.jsdelivr.net/npm/world-countries@5.0.0/countries.json",
      { next: { revalidate: 86400 } },
    );

    if (!res.ok) throw new Error("Countries request failed");

    const data = await res.json();

    if (!Array.isArray(data)) throw new Error("Invalid countries response");

    return data.map((country) => ({
      name: country.name.common,
      flag: `https://flagcdn.com/w320/${country.cca2.toLowerCase()}.png`,
    }));
  } catch (error) {
    console.error(error);
    throw new Error("Could not fetch countries");
  }
}
