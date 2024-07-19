import useSWR from "swr";
import React from "react";
import Image from "next/image";
const ENDPOINT =
  "https://restcountries.com/v3.1/region/europe?fields=flags,name,population,area,region";

export async function fetcher(endpoint: string) {
  const response = await fetch(endpoint);
  const json = await response.json();
  return json;
}

function Board() {
  const { data, error } = useSWR(ENDPOINT, fetcher);

  return (
    <table className="w-full">
      <thead>
        <tr className="text-left text-xs text-[#6C727F] border-[#282B30] border-b pb-6">
          <th className="pb-4">Flag</th>
          <th className="pb-4">Name</th>
          <th className="pb-4">Population</th>
          <th className="pb-4">Area (km²)</th>
          <th className="pb-4">Region</th>
        </tr>
      </thead>
      <tbody className="text-[#D2D5DA]">
        {typeof data !== "undefined" &&
          data.map(({ flags, name, population, area, region }) => (
            <tr key={Math.random()}>
              <td>
                <Image
                  src={flags?.svg}
                  width={50}
                  height={50}
                  alt={name?.common}
                  className="rounded-md my-3"
                />
              </td>

              <td>{name?.common}</td>
              <td>{population}</td>
              <td>{area}</td>
              <td>{region}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default Board;
