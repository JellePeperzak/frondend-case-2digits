import { PreprSdk } from '@/server/prepr';
import Image from 'next/image';

import BlogCard from '@/components/blogCard/blogCard';

interface BlogPostProps {
  params: {
    blogSlug: string;
  }
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { blogSlug } = await params;  // despite the editor saying await doesn't do anything, adding it removes an Error message <:o)
  const { Blog } = await PreprSdk.BlogBySlug({ slug: blogSlug});

  return (
    <main className="flex flex-col">
      <div className="flex w-full h-[10rem] md:h-[20rem]">
        <Image 
            src={Blog?.banner_image.url ?? ''}
            alt="Blog post thumbnail"
            className="absolute z-0 object-cover object-[center_25%] h-[10rem] md:h-[20rem] w-full"
            width={Blog?.banner_image.width}
            height={Blog?.banner_image.height}
        />
      </div>
      <div className="my-[2rem] mx-[1rem] md:my-[5rem] md:mx-[5rem] lg:ml-[calc(10rem+5%)] lg:w-[45rem] xl:w-[55rem]">
        <div className="bg-[#E9EBF4] w-fit rounded-[4px] py-[0.75em] px-[1em] text-[12px] uppercase font-medium">{Blog?.categories[0]?.body}</div>
        <h1 className="text-[30px] lg:text-[40px] xl:text-[48px] font-bold mb-6">{Blog?.title}</h1>
        {Blog?.content?.map((block, index) => {
          if (!block || !('text' in block) || typeof block.text !== 'string') return null;

          const text = block.text;
          const format = 'format' in block && typeof block.format === 'string' ? block.format : null;

          switch (format) {
            case 'H1':
              return <h1 key={index} className="text-[32px] font-bold mb-4">{text}</h1>;
            case 'H2':
              // Everything H2 and below is styled similarly according to the design
              return <h2 key={index} className="text-[21px] font-semibold mb-4 mt-8">{text}</h2>;
            case 'H3':
              return <h3 key={index} className="text-[21px] font-semibold mb-4 mt-8">{text}</h3>;
            case 'H4':
              return <h4 key={index} className="text-[21px] font-semibold mb-4 mt-8">{text}</h4>;
            case 'H5':
              return <h5 key={index} className="text-[21px] font-semibold mb-4 mt-8">{text}</h5>;
            case 'H6':
              return <h6 key={index} className="text-[21px] font-semibold mb-4 mt-8">{text}</h6>;
            default:
              return <p key={index} className="text-[16px] font-light mb-4">{text}</p>;
          }
        })}
      </div>

      
        {Blog?.related_blogs && Blog.related_blogs.length > 0 && (
          <div className="my-[2rem] mx-[1rem] md:mb-[5rem] md:mx-[5rem] lg:ml-[calc(10rem+5%)] lg:w-[45rem] xl:w-[55rem]">
            <h2 className="text-[26px] md:text-[30px] xl:text-[36px] font-bold">Related blogs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {Blog?.related_blogs.slice(0, 3).map((blog, index) => {
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
          </div>
        )}
    </main>
  );
}
