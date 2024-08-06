"use client";

export default function Profile({ username }) {
  return (
    <div className=" flex-grow w-[100%] h-12 bg-primary-100 items-center justify-center text-primary-800 px-4 my-2">
      {username}
    </div>
  );
}
