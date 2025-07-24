import { PreprSdk } from '@/server/prepr';
import Image from 'next/image';

import ArchiveGrid from '@/components/archiveGrid/archiveGrid';

export default async function Home() {
  const { Page } = await PreprSdk.PageOther({id: "3837c994-0641-410f-bad5-c907db5f35a8"});
  const { Blogs } = await PreprSdk.RecentPosts()

  return (
    <main className="flex-grow flex flex-col">
      <div className="flex w-full h-[10rem] md:h-[15rem]">
        <Image 
            src={Page?.page_header?.image.url ?? ''}
            alt="Blog post thumbnail"
            className="absolute z-0 object-cover object-[center_25%] h-[10rem] md:h-[15rem]"
            width={Page?.page_header?.image.width}
            height={Page?.page_header?.image.height}
        />
        <div className="flex flex-col justify-center gap-[1em] lg:gap-[1.5em] h-full w-full bg-[black]/20 backdrop-brightness-50">
          <h1 className="self-center text-center text-[white] font-bold leading-[1em] text-[30px] md:text-[50px] lg:text-[72px] w-[20rem] md:w-[30rem] lg:w-[44rem]">{Page?.page_header?.title}</h1>
        </div>
      </div>
      <ArchiveGrid Blogs={Blogs} />
    </main>
  );
}
