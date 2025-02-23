import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { HeaderBoxProps } from "./HeaderBox.types";

const HeaderBox = async ({
  type = "title",
  title,
  subtext,
}: HeaderBoxProps) => {
  const user = await currentUser();

  const firstName = user?.firstName ?? "Guest";

  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-24 lg:text-30 font-semibold text-gray-900">
        {title}{" "}
        {type === "greeting" && (
          <span className="bg-gradient-to-r from-indigo-400 to-rose-400 text-transparent bg-clip-text">
            {firstName}
          </span>
        )}
      </h1>
      <p className="text-14 lg:text-16 font-normal">{subtext}</p>
    </div>
  );
};

export default HeaderBox;
