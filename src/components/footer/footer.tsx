import { PreprSdk } from "@/server/prepr";
import Link from "next/link";

export default async function Footer() {
  const { Navigation } = await PreprSdk.NavFooter();

  return (
    <footer className="flex gap-[4em] w-full h-[64px] lg:h-[72px] text-[12px] text-[#FFFFFF] justify-evenly sm:justify-start py-[1em] px-[3em] lg:px-[10em] bg-gradient-to-r from-[#2B1E57] to-[#141414]">
        {Navigation?.items.map((item) => (
            item?.link_to_page[0]?._slug && 
                <Link 
                key={`Footernav-${item?.link_to_page[0]?.title}`} 
                href={`/${item?.link_to_page[0]?._slug}`}
                className="self-center"
                >
                {item?.link_to_page[0]?.title}
                </Link>
            ))}
    </footer>
  );
}