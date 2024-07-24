import SpaceBg from "@/app/assets/img/hero-image-wr.jpg";
import Image from "next/image";
import Logo from "@/app/assets/img/Logo.svg";
import Link from "next/link";
function Header() {
  return (
    <div className="w-full relative h-1/3">
      <Image
        src={SpaceBg}
        alt="Background space"
        height={200}
        className="w-full "
      />
      <Link href="/">
        <Image
          src={Logo}
          alt="Logo Word Ranks"
          className=" absolute top-1/2 right-1/2"
        />
      </Link>
    </div>
  );
}

export default Header;
