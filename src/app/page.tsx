import { PreprSdk } from '@/server/prepr';
import Image from 'next/image';

import BlogCard from '@/components/blogCard/blogCard';

export default async function Home() {
  const { Page } = await PreprSdk.PageHome();
  const { Blogs } = await PreprSdk.RecentPosts();

  return (
    <main className="flex-grow flex flex-col gap-[2rem] w-full">
      <div className="flex w-full h-[15rem] md:h-[30rem]">
        <Image 
            src={Page?.page_header?.image.url ?? ''}
            alt="Blog post thumbnail"
            className="absolute z-0 object-cover object-[center_35%] h-[15rem] md:h-[30rem]"
            width={Page?.page_header?.image.width}
            height={Page?.page_header?.image.height}
        />
        <div className="flex flex-col justify-center gap-[1em] lg:gap-[1.5em] h-full w-full bg-[black]/20 backdrop-brightness-50">
          <h1 className="self-center text-center text-[white] font-bold leading-[1em] uppercase text-[30px] md:text-[50px] lg:text-[72px] w-[20rem] md:w-[30rem] lg:w-[44rem]">{Page?.page_header?.title}</h1>
          <p className="self-center text-center text-[13px] text-[white] lg:text-[16px] w-[27rem] md:w-[32rem] lg:w-[50rem] max-w-[100%] font-extralight px-[2em]">{Page?.page_header?.text}</p>
        </div>
      </div>
      <div className="flex flex-col items-start w-fit mx-auto gap-4 pb-[2rem]">
        <h2 className="text-[22px] md:text-[33px] xl:text-[48px] font-bold">The newest blogs</h2>
        {Blogs?.items && Blogs.items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {Blogs?.items.slice(0, 3).map((blog, index) => {
              // Ensure the Blogs object has a 'text' field in the content object so that
              // it can be used with the BlogCard component
              const contentBlock = blog?.content?.[0];
              const safeText = contentBlock && 'text' in contentBlock ? contentBlock.text : '';
              return (
                <BlogCard
                  key={blog._id ?? index}
                  imageUrl={blog?.banner_image?.url}
                  imageWidth={blog?.banner_image?.width}
                  imageHeight={blog?.banner_image?.height}
                  title={blog?.title}
                  category={blog?.categories?.[0]?.body}
                  text={safeText}
                  slug={blog?._slug}
                />
              );
            })}
          </div>
        ) : (
          <p className="text-[16px] italic text-gray-600 self-center">No blog posts found.</p>
        )}
      </div>
    </main>
  );
}