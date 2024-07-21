"use client";

import useSWR from "swr";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export const fetcher = async (url: string) => {
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

function Board({ searchTerm, setEndpoint, optionValue }: any) {
  // Permet de changer aux requêtes

  const [endpointBoard, setEndpointBoard] = React.useState<string | null>(
    "https://restcountries.com/v3.1/all",
  );
  const { data } = useSWR(endpointBoard, fetcher);

  // Permet de trier selon le plus peuplé
  const sortDataByPopulation = (data: any[]) => {
    return data?.sort((a, b) => b.population - a.population);
  };
  // Permet de trier selon le plus grand
  const sortDataByArea = (data: any[]) => {
    return data?.sort((a, b) => b.area - a.area);
  };

  const [sortBy, setSortBy] = React.useState<any | undefined>(
    sortDataByPopulation(data),
  );

  React.useEffect(() => {
    if (searchTerm) {
      const subRegionQuery = `${searchTerm}`.split(" ").join("%");

      const endpoints = [
        `https://restcountries.com/v3.1/subregion/${subRegionQuery}`,
        `https://restcountries.com/v3.1/region/${searchTerm}`,
        `https://restcountries.com/v3.1/name/${searchTerm}`,
      ];

      const fetchData = async () => {
        for (let i = 0; endpoints.length > i; i++) {
          try {
            const response = await fetch(endpoints[i]);
            const data = await response.json();
            if (data.status !== 404) {
              if (optionValue === "Area") {
                const sortedArea = sortDataByArea(data);
                return (
                  setSortBy(sortedArea),
                  setEndpointBoard(endpoints[i]),
                  setEndpoint(endpoints[i])
                );
              } else if (optionValue === "Population") {
                const sortedPopulation = sortDataByPopulation(data);
                return (
                  setSortBy(sortedPopulation),
                  setEndpointBoard(endpoints[i]),
                  setEndpoint(endpoints[i])
                );
              }
            }
          } catch (error) {
            console.error(`Failed to fetch from ${endpoints}`, error);
          }
        }
        setEndpointBoard("");
      };

      fetchData();
    } else if (searchTerm.length === 0) {
      setSortBy(undefined);
      setEndpoint("https://restcountries.com/v3.1/all");
      setEndpointBoard("https://restcountries.com/v3.1/all");
    }
  }, [searchTerm, setEndpoint, optionValue]);

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
        {sortBy === undefined
          ? data?.map(({ flags, name, population, area, region }: any) => (
              <tr key={Math.random()}>
                <td>
                  <Link href={`/countries/${name?.common}`}>
                    <Image
                      src={flags?.svg}
                      width={0}
                      height={0}
                      alt={name?.common}
                      className="rounded-md my-3 h-[50px] w-[50px] object-contain"
                    />
                  </Link>
                </td>
                <td>
                  <Link href={`/countries/${name?.common}`}>
                    {name?.common}
                  </Link>
                </td>
                <td>
                  <Link href={`/countries/${name?.common}`}>{population}</Link>
                </td>
                <td>
                  <Link href={`/countries/${name?.common}`}>{area}</Link>
                </td>
                <td>
                  <Link href={`/countries/${name?.common}`}>{region}</Link>
                </td>
              </tr>
            ))
          : sortBy?.map(({ flags, name, population, area, region }: any) => (
              <tr key={Math.random()}>
                <td>
                  <Link href={`/countries/${name?.common}`}>
                    <Image
                      src={flags?.svg}
                      width={0}
                      height={0}
                      alt={name?.common}
                      className="rounded-md my-3 h-[50px] w-[50px] object-contain"
                    />
                  </Link>
                </td>
                <td>
                  <Link href={`/countries/${name?.common}`}>
                    {name?.common}
                  </Link>
                </td>
                <td>
                  <Link href={`/countries/${name?.common}`}>{population}</Link>
                </td>
                <td>
                  <Link href={`/countries/${name?.common}`}>{area}</Link>
                </td>
                <td>
                  <Link href={`/countries/${name?.common}`}>{region}</Link>
                </td>
              </tr>
            ))}
      </tbody>
    </table>
  );
}

export default Board;
