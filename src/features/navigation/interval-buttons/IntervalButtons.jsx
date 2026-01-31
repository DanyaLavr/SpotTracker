"use client";

import { Button } from "@/shared/ui";
import { useSearchParams, useRouter } from "next/navigation";

const buttons = [
  { interval: "15", content: "15 minutes" },
  { interval: "60", content: "1 hour" },
  { interval: "240", content: "4 hours" },
  { interval: "D", content: "1 day" },
  { interval: "W", content: "1 week" },
];
const IntervalButtons = ({ appInterval }) => {
  const searchParams = useSearchParams();
  // const appInterval = searchParams.get("inteval");
  const router = useRouter();
  console.log("appInterval :>> ", appInterval);
  return (
    <ul
      className="flex gap-4"
      onClick={(e) => {
        const btn = e.target.closest("button");
        if (!btn) return;

        const interval = btn.dataset.interval;
        const params = new URLSearchParams(searchParams.toString());

        params.set("interval", interval);
        router.replace(`?${params.toString()}`, { scroll: false });
      }}
    >
      {buttons.map(({ interval, content }, idx) => (
        <li key={idx}>
          <Button
            color="dark"
            background={interval == appInterval}
            className={`h-full border-2 rounded-2xl ${interval == appInterval ? "text-stone-900" : "text-stone-50"} lg:py-3 lg:px-9`}
            data-interval={interval}
          >
            {content}
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default IntervalButtons;
