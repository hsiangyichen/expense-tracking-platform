import React from "react";
import { HeaderBoxProps } from "./HeaderBox.types";

const HeaderBox = ({
  type = "title",
  title,
  subtext,
  user,
}: HeaderBoxProps) => {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-24 lg:text-30 font-semibold text-gray-900">
        {title}{" "}
        {type === "greeting" && <span className="text-[#a1add3]">{user}</span>}
      </h1>
      <p className="text-14 lg:text-16 font-normal">{subtext}</p>
    </div>
  );
};

export default HeaderBox;
