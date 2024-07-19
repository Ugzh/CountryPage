"use client";

import useSWR from "swr";
import React from "react";
import Image from "next/image";
const ENDPOINT =
  "https://restcountries.com/v3.1/region/europe?fields=flags,name,population,area,region";

async function fetcher(endpoint: string) {
  const response = await fetch(endpoint);
  const json = await response.json();
  return json;
}

function Board() {
  const { data, error } = useSWR(ENDPOINT, fetcher);
  const [tableData, setTableData] = React.useState([]);
  React.useEffect(() => {
    if (data !== undefined) {
      return setTableData(data);
    }
  });

  // @ts-ignore
  // @ts-ignore
  return (
    <table className="w-full">
      <thead>
        <tr className="text-left">
          <th>Flag</th>
          <th>Name</th>
          <th>Population</th>
          <th>Area (km²)</th>
          <th>Region</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((country) => (
          <tr key={Math.random()}>
            <td>
              <Image
                // @ts-ignore:
                src={country.flags.svg}
                width={50}
                height={50}
                // @ts-ignore:
                alt={country.name.common}
              />
            </td>

            <td>
              {
                // @ts-ignore:
                country.name.common
              }
            </td>
            <td>
              {
                // @ts-ignore:
                country.population
              }
            </td>
            <td>
              {
                // @ts-ignore:
                country.area
              }
            </td>
            <td>
              {
                // @ts-ignore:
                country.region
              }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Board;
