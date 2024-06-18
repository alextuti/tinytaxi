import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatTripDuration } from "@/lib/trip";
import { Clock, Route, Users } from "lucide-react";

type TripCardProps = Pick<
  Trip,
  | "fare_amount"
  | "tip_amount"
  | "mta_tax"
  | "tolls_amount"
  | "improvement_surcharge"
  | "tpep_pickup_datetime"
  | "tpep_dropoff_datetime"
  | "passenger_count"
  | "trip_distance"
  | "total_amount"
>;

export const TripCard = (trip: TripCardProps) => {
  const tripLineItems = [
    { label: "Fare", value: Number(trip.fare_amount) },
    { label: "Tip", value: trip.tip_amount },
    { label: "MTA tax", value: trip.mta_tax },
    { label: "Tolls", value: trip.tolls_amount },
    { label: "Improvement surcharge", value: trip.improvement_surcharge },
  ];

  return (
    <Card data-testid="trip-card">
      <CardHeader>
        <div className="flex gap-x-2 items-center justify-between">
          <p className="flex gap-x-2 items-center" aria-label="Trip duration">
            <Clock className="size-4" />
            <span data-testid="trip-duration">
              {formatTripDuration(
                trip.tpep_pickup_datetime,
                trip.tpep_dropoff_datetime
              )}
            </span>
          </p>
          <p className="flex gap-x-2 items-center" aria-label="Passenger count">
            <Users className="size-4" />{" "}
            <span data-testid="passenger-count">{trip.passenger_count}</span>
          </p>
          <p className="flex gap-x-2 items-center" aria-label="Trip distance">
            <Route className="size-4" /> <span>{trip.trip_distance} km</span>
          </p>
        </div>
      </CardHeader>
      <CardContent className="text-sm">
        <ul className="w-full">
          {tripLineItems.map((item) => (
            <TripCostLineItem key={item.label} {...item} />
          ))}
        </ul>
        <hr className="my-2" />
        <p className="font-semibold justify-between items-center w-full flex">
          <span>Total</span>
          <span data-testid="total-amount">{trip.total_amount} €</span>
        </p>
      </CardContent>
    </Card>
  );
};

const TripCostLineItem = ({
  label,
  value,
}: {
  label: string;
  value: number;
}) => {
  return (
    <li className="flex justify-between items-center w-full">
      <span>{label}</span>
      <span>{value} €</span>
    </li>
  );
};
