
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { BiSearchAlt, BiBell } from 'react-icons/bi';
import useAuth from '../hooks/useAuth';

function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const { logout } = useAuth()
  
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }
  
        window.addEventListener('scroll', handleScroll)
  
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <header className={`${isScrolled && 'bg-[#141414]'}`}>
            <div className="flex items-center space-x-2 md:space-x-10">
                <img
                    src="https://rb.gy/ulxxee"
                    width={100}
                    height={100}
                    className="cursor-pointer object-contain"
                />

                {/* <BasicMenu /> */}
                <ul className="hidden space-x-4 md:flex">
                    <Link href='/'>
                        <li className="headerLink">Home</li>
                    </Link>
                    {/* <Link href='/tvshow'> */}
                        <li className="headerLink">TV Shows</li>
                    {/* </Link> */}
                    <li className="headerLink">Movies</li>
                    <li className="headerLink">New & Popular</li>
                    <li className="headerLink">My List</li>
                </ul>
            </div>

            <div className="flex items-center space-x-4 text-sm font-light">
                <BiSearchAlt className="hidden h-6 w-6 sm:inline" />
                <p className="hidden lg:inline">Kids</p>
                <BiBell className="h-6 w-6" />
                {/* <Link href="/account"> */}
                    <img
                        onClick={logout}
                        src="https://rb.gy/g1pwyx"
                        alt=""
                        className="cursor-pointer rounded"
                    />
                {/* </Link> */}
            </div>
        </header>
    )
}

export default Header