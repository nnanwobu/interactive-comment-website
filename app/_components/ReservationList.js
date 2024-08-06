"use client";

import { deleteReservation } from "../serverActions/actions";
import ReservationCard from "./ReservationCard";
import { useOptimistic } from "react";

export default function ReservationList({ bookings, user }) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (currentBooking, bookingId) => {
      return currentBooking.filter((booking) => booking.id !== bookingId);
    }
  );
  async function handledelete(bookingId) {
    optimisticDelete(bookingId);
    await deleteReservation(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          onDelete={handledelete}
          user={user}
          key={booking.id}
        />
      ))}
    </ul>
  );
}
