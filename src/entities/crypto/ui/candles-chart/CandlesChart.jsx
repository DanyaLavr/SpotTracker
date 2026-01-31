"use client";

import { createChart, CandlestickSeries } from "lightweight-charts";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function CandlesChart({ initialData, coinId }) {
  const [data, setData] = useState(initialData);
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
    series.setData(data);
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
      const res = await fetch(
        `/api/chart?coin=${coinId}&interval=${interval ?? 15}`,
      );
      const newData = await res.json();

      const lastCandle = newData[newData.length - 1];
      seriesRef.current.update(lastCandle);
    };

    fetchData();
    const id = setInterval(fetchData, 6000);

    return () => clearInterval(id);
  }, [coinId, interval]);

  useEffect(() => {
    if (!seriesRef.current || !chartRef.current) return;

    const loadIntervalData = async () => {
      const res = await fetch(
        `/api/chart?coin=${coinId}&interval=${interval ?? 15}`,
      );
      const newData = await res.json();

      seriesRef.current.setData(newData);
      chartRef.current.timeScale().fitContent();
    };

    loadIntervalData();
  }, [interval, coinId]);
  return <div ref={ref} style={{ width: "100%", height: "100%" }} />;
}
