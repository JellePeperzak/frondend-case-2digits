import Image from 'next/image';

import { PreprSdk } from '@/server/prepr';

export default async function Home() {
  const { Page } = await PreprSdk.PageHome();

  return (
    <main className="flex-grow flex flex-col w-full">
      {Page?.page_header?.image.url && (
        <Image
            src={Page?.page_header?.image.url}
            alt="People at work"
            className="absolute top-[64px] lg:top-[72px] left-0 w-fill z-[-1] translate-y-[-25%] brightness-50"
            width={Page?.page_header?.image.width}
            height={Page?.page_header?.image.height}
            priority
          />
      )}
      <div>
        <h1 className="text-[white] font-bold text-[40px]">{Page?.page_header?.title}</h1>
        <p className="text-[white]">{Page?.page_header?.text}</p>
      </div>
    </main>
  );
}