"use client";

import { TrashIcon } from "@heroicons/react/24/solid";
import { deleteReservation } from "../serverActions/actions";
import { useTransition } from "react";
import SpinnerMini from "./SpinnerMini";

function DeleteReservation({ bookingId, onDelete }) {
  const [isPending, startTransition] = useTransition();

  function handledelete() {
    startTransition(() => {
      if (confirm("are you sure to delete?")) {
        onDelete(bookingId);
      }
    });
  }
  return (
    <button className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900">
      <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
      <span className="mt-1" onClick={handledelete}>
        {isPending ? (
          <div className="flex gap-2 text-sm items-center justify-center">
            <SpinnerMini />
          </div>
        ) : (
          "Delete"
        )}
      </span>
    </button>
  );
}

export default DeleteReservation;
