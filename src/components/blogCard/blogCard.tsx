/*
    --- IMPORTANT STYLES ---
    - image border-radius bottom-right: 6px
*/
import Image from "next/image";
import Link from "next/link";



interface BlogCardProps {
    imageUrl: string | undefined;
    imageWidth: number | undefined;
    imageHeight: number | undefined;
    title: string | undefined;
    category: string | undefined;
    text: string | undefined;
    slug: string | undefined;
}

export default function BlogCard(blog: BlogCardProps) {
    // Reduce length of text, which is initially the first paragraph of the 
    // blog article, to only the first sentence to function as a 'preview'
    const shortenedText = blog.text
        ?.split(/(?<=[.?!])\s+/)
        .slice(0, 1)             
        .join(' ');              


    return (
        <div className="flex gap-[1rem] flex-col w-[275px] md:w-[350px] h-[350px] md:h-[446px]">
            <div className="flex-1 relative w-full">
                <Image 
                    src={blog.imageUrl ?? ''}
                    alt="Blog post thumbnail"
                    fill
                    className="z-0 object-cover"
                />
                <div className="absolute z-10 bottom-[0.5rem] left-[0.5rem] bg-[#E9EBF4] rounded-[4px] py-[0.75em] px-[1em] text-[12px] uppercase font-medium">{blog.category}</div>
            </div>
            <div className="flex-1 flex flex-col gap-[12px] w-full ">
                <div className="font-bold">{blog.title}</div>
                <div className="text-[12px] md:text-[14px]">{shortenedText}</div>
                <Link 
                    href={`blog/${blog.slug}`}
                    className="flex w-fit group">
                    <p className="text-[#762BFF] text-[11px] md:text-[13px] font-bold">Read more</p>
                    <p className="text-[#762BFF] text-[11px] md:text-[13px] ml-[1.5em] transition-all duration-200 group-hover:ml-[0.5em]">➜</p> 
                    {/* Used arrow symbol over react-icons alternative as the react-icons dependency was not installed for this assessment*/}
                </Link>
            </div>
        </div>
    )
}