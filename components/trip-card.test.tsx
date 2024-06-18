import { TripCard } from "@/components/trip-card";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, test } from "vitest";

const mockTrip = {
  vendorid: 2,
  tpep_pickup_datetime: "2017-01-01 00:00:09",
  tpep_dropoff_datetime: "2017-01-01 00:34:21",
  passenger_count: 1,
  trip_distance: 3.42,
  ratecodeid: 1,
  store_and_fwd_flag: "N",
  pulocationid: 230,
  dolocationid: 148,
  payment_type: 1,
  fare_amount: "22.5",
  extra: 0.5,
  mta_tax: 0.5,
  tip_amount: 0,
  tolls_amount: 0,
  improvement_surcharge: 0.3,
  total_amount: 23.8,
} satisfies Trip;

describe("TripCard", () => {
  render(<TripCard {...mockTrip} />);
  const tripCard = within(screen.getByTestId("trip-card"));

  test("should render correct trip duration", () => {
    const tripDuration = tripCard.getByTestId("trip-duration");
    expect(tripDuration).toBeDefined();
    expect(tripDuration.textContent).toBe("34 min");
  });

  test("should render correct passenger count", () => {
    const passengerCount = tripCard.getByTestId("passenger-count");
    expect(passengerCount).toBeDefined();
    expect(passengerCount.textContent).toBe("1");
  });

  test("should render correct total amount", () => {
    const totalAmount = tripCard.getByTestId("total-amount");
    expect(totalAmount).toBeDefined();
    expect(totalAmount.textContent).toBe("23.8 €");
  });
});
