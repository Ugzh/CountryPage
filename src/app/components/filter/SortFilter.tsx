function sortFilter() {
  return (
    <form className="flex flex-col gap-2 mx-5">
      <label htmlFor="sort-by" className="text-xs text-[#6C727F]">
        Sort by
      </label>
      <select
        id="sort-by"
        className="w-60 px-2  py-2 bg-transparent border rounded-lg border-[#282B30]  text-sm text-[#D2D5DA]"
      >
        <option
          value="population"
          className="text-[#D2D5DA] bg-[#1B1D1F] border-[#282B30]"
        >
          Population
        </option>
        <option
          value="area"
          className="text-[#D2D5DA] bg-[#1B1D1F]  border-[#282B30]"
        >
          Area
        </option>
      </select>
    </form>
  );
}

export default sortFilter;
