"use server";

import { auth, signIn, signOut } from "@/app/_lib/auth";
import { supabase } from "../_lib/supabase";
import { revalidatePath } from "next/cache";
import {
  deleteBooking,
  getBooking,
  getBookings,
  updateBooking,
} from "../_lib/data-service";
import { redirect } from "next/navigation";
import { getInvoice } from "../_lib/helper";
import { sendEmail } from "../_lib/email";
import { GET } from "../api/cabins/[cabinId]/route";

// import { getInvoice } from "../_lib/helper";

export async function createBooking(newFormData, formData) {
  const newData = {
    startDate: newFormData.startDate,
    endDate: newFormData.endDate,
    guestId: newFormData.guestId,
    cabinId: newFormData.cabinId,
    cabinPrice: newFormData.cabinPrice,
    numNights: newFormData.numNights,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations"),
    isPaid: false,
    hasBreakfast: false,
    extrasPrice: 0,
    status: "unconfirmed",
    totalPrice: newFormData.cabinPrice,
  };
  const session = await auth();

  const { data, error } = await supabase
    .from("bookings")
    .insert([newData])
    // So that the newly created object gets returned!
    .select()
    .single();

  if (error) {
    throw new Error("Booking could not be created");
  }
  const booking = await getBooking(data.id);
  const invoiceData = await getInvoice(booking, session.user);
  await sendEmail(session.user, invoiceData);
  revalidatePath(`/cabins/${newFormData.cabinId}`);
  redirect("/cabins/thankyou");
}

export async function updateGuest(formData) {
  const session = await auth();

  const id = session.user.guestId;
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("please provide a valid national ID");
  const updatedFields = { nationalID, nationality, countryFlag };

  const { data, error } = await supabase
    .from("guests")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single();

  revalidatePath("/account/profile");
  if (error) throw new Error("Guest could not be updated");
}

export async function updateReservation(formData) {
  const numGuests = formData.get("numGuests");
  const observations = formData.get("observations");
  const id = formData.get("id");
  const updateFields = { numGuests, observations };
  await updateBooking(Number(id), updateFields);
  revalidatePath("/account/reservations/edit");
  redirect("/account/reservations");
}
export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session.user)
    throw new Error("you must be logged in to perform this action");
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingId))
    throw new Error("you are not permitted to perform this action");
  await deleteBooking(bookingId);
  revalidatePath("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}
export async function signInActionGithub() {
  await signIn("github", { redirectTo: "/account" });
}
export async function signInActionLinkedin() {
  await signIn("linkedin", { redirectTo: "/account" });
}
export async function signInActionTwitter() {
  await signIn("twitter", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
