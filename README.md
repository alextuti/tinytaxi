# tinytaxi dashboard

## Introduction

This is a simple dashboard for a taxi company's trips overview. It can be used to get a view of the trips based on
different filters such as: trip duration, total amount and an order by trip duration/total amount. The filter state
is persisted in the URL, so you can share the URL with filters applied.

The app is built with Next.js, uses TailwindCSS for styling, Shadcn for some UI components and Vitest for testing.

### [Live demo](https://tinytaxi.vercel.app/)

## Quick start

Install and use Node >= 18.17.0

If you use nvm, you can install and use the correct version with:

```bash
nvm use
```

Install deps

```bash
npm install
```

Run the dev server

```bash
npm run dev
```

## Run tests

I have added these 2 tests to showcase my testing approach for both UI and logic.

- UI test: `components/trip-card.test.tsx`
- Logic test: `lib/trip.test.ts`

To run all tests, use this command

```bash
npm run test
```

## Thoughts on this project

Visualizing the data is the key of this project, so I went with a simple approach of listing the trips inside cards.
I imagined a taxi company wanting to make sense of their data, such as what's the amount of money they are making on
trips less than 10 km or what's the value of the tips for trips that cost less than 10€.

### Stack

I made the decision to use Next.js because in my opionion it is the right tool for this problem and the dev
experience allows for fast development, which allowed me to wrap this up in a few hours. I would have been happy to
use any other framework such as React Router or Remix and maybe have a fully client-side SPA, but since I'm more familiar with Next.js I decided to go with it.

### Data fetching

Currently, data is fetched on the server, the html is computed on the server and passed to the client everytime filters change.

Another way to approach the data fetching could have been with client-side data fetching, using something like Tanstack Query to also manage loading states for when the data is fetching. In a larger project, I would have probably
gone with that approach and would have more tightly parse the data with something like Zod.

### UI

I like using Radix primitives (in this case shadcn's components built on top of it) for UI components, especially in the case of this project where I wanted to keep the UI simple and accessible by default. Things like the control inputs you have in a data visualization dashboard are a perfect use case for this in my opnion.

### Testing

Since this is a data-heavy application, I think it's important that the data is correctly displayed in the UI. For this, I have added UI tests to ensure the formatted data is displayed correctly and the logic for formatting works as expected in isolation.

### Conclusion

In a larger scope I would have added more tests, error handling and as I mentioned earlier I would have implemented a client-side data fetching approach.

All in all, I think this was a fun project to work on that showcases my skills and I'm happy with how it turned out.
