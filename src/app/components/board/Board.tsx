"use client";

import useSWR from "swr";
import React from "react";
import Image from "next/image";

export const fetcher = async (url: string) => {
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

function Board({ searchTerm, setEndpoint }: any) {
  // Permet de changer aux requêtes
  const [endpointBoard, setEndpointBoard] = React.useState<string | null>(
    "https://restcountries.com/v3.1/all",
  );
  const { data } = useSWR(endpointBoard, fetcher);

  // Permet de trier selon le plus peuplé
  const sortDataByPopulation = (data: any[]) => {
    return data?.sort((a, b) => b.population - a.population);
  };

  const [mostPopulated, setMostPopulated] = React.useState(
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
              console.log(endpoints[i]);
              setEndpoint(endpoints[i]);
              const sortedPopulation = sortDataByPopulation(data);

              return (
                setMostPopulated(sortedPopulation),
                setEndpointBoard(endpoints[i])
              );
            }
          } catch (error) {
            console.error(`Failed to fetch from ${endpoints}`, error);
          }
        }
        setEndpointBoard("");
      };

      fetchData();
    } else if (searchTerm.length === 0) {
      setEndpoint("https://restcountries.com/v3.1/all");
      setEndpointBoard("https://restcountries.com/v3.1/all");
    }
  }, [searchTerm, setEndpoint]);

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
        {Array.isArray(data) ? (
          data?.map(({ flags, name, population, area, region }: any) => (
            <tr key={Math.random()}>
              <td>
                <Image
                  src={flags?.svg}
                  width={0}
                  height={0}
                  alt={name?.common}
                  className="rounded-md my-3 h-[50px] w-[50px] object-contain"
                />
              </td>

              <td>{name?.common}</td>
              <td>{population}</td>
              <td>{area}</td>
              <td>{region}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td>Any results</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default Board;
