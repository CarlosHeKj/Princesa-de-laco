'use client';

import { useState } from 'react';
import Image from "next/image";
import { FiMenu, FiShoppingCart } from 'react-icons/fi';
import { useRouter } from 'next/navigation'; 
import SearchBar from "./search";
import logo from "../assets/logo.png";
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import CartDropdown from './CartDropdown';

function Navbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const { cart } = useCart();

  const handleSearch = (searchTerm: string) => {
    if (searchTerm.trim()) {
      router.push(`/catalog?search=${searchTerm}`);
    } else {
      router.push('/catalog');
    }
  };

  return (
    <div className="flex flex-col w-full border-b bg-white shadow-sm">
      <nav className="fixed top-0 w-full flex items-center py-2 px-4 justify-between z-50 bg-white">
        <Link href="/" className="uppercase font-bold text-md h-12 flex items-center mr-2 hover:scale-110 transition-all">
          <Image 
            src={logo}
            alt="Logo Princesa de laco"
            width={40}
            height={40}
            className="mr-2 rounded-full md:block hidden"
          /> 
          Princesa de Laço
        </Link>
        
        <SearchBar onSearch={handleSearch} />

        <div className="flex items-center gap-4 relative">
          <button onClick={() => setCartOpen(!cartOpen)} className="relative z-50">
            <FiShoppingCart size={24} color="black" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>

          <CartDropdown open={cartOpen} />

          <FiMenu 
            size={30}  
            color="black" 
            className="cursor-pointer" 
            onClick={() => setMenuOpen(!menuOpen)}
          />
        </div>
      </nav>

      {/* Menu mobile */}
      <div
        className={`transition-all duration-300 ease-in-out mt-16 px-4 py-2 overflow-hidden bg-white border-t ${
          menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className='flex flex-col md:flex-row gap-4 text-sm text-gray-600'>
          <li><Link href='/catalog'>Atacado 1</Link></li>
          <li><Link href='/catalog'>Atacado 2</Link></li>
          <li><Link href='/catalog'>Atacado 3</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
