'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef, useEffect } from 'react';

import type { PreprNavBlogQuery_MenuItem_MenuItem } from '@/server/prepr/generated/preprAPI.schema';
import type { KeyboardEvent } from 'react';

/* 
    Defined type HeaderProps to ensure that the data provided to HeaderClient is formatted similarly to how it 
    received from the prepr API.
*/
type HeaderProps = {
    menuItem: PreprNavBlogQuery_MenuItem_MenuItem | undefined;
};

export default function HeaderClient({ menuItem }: HeaderProps) {
  const hamburgerRef = useRef<HTMLInputElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Hook allowing the hamburger menu to be deselected when clicked outside of it.
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
            headerRef.current &&
            !headerRef.current.contains(event.target as Node) &&
            hamburgerRef.current?.checked
            ) {
            hamburgerRef.current.checked = false;
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLLabelElement>) => {
        if (e.key === "Enter" || e.key ===" ") {
            e.preventDefault();
            hamburgerRef.current?.click();
        };
    };

  return (
    <header 
        className="sticky h-fit w-full top-0 z-50 text-[16px] lg:text-[18px] bg-white"
        ref={headerRef}>
      <nav className="relative h-[64px] lg:h-[72px] flex justify-between px-[1em] py-[1em]">
        <Link href="/" aria-label="Navigate to Home page">
          <Image 
            src="/images/logo.png"
            alt="Logo"
            width={407}
            height={80}
            className="h-[2em] w-auto"
          />
        </Link>
        
        {/* Hamburger Menu Button (Mobile) */}
        <input 
            type="checkbox" 
            id="menu-toggle" 
            className="peer hidden"
            ref={hamburgerRef}
        />
        <label 
            htmlFor="menu-toggle" 
            className="lg:hidden cursor-pointer text-2xl"
            tabIndex={0}
            onKeyDown={handleKeyDown}
        >
            ☰
        </label>

        {/* Non-logo navigation - allows addition of extra <li> elements */}
        <ul className="hidden peer-checked:flex peer-checked:border-t flex-col absolute top-[64px] left-0 w-full bg-white lg:border-none lg:flex lg:flex-row lg:static lg:shadow-none lg:gap-y-0 lg:py-0 lg:w-fit">
            <li className="leading-[3em] border-b px-[2em] text-start content-center lg:border-0 lg:leading-[1.5] lg:py-0">
                <Link 
                    href={menuItem?.link_to_page[0]?._slug ?? '/blog'}    // hardcoded alternative because 'undefined' is allowed by typescript
                    className="self-center font-bold"
                >
                    {menuItem?.link_to_page[0]?.title ?? 'Blog'}
                </Link>
            </li>
        </ul>
      </nav>
    </header>
  );
}