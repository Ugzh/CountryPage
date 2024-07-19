import SpaceBg from "@/app/assets/img/hero-image-wr.jpg";
import Image from "next/image";
import Logo from "@/app/assets/img/Logo.svg";

function Header() {
  return (
    <div className="w-full relative">
      <Image src={SpaceBg} alt="Background space" className="w-full" />
      <Image
        src={Logo}
        alt="Logo Word Ranks"
        className=" absolute top-1/2 right-1/2"
      />
    </div>
  );
}

export default Header;
