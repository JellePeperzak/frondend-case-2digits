import { PreprSdk } from '@/server/prepr';
import Image from 'next/image';

export default async function PrivacyStatement() {
  const { Page } = await PreprSdk.PageOther({ id: "732f4909-ba5c-4fce-a11f-b627bac0db60"});

  // Prepare the html by removing the outer <p></p> element and splitting the text into paragraphs
  const rawHtml = Page?.html ?? '';
  const trimmedHtml = rawHtml.replace(/^<p>/, '').replace(/<\/p>$/, '');
  const paragraphs = trimmedHtml.split('</p><p>');

  return (
    <main className="flex-grow flex flex-col">
      <div className="flex w-full h-[10rem] md:h-[20rem]">
        <Image 
            src={Page?.page_header?.image.url ?? ''}
            alt="Blog post thumbnail"
            className="absolute z-0 object-cover object-[center_25%] h-[10rem] md:h-[20rem]"
            width={Page?.page_header?.image.width}
            height={Page?.page_header?.image.height}
        />
        <div className="flex flex-col justify-center gap-[1em] lg:gap-[1.5em] h-full w-full bg-[black]/20 backdrop-brightness-50">
          <h1 className="self-center text-center text-[white] font-bold leading-[1em] text-[30px] md:text-[50px] lg:text-[72px] w-[20rem] md:w-[30rem] lg:w-[44rem]">{Page?.page_header?.title}</h1>
        </div>
      </div>
      <div className="my-[2rem] mx-[1rem] md:my-[5rem] md:mx-[5rem] lg:ml-[calc(10rem+5%)] lg:w-[45rem] xl:w-[55rem]">
        {paragraphs.map((text, index) => (
          <p key={`paragraph-${index}`} className="text-[16px] font-light mb-4">
            {text}
          </p>
        ))}
      </div>
      
    </main>
  );
}
