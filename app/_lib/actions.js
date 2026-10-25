"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateGuest(formData) {
  // auth check
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  // national ID validation
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updateData = { nationality, countryFlag, nationalID };

  // update guest
  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.id);

  // error handling
  if (error) throw new Error("Guest could not be updated");

  // revalidatePath("/account/profile");
}

export async function deleteBooking(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const guestBookings = await getBookings(session.user.id);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");

  // refresh the page
  revalidatePath("/account/reservations");
}

export async function updateBooking(bookingId, formData) {
  // AUTHENTICATION CHECK
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // AUTHORIZATION CHECK
  const guestBookings = await getBookings(session.user.id);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  const numericBookingId = Number(bookingId);

  if (!guestBookingIds.includes(numericBookingId))
    throw new Error("You are not allowed to update this booking");

  // FORM DATA
  const numGuests = formData.get("numGuests");
  const observations = formData.get("observations").slice(0, 1000) || "";

  // UPDATE BOOKING
  const { error } = await supabase
    .from("bookings")
    .update({ numGuests, observations })
    .eq("id", numericBookingId);

  // ERROR HANDLING
  if (error) throw new Error("Booking could not be updated");

  // NAVIGATE TO THE BOOKINGs PAGE
  revalidatePath(`/account/reservations/${numericBookingId}`);
  revalidatePath("/account/reservations");
  redirect(`/account/reservations`);
}
