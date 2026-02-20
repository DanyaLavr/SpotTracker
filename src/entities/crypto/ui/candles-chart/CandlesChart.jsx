"use client";

import { createChart, CandlestickSeries } from "lightweight-charts";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export default function CandlesChart({ initialData, coinId }) {
  const ref = useRef(null);
  const searchParams = useSearchParams();
  const interval = searchParams.get("interval");
  const chartRef = useRef(null);
  const seriesRef = useRef(null);

  useEffect(() => {
    const chart = createChart(ref.current, {
      layout: {
        background: { color: "oklch(21.6% 0.006 56.043)" },
        textColor: "#e5e7eb",
      },
      width: ref.current.clientWidth,
      height: ref.current.clientHeight,
    });

    const handleResize = () => {
      chart.applyOptions({
        width: ref.current.clientWidth,
        height: ref.current.clientHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    const series = chart.addSeries(CandlestickSeries);
    series.setData(initialData);
    chartRef.current = chart;
    seriesRef.current = series;
    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, []);

  useEffect(() => {
    if (!seriesRef.current) return;
    const fetchData = async () => {
      try {
        const res = await fetch(
          `/api/chart?coin=${coinId}&interval=${interval ?? 15}`,
        );
        console.log("fetchData res :>> ", res);
        if (!res.ok) return;
        const newData = await res.json();
        if (!Array.isArray(newData) || newData.length === 0) return;
        console.log("newData :>> ", newData);
        const lastCandle = newData[newData.length - 1];
        console.log("lastCandle :>> ", lastCandle);
        if (!lastCandle || lastCandle.time == null) return;

        const lastTime =
          typeof lastCandle.time === "object"
            ? Math.floor(new Date(lastCandle.time).getTime() / 1000)
            : lastCandle.time;

        try {
          seriesRef.current.update({ ...lastCandle, time: lastTime });
        } catch {}
      } catch (e) {
        console.error("Failed to fetch chart data:", e);
      }
    };
    fetchData();
    const id = setInterval(fetchData, 6000);

    return () => clearInterval(id);
  }, [coinId, interval]);

  useEffect(() => {
    if (!seriesRef.current || !chartRef.current) return;

    const loadIntervalData = async () => {
      try {
        const res = await fetch(
          `/api/chart?coin=${coinId}&interval=${interval ?? 15}`,
        );
        console.log("loadIntervalData res:>> ", res);
        if (!res.ok) return;

        const newData = await res.json();
        console.log("loadIntervalData newData:>> ", newData);

        if (!Array.isArray(newData) || newData.length === 0) return;

        seriesRef.current.setData(newData);
        chartRef.current.timeScale().fitContent();
      } catch (e) {
        console.error("Failed to load interval data:", e);
      }
    };

    loadIntervalData();
  }, [interval, coinId]);
  return <div ref={ref} style={{ width: "100%", height: "100%" }} />;
}
