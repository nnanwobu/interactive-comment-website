"use client";

export default function Error({ error, reset }) {
  return (
    <main className="flex justify-center items-center flex-col gap-6">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">{error.message}</p>

      <button
        className="inline-block bg-primary-moderate-blue text-primary-white px-6 py-3 text-lg hover:bg-primary-light-blue hover:text-primary-700 "
        onClick={reset}
      >
        Try again
      </button>
    </main>
  );
}
