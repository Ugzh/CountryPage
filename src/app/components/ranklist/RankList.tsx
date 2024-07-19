"use client";

import React from "react";
import Input from "@/app/components/input/Input";
import SideFilter from "@/app/components/filter/SideFilter";
import Board from "@/app/components/board/Board";
import { fetcher } from "@/app/components/board/Board";
import useSWR from "swr";

function RankList() {
  const [endpoint, setEndpoint] = React.useState<string | null>(
    "https://restcountries.com/v3.1/all",
  );
  const { data } = useSWR(endpoint, fetcher);
  const [searchTerm, setSearchTerm]: string | any = React.useState("");
  console.log(searchTerm);
  return (
    <div className="bg-[#1B1D1F] border border-[#282B30] rounded-xl h-3/5 w-3/4 flex flex-col -m-24 z-10">
      <div className="flex justify-between text-[#6C727F] w-full h-20 items-center px-6 py-14">
        {typeof data !== undefined && (
          <h2 className="font-medium">
            Found {""}
            {data?.length} countries
          </h2>
        )}
        <Input setSearchTerm={setSearchTerm}>{searchTerm}</Input>
      </div>
      <div className="flex items-start overflow-y-scroll">
        <SideFilter></SideFilter>
        <Board searchTerm={searchTerm} setEndpoint={setEndpoint}></Board>
      </div>
    </div>
  );
}

export default RankList;
