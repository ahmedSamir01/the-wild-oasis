import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "../_lib/data-service";
import { unstable_noStore as noStore } from "next/cache";

async function CabinList({ filter }) {
  const cabins = await getCabins();

  let displayedCabins;

  if (!cabins.length) return null;

  if (filter === "all") {
    displayedCabins = cabins;
  } else if (filter === "large") {
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity >= 10);
  } else if (filter === "medium") {
    displayedCabins = cabins.filter(
      (cabin) => cabin.maxCapacity > 5 && cabin.maxCapacity < 10,
    );
  } else if (filter === "small") {
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity < 5);
  } else {
    displayedCabins = cabins;
  }

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayedCabins?.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;
