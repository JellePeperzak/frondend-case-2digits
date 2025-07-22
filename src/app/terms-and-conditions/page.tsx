import Image from 'next/image';

import { PreprSdk } from '@/server/prepr';

export default async function Home() {
  const { Page } = await PreprSdk.Example();

  return (
    <main className="flex flex-col items-center justify-between p-24">

    </main>
  );
}
