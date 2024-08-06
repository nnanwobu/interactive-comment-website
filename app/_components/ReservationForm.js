"use client";
import { differenceInDays } from "date-fns";
import { useFormStatus } from "react-dom";
import { useRange } from "../context/range";
import { createBooking } from "../serverActions/actions";
import SpinnerMini from "./SpinnerMini";
import { getInvoice } from "../_lib/helper";
import Image from "next/image";

function ReservationForm({ cabin, user }) {
  const { id: cabinId, maxCapacity, regularPrice, discount } = cabin;
  const { range, setRange, resetRange } = useRange();
  const { guestId } = user;
  const numNights = differenceInDays(range.to, range.from);
  const cabinPrice = Number(numNights * (regularPrice - discount));

  const newFormData = {
    startDate: range.from,
    endDate: range.to,
    guestId,
    cabinId,
    numNights,
    cabinPrice,
  };

  const createFormData = createBooking.bind(null, newFormData);

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p className="flex gap-8 items-center ">
          <span> Logged in as</span>
          <span className="flex gap-4 items-center justify-center">
            {user.image && (
              <img
                src={user.image}
                alt="user.name"
                className="rounded-full h-4 "
                referrerPolicy="no-referrer"
              />
            )}
            <span>{user.name.split(" ")[0]}</span>
          </span>
        </p>

        {/* <div className='flex gap-4 items-center'>
          <img
            // Important to display google profile images
            referrerPolicy='no-referrer'
            className='h-8 rounded-full'
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div> */}
      </div>

      <form
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
        action={(formData) => {
          createFormData(formData);
          resetRange();
        }}
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <p className="text-primary-300 text-base">Start by selecting dates</p>

          <Button />
        </div>
      </form>
    </div>
  );
}

function Button() {
  const { pending } = useFormStatus();
  return (
    <button className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
      {pending ? <SpinnerMini /> : "Reserve now"}
    </button>
  );
}
export default ReservationForm;
