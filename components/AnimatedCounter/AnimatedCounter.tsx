"use client";

import React from "react";
import CountUp from "react-countup";
import { AnimatedCounterProps } from "./AnimatedCounter.types";

const AnimatedCounter = ({ amount }: AnimatedCounterProps) => {
  return (
    <div className="w-full">
      <CountUp decimal="." decimals={2} prefix="$" end={amount} />
    </div>
  );
};

export default AnimatedCounter;
