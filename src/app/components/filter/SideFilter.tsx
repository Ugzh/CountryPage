"use client";

import { DATA_REGION, SELECT_OPTION } from "@/data";
import React from "react";

function SideFilter({ setOptionValue, optionValue }: any) {
  return (
    <div className="flex ">
      <form className="flex flex-col gap-2 px-5 w-1/">
        <label htmlFor="sort-by" className="text-xs text-[#6C727F]">
          Sort by
        </label>
        <select
          id="sort-by"
          value={optionValue}
          className="w-full px-2 py-2 bg-transparent border rounded-lg border-[#282B30]  text-sm text-[#D2D5DA]"
          onChange={(event) => {
            setOptionValue(event.target.value);
          }}
        >
          {SELECT_OPTION.map((selectOption) => {
            return (
              <option
                key={`${selectOption}-${Math.random()}`}
                value={selectOption}
                className="text-[#D2D5DA] bg-[#1B1D1F] border-[#282B30]"
              >
                {selectOption}
              </option>
            );
          })}
        </select>
        <fieldset className="text-xs text-[#6C727F] mt-6">
          <legend>Region</legend>{" "}
        </fieldset>
        <div className="flex text-[#6C727F] text-sm gap-4 flex-wrap mt-4">
          {DATA_REGION.map((region) => {
            return (
              <div key={Math.random() + " region"} className="px-3">
                <input
                  type="checkbox"
                  id={region}
                  value={region}
                  className="hidden"
                ></input>
                <label htmlFor={region}>{region}</label>
              </div>
            );
          })}
        </div>
        <div>
          <fieldset className="text-xs text-[#6C727F] mt-6">
            <legend> Status</legend>
          </fieldset>
          <input
            type="checkbox"
            id="status"
            value="independant"
            className="mt-6"
          />
          <label htmlFor="status" className="text-[#D2D5DA] pl-3 relative">
            Independant
          </label>
        </div>
      </form>
    </div>
  );
}

export default SideFilter;
