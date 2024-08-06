import { getCabins } from "../_lib/data-service";
import CabinCard from "./CabinCard";

async function CabinList({ capacity }) {
  const cabins = await getCabins();

  let displayCabins;

  if (capacity === "all") displayCabins = cabins;

  if (capacity === "small")
    displayCabins = cabins.filter((cabin) => cabin.maxCapacity <= 2);
  console.log(displayCabins);
  if (capacity === "medium")
    displayCabins = cabins.filter(
      (cabin) => cabin.maxCapacity > 2 && cabin.maxCapacity <= 4
    );
  if (capacity === "big")
    displayCabins = cabins.filter(
      (cabin) => cabin.maxCapacity > 4 && cabin.maxCapacity <= 6
    );
  if (capacity === "large")
    displayCabins = cabins.filter((cabin) => cabin.maxCapacity > 6);

  if (!cabins.length) return null;

  return (
    <div>
      {cabins.length > 0 && (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
          {displayCabins?.map((cabin) => (
            <CabinCard cabin={cabin} key={cabin.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CabinList;
