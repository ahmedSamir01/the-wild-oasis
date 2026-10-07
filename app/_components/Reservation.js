import Link from "next/link";
import { auth } from "../_lib/auth";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";

async function Reservation({ cabin }) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);

  const session = await auth();

  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      {session ? (
        <ReservationForm cabin={cabin} user={session?.user} />
      ) : (
        <div>
          <div>Please login to make a reservation</div>
          <Link href="/api/auth/signin">Login</Link>
        </div>
      )}
    </div>
  );
}

export default Reservation;
