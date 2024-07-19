import SearchLoop from "@/app/assets/img/Search.svg";
import Image from "next/image";

function Input({}) {
  return (
    <div className="w-1/4 relative">
      <input
        type="text"
        className="h-[50px] bg-[#282B30] pl-12 rounded-xl text-[#6C727F] text-xs font-medium w-full"
        placeholder="Search by Name, Region, Subregion"
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
