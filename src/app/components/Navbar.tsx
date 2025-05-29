'use client';

import { useState } from 'react';
import Image from "next/image";
import { FiMenu, FiShoppingCart } from 'react-icons/fi';
import { useRouter } from 'next/navigation'; 
import SearchBar from "./search";
import logo from "../assets/logo.png";
import Link from 'next/link';
import { useCart } from '../context/CartContext';

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
    <div className="flex flex-col w-full border">
      <nav className="fixed top-0 w-full flex items-center py-2 px-2 justify-between gap-2 z-50 bg-white text-gray-300">
        <Link href="/" className="uppercase font-bold text-md h-12 flex items-center mr-2 hover:scale-110 transition-all">
          <Image 
            src={logo}
            alt="Logo TechCore"
            width={50}
            height={50}
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

          {/* Dropdown do carrinho posicionado logo abaixo da navbar */}
          {cartOpen && (
            <div className="absolute right-0 top-full mt-1 w-80 bg-white shadow-xl rounded-lg p-4 z-50 border">
              <h2 className="font-bold text-lg mb-2">Carrinho</h2>
              {cart.length === 0 ? (
                <p className="text-gray-500">Seu carrinho está vazio.</p>
              ) : (
                <ul className="space-y-2 max-h-60 overflow-y-auto">
                  {cart.map((item) => (
                    <li key={item.id} className="flex items-center border-b pb-2">
                      {/* Se usar next/image, veja a observação acima */}
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        width={50} 
                        height={50} 
                        className="rounded object-cover" 
                      />
                      <div className="ml-3">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-purple-600 font-bold text-sm">
                          R$ {(item.price / 100).toFixed(2)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <FiMenu 
            size={30}  
            color="black" 
            className="cursor-pointer" 
            onClick={() => setMenuOpen(!menuOpen)}
          />
        </div>
      </nav>

      <div
        className={`transition-all duration-500 ease-in-out mt-16 p-4 overflow-hidden ${menuOpen ? 'md:max-h-screen' : 'max-h-0 opacity-0'}`}
      >
        <ul className='flex flex-row max-h-full gap-2'>
          <li className='text-gray-400 cursor-pointer'><Link href='/catalog'>Princesa 1</Link></li>
          <li className='text-gray-400 cursor-pointer'><Link href='/catalog'>Princesa 2</Link></li>
          <li className='text-gray-400 cursor-pointer'><Link href='/catalog'>Princesa 3</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
