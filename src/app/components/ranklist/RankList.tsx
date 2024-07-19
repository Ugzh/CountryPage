import Input from "@/app/components/input/Input";

function RankList() {
  return (
    <div className="bg-[#1B1D1F] border border-[#282B30] rounded-xl h-3/5 w-3/4 flex -m-24 z-10">
      <div className="flex justify-between text-[#6C727F] w-full h-20 items-center px-6 ">
        <h2 className="font-medium">Found 234 countries</h2>
        <Input />
      </div>
    </div>
  );
}

export default RankList;
