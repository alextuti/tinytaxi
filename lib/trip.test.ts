import { formatTripDuration } from "@/lib/trip";
import { describe, expect, test } from "vitest";

describe("formatTripDuration", () => {
  test("should format correct duration in minutes", () => {
    const pickupTime = "2017-01-01 00:00:09";
    const dropoffTime = "2017-01-01 00:34:21";
    expect(formatTripDuration(pickupTime, dropoffTime)).toBe("34 min");
  });

  test("should return 1 min when duration is less than 1 minute", () => {
    const pickupTime = "2017-01-01 00:00:12";
    const dropoffTime = "2017-01-01 00:01:01";
    expect(formatTripDuration(pickupTime, dropoffTime)).toBe("1 min");
  });
});
