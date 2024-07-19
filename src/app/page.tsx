import Header from "@/app/components/header/Header";
import RankList from "@/app/components/ranklist/RankList";

export default function Home() {
  return (
    <div className="bg-[#1B1D1F] h-screen flex flex-col items-center w-full">
      <Header></Header>
      <RankList></RankList>
    </div>
  );
}
