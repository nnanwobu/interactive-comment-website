"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function Filter({ capacity }) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  function handleclick(filter) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("maxCapacity", filter);

    router.push(pathName + "?" + params, { scroll: false });
  }

  return (
    <div className="border-primary-800 flex justify-end mb-8 space-x-4">
      <Button handleclick={handleclick} filter="all" capacity={capacity}>
        all
      </Button>
      <Button handleclick={handleclick} filter="small" capacity={capacity}>
        1 &mdash; 2 cabins
      </Button>
      <Button handleclick={handleclick} filter="medium" capacity={capacity}>
        3 &mdash; 4 cabins
      </Button>
      <Button handleclick={handleclick} filter="big" capacity={capacity}>
        5 &mdash; 6 cabins
      </Button>
      <Button filter="large" handleclick={handleclick} capacity={capacity}>
        7 or more cabins
      </Button>
    </div>
  );
}

function Button({ children, filter, handleclick, capacity }) {
  return (
    <button
      className={`p-2 ${capacity === filter ? "bg-primary-600" : ""}`}
      onClick={() => handleclick(filter)}
    >
      {children}
    </button>
  );
}
