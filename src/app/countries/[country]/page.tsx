"use client";

import React from "react";
import useSWR from "swr";
import { fetcher } from "@/app/components/board/Board";
import Header from "@/app/components/header/Header";
import Image from "next/image";

function CountryPage({ params }: any) {
  const ENDPOINT = `https://restcountries.com/v3.1/name/${params.country}?fullText=true
`;
  const [currenciesData, setCurrenciensData] = React.useState();
  const [langagues, setLangagues] = React.useState<any | null>();
  const { data } = useSWR(ENDPOINT, fetcher);

  React.useEffect(() => {
    if (Array.isArray(data)) {
      const currenciesKey: any = Object.keys(data[0]?.currencies);
      return setCurrenciensData(data[0]?.currencies[currenciesKey].name);
    }
  }, [data]);
  let langueArray = [];
  React.useEffect(() => {
    if (Array.isArray(data)) {
      const languageKey = Object.keys(data[0]?.languages);

      for (let i = 0; languageKey.length > i; i++) {
        langueArray.push(data[0]?.languages[languageKey[i]]);
      }
      setLangagues(langueArray);
    }
  }, [data]);

  console.log(langagues);
  return (
    <div className="bg-[#1B1D1F] flex flex-col items-center w-full pb-20 ">
      <Header></Header>
      <div className="w-1/3 border border-[#282B30] -mt-12 z-10 rounded-xl">
        {Array.isArray(data) && (
          <div className="flex items-center justify-center flex-col bg-[#1B1D1F] text-[#D2D5DA]  w-full rounded-xl">
            <div className="flex-col justify-center items-center flex w-full mb-10 ">
              <Image
                src={data[0]?.flags?.svg}
                alt={data[0]?.name?.common}
                width={300}
                height={300}
                className="rounded-xl flex -mt-12"
              />
              <h1 className="px-5 text-4xl pt-5">{data[0]?.name?.common}</h1>
              <h2 className="font-normal ">{data[0]?.name?.official}</h2>
              <div className="flex pt-8 w-full justify-between gap-5">
                <div className="flex gap-8 text-sm items-center ml-12 bg-[#282B30] py-3 px-5 rounded-xl">
                  <p className="border-r pr-2 border-[#1B1D1F]">Population</p>
                  <p className="text-lg">{data[0]?.population}</p>
                </div>
                <div className="flex gap-8 text-sm items-center mr-12 bg-[#282B30] py-3 px-5 rounded-xl">
                  <p className="border-r pr-2 border-[#1B1D1F]">Area (km²)</p>
                  <p className="text-lg">{data[0]?.area}</p>
                </div>
              </div>
            </div>
            <div className="flex py-8 justify-between w-full px-6 border border-[#282B30]">
              <p className="text-[#6C727F]">Capital</p>
              <p>{data[0]?.capital}</p>
            </div>
            <div className="flex py-8 justify-between w-full px-6 border border-[#282B30]">
              <p className="text-[#6C727F]">Subregion</p>
              <p>{data[0]?.subregion}</p>
            </div>
            <div className="flex py-8 justify-between w-full px-6 border border-[#282B30]">
              <p className="text-[#6C727F]">Language</p>
              <p>{langagues?.join(", ")}</p>
            </div>
            <div className="flex py-8 justify-between w-full px-6 border border-[#282B30]">
              <p className="text-[#6C727F]">Currencies</p>
              <p>{currenciesData}</p>
            </div>
            <div className="flex py-8 justify-between w-full px-6 border border-[#282B30]">
              <p className="text-[#6C727F]">Continents</p>
              <p>{data[0]?.continents[0]}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CountryPage;
