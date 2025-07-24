import { PreprSdk } from '@/server/prepr';

export default async function PrivacyStatement() {
  const { Page } = await PreprSdk.PageOther({ id: "732f4909-ba5c-4fce-a11f-b627bac0db60"});

  // Prepare the html by removing the outer <p></p> element and splitting the text into paragraphs
  const rawHtml = Page?.html ?? '';
  const trimmedHtml = rawHtml.replace(/^<p>/, '').replace(/<\/p>$/, '');
  const paragraphs = trimmedHtml.split('</p><p>');

  return (
    <main className="flex-grow flex flex-col">
      {/* I couldn't find a pretty banner image for the blog posts like in the design, so I opted to use the header images that are way too small */}
      <div
        className="h-fit w-full flex flex-col self-center items-center justify-center text-white text-center bg-cover bg-center max-h-screen overflow-hidden"
        style={{ backgroundImage: `url(${Page?.page_header?.image.url})` }}
      >
        <div className="flex flex-col gap-[1em] lg:gap-[1.5em] h-full w-full bg-[black]/20 backdrop-brightness-50 px-[2em] py-[3em] lg:py-[7em]">
          <h1 className="self-center font-bold leading-[1em] text-[30px] md:text-[50px] lg:text-[72px] w-fit">{Page?.page_header?.title}</h1>
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
