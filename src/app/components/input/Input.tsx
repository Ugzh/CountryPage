"use client";

import React from "react";
import SearchLoop from "@/app/assets/img/Search.svg";
import Image from "next/image";

function Input({ searchTerm, setSearchTerm }: string | any) {
  const [searchHistory, setSearchHistory] = React.useState<string>("");

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      setSearchTerm(event.target.value);
      setSearchHistory(event.target.value);

      if (event.target.value.length === 0) {
        console.log("c 0");
      }
    }
  };
  return (
    <div className="w-1/4 relative">
      <input
        type="text"
        className="h-[50px] bg-[#282B30] pl-12 rounded-xl text-[#D2D5DA] text-xs font-medium w-full"
        placeholder="Search by Name, Region, Subregion"
        value={searchTerm}
        onKeyDown={handleKeyPress}
      />
      <Image
        src={SearchLoop}
        alt="Search Icon"
        className="absolute top-3 left-4"
      ></Image>
    </div>
  );
}

export default Input;
