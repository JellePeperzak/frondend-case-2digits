'use client'
import { useState, useEffect } from "react";
import React from "react";

import BlogCard from "../blogCard/blogCard";

import type { PreprRecentPostsQuery_Blogs_Blogs } from "@/server/prepr/generated/preprAPI.schema";

type ArchiveGridProps = {
    Blogs: PreprRecentPostsQuery_Blogs_Blogs | undefined;
};

export default function ArchiveGrid({ Blogs }: ArchiveGridProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>('all_blogs');
    const [tempQuery, setTempQuery] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>();
    const [visiblePageNumbers, setVisiblePageNumbers] = useState<number[]>([]);
    const [filteredBlogs, setFilteredBlogs] = useState(Blogs?.items)

    useEffect(() => {
        // Filter blogs based on provided search query and selected category
        if (Blogs) {
            setCurrentPage(1)
            const filteredBlogs = Blogs.items.filter(blog => 
                (selectedCategory === blog?.categories?.[0]?.body || selectedCategory === "all_blogs") &&
                blog?.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredBlogs(filteredBlogs)

            const blogsPerPage = 9;
            const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage)
            setTotalPages(totalPages)

            // Generate an array of which page numbers are visible in the navigation panel
            const pages = new Set([1, totalPages]);
            for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                if (i > 1 && i < totalPages) {
                    pages.add(i)
                }
            }
            setVisiblePageNumbers(Array.from(pages).sort((a, b) => a - b))
        }       
    }, [searchQuery, selectedCategory]);

    useEffect(() => {
        // Update the pagination if a new index is selected.
        if (totalPages) {
            const pages = new Set([1, totalPages]);
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    if (i > 1 && i < totalPages) {
                        pages.add(i)
                    }
                }
            setVisiblePageNumbers(Array.from(pages).sort((a, b) => a - b))
        }
    }, [currentPage])

    const handleCategoryClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setSelectedCategory(e.currentTarget.value)
    }

    const handleQueryClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setSearchQuery(tempQuery);
    }

    return (
        <>
            <div className="flex flex-col gap-[8px] md:gap-[24px] h-fit w-full bg-[#E9EBF4] px-[1rem] md:px-[3rem] lg:px-[calc(10rem+5%)] py-[1rem] md:py-[3rem]">
                <label htmlFor="blogSearch" className="font-semibold text-[20px] md:text-[24px]">Search for blogs</label>
                <div className="w-full h-fit flex gap-[24px]">
                    <input 
                        className="text-[14px] md:text-[16px] flex-grow font-semibold border-2 border-[#D3D3D3] focus:outline-none focus:shadow-[inset_0_0_0_2px_#762BFF] rounded-[3px] py-[0.5rem] md:py-[0.75rem] px-[1rem]" 
                        id="blogSearch"
                        name="blogSearch"
                        type="text"
                        aria-label="Search for blog title"
                        placeholder="Search for blog title"
                        value={tempQuery}
                        onChange={e => setTempQuery(e.target.value)}
                    />
                    <button 
                        className="text-[13px] md:text-[15px] bg-[#FFFFFF] hover:bg-[#e1e1e1] font-semibold border-2 border-[#141414] rounded-[3px] py-[0.5rem] px-[1em] lg:px-[2em]"
                        type="submit"
                        aria-label="Submit search"
                        onClick={handleQueryClick}
                    >
                        Search
                    </button>
                </div>
            </div>
            <div className="px-[1rem] md:pl-[3rem] lg:pl-[calc(10rem+5%)] py-[3rem]">
                <div className="flex flex-col gap-[16px] m-auto">
                    <h2 className="font-semibold text-[20px] md:text-[24px]">Search for blogs</h2>
                    <div className="flex gap-[4px] md:gap-[24px] mb-[24px]">
                        <button
                            type="button"
                            id="all_blogs"
                            aria-pressed={selectedCategory === "all_blogs"}
                            value="all_blogs"
                            onClick={handleCategoryClick}
                            className={`text-[12px] font-semibold px-[1em] py-[0.5em] rounded-[4px] ${selectedCategory === "all_blogs" ? "border-[#762BFF] bg-[#762BFF] text-[#FFFFFF]" : "border border-[#EDEDED] bg-[#FFFFFF]"}`}
                        >
                            ALL BLOGS
                        </button>
                        <button
                            type="button"
                            id="Interview"
                            aria-pressed={selectedCategory === "Interview"}
                            value="Interview"
                            onClick={handleCategoryClick}
                            className={`text-[12px] font-semibold px-[1em] py-[0.5em] rounded-[4px] ${selectedCategory === "Interview" ? "border-[#762BFF] bg-[#762BFF] text-[#FFFFFF]" : "border border-[#EDEDED] bg-[#FFFFFF]"}`}
                        >
                            INTERVIEW
                        </button>
                        <button
                            type="button"
                            id="Blog"
                            aria-pressed={selectedCategory === "Blog"}
                            value="Blog"
                            onClick={handleCategoryClick}
                            className={`text-[12px] font-semibold px-[1em] py-[0.5em] rounded-[4px] ${selectedCategory === "Blog" ? "border-[#762BFF] bg-[#762BFF] text-[#FFFFFF]" : "border border-[#EDEDED] bg-[#FFFFFF]"}`}
                        >
                            BLOG
                        </button>
                        <button
                            type="button"
                            id="Whitepaper"
                            aria-pressed={selectedCategory === "Whitepaper"}
                            value="Whitepaper"
                            onClick={handleCategoryClick}
                            className={`text-[12px] font-semibold px-[1em] py-[0.5em] rounded-[4px] ${selectedCategory === "Whitepaper" ? "border-[#762BFF] bg-[#762BFF] text-[#FFFFFF]" : "border border-[#EDEDED] bg-[#FFFFFF]"}`}
                        >
                            WHITEPAPER
                        </button>
                    </div>
                    {filteredBlogs && filteredBlogs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 self-center md:self-start">
                            {filteredBlogs.slice((currentPage - 1) * 9, currentPage * 9).map((blog, index) => {
                                // Ensure the Blogs object has a 'text' field in the content object so that
                                // it can be used with the BlogCard component
                                const contentBlock = blog?.content?.[0];
                                const safeText = contentBlock && 'text' in contentBlock ? contentBlock.text : '';
                                return (
                                <BlogCard
                                    key={index}
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
                            {(filteredBlogs && filteredBlogs.length > 0) && (
                                <div className="col-span-1 md:col-span-2 xl:col-span-3 flex gap-[8px] align-center justify-center">
                                    {currentPage !== 1 && 
                                        // Used < sign because react-icons is not in the list of dependencies
                                        <button 
                                            onClick={() => setCurrentPage(currentPage - 1)}
                                            className="flex items-center justify-center w-[40px] h-[40px] font-bold text-[30px] text-[#8c8c8c]"
                                        >＜</button>
                                    }
                                    {visiblePageNumbers.map((num, i) => (
                                        <React.Fragment key={`pagenumber-${i}`}>
                                            {(num === currentPage - 1 && num > 2) && 
                                                <p className="flex items-center justify-center w-[40px] h-[40px] font-medium text-[15px] text-[black]">...</p>
                                            }
                                            <button
                                                onClick={() => setCurrentPage(num)}
                                                className={`w-[40] h-[40] font-medium text-[15px] ${num === currentPage ? 'text-[white] bg-[#2B1E57] rounded-[4px]' : 'text-[black]'}`}
                                            >
                                            {num}
                                            </button>
                                            {(num === currentPage + 1 && totalPages && num < totalPages - 1) && 
                                                <p className="flex items-center justify-center w-[40px] h-[40px] font-medium text-[15px] text-[black]">...</p> 
                                            }
                                        </React.Fragment>
                                        
                                    ))}
                                    {currentPage !== totalPages && 
                                        <button 
                                            onClick={() => setCurrentPage(currentPage + 1)}
                                            className="flex items-center justify-center w-[40px] h-[40px] font-bold text-[30px] text-[#8c8c8c]"
                                        >＞</button>
                                    }
                                </div>
                            )}
                        </div>
                    ) : (
                        <p className="text-[16px] italic text-gray-600 self-center">No blog posts found.</p>
                    )}
                    
                </div>
            </div>   
        </>
    )
}
