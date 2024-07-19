"use client";

import useSWR from "swr";
import React from "react";
import Image from "next/image";

export const fetcher = async (url: string) => {
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

function Board({ searchTerm }: any) {
  const [endpoint, setEndpoint] = React.useState<string | null>(
    "https://restcountries.com/v3.1/region/europe?fields=flags,name,population,area,regions",
  );

  React.useEffect(() => {
    if (searchTerm) {
      const endpoints = [
        `https://restcountries.com/v3.1/region/${searchTerm}`,
        `https://restcountries.com/v3.1/name/${searchTerm}`,
        `https://restcountries.com/v3.1/subregion/${searchTerm}`,
      ];

      const fetchData = async () => {
        for (const url of endpoints) {
          try {
            await fetcher(url);
            setEndpoint(url);
            return;
          } catch (error) {
            console.error(`Failed to fetch from ${url}`, error);
          }
        }
        setEndpoint(null);
      };

      fetchData();
    }
  }, [searchTerm]);

  const { data } = useSWR(endpoint, fetcher);

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
          data.map(({ flags, name, population, area, region }: any) => (
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
