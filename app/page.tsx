import { FilterSelect } from "@/components/filter-select";
import { TripCard } from "@/components/trip-card";
import { CarTaxiFront } from "lucide-react";

async function getTrips(searchParams: {
  order_by?: string;
  max_trip_distance?: number;
  max_total_amount?: string;
}) {
  const orderBy = searchParams.order_by ?? "trip_distance+DESC";
  const maxTripDistance = searchParams.max_trip_distance ?? "trip_distance+>0";
  const maxTotalAmount = searchParams.max_total_amount ?? "total_amount+>0";

  const url = new URL(
    `https://api.tinybird.co/v0/pipes/yellow_tripdata_2017_pipe.json?q=SELECT+*+FROM+_+WHERE+${maxTripDistance}+AND+${maxTotalAmount}+ORDER+BY+${orderBy}+LIMIT+20&from=ui`
  );

  try {
    const res = await fetch(url, {
      headers: {
        Authorization:
          "Bearer p.eyJ1IjogIjdmOTIwMmMzLWM1ZjctNDU4Ni1hZDUxLTdmYzUzNTRlMTk5YSIsICJpZCI6ICJmZTRkNWFiZS05ZWIyLTRjMjYtYWZiZi0yYTdlMWJlNDQzOWEifQ.P67MfoqTixyasaMGH5RIjCrGc0bUKvBoKMwYjfqQN8c",
      },
    });
    const data = await res.json();
    return data.data;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export default async function Home({
  searchParams,
}: {
  searchParams: {
    order_by?: string;
    max_trip_distance?: number;
    max_total_amount?: string;
  };
}) {
  const trips = await getTrips(searchParams);

  return (
    <div className="min-h-screen container">
      <div className="flex justify-between items-start p-6">
        <div className="flex gap-x-2 items-center">
          <CarTaxiFront className="size-[26px]" />
          <span className="font-semibold text-xl">tinytaxi</span>
        </div>
        <div className="flex gap-4 flex-wrap justify-end">
          <FilterSelect
            options={[
              { label: "< 10€", value: "total_amount+<10" },
              { label: "< 100€", value: "total_amount+<100" },
              { label: "< 1000€", value: "total_amount+<1000" },
              { label: "All", value: "total_amount+>0" },
            ]}
            filterKey="max_total_amount"
            label="Total amount"
            defaultValue="total_amount+>0"
            className="w-[240px]"
          />
          <FilterSelect
            options={[
              { label: "< 1 km", value: "trip_distance+<1" },
              { label: "< 5 km", value: "trip_distance+<5" },
              { label: "< 10 km", value: "trip_distance+<10" },
              { label: "All", value: "trip_distance+>0" },
            ]}
            filterKey="max_trip_distance"
            label="Distance"
            defaultValue="trip_distance+>0"
            className="w-[200px]"
          />
          <FilterSelect
            options={[
              { label: "Trip distance: desc", value: "trip_distance+DESC" },
              { label: "Trip distance: asc", value: "trip_distance+ASC" },
              { label: "Total amount: desc", value: "total_amount+DESC" },
              { label: "Total amount: asc", value: "total_amount+ASC" },
            ]}
            filterKey="order_by"
            label="Sort by"
            defaultValue="trip_distance+DESC"
            className="w-[280px]"
          />
        </div>
      </div>
      {trips.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 p-6">
          {trips.map((trip: Trip) => (
            <TripCard key={trip.tpep_pickup_datetime} {...trip} />
          ))}
        </div>
      ) : (
        <div className="text-center text-2xl p-6 w-full">No trips found</div>
      )}
    </div>
  );
}
