import { PreprSdk } from '@/server/prepr';

import ArchiveGrid from '@/components/archiveGrid/archiveGrid';

export default async function Home() {
  const { Page } = await PreprSdk.PageOther({id: "3837c994-0641-410f-bad5-c907db5f35a8"});
  const { Blogs } = await PreprSdk.RecentPosts()

  return (
    <main className="flex-grow flex flex-col">
      <div
        className="h-fit w-full flex flex-col self-center items-center justify-center text-white text-center bg-cover bg-center max-h-screen overflow-hidden"
        style={{ backgroundImage: `url(${Page?.page_header?.image.url})` }}
      >
        <div className="flex flex-col gap-[1em] lg:gap-[1.5em] h-full w-full bg-[black]/20 backdrop-brightness-50 px-[2em] py-[3em] lg:py-[7em]">
          <h1 className="self-center font-bold leading-[1em] text-[30px] md:text-[50px] lg:text-[72px] w-[20rem] md:w-[30rem] lg:w-[44rem]">{Page?.page_header?.title}</h1>
        </div>
      </div>
      <ArchiveGrid Blogs={Blogs} />
    </main>
  );
}
