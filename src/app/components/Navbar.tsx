'use client';

import { useState } from 'react'; // Importar useState
import Image from "next/image";
import { FiMenu } from 'react-icons/fi';

import { useRouter } from 'next/navigation'; 
import SearchBar from "./search";
import logo from "../assets/logo.png";
import Link from 'next/link';

function Navbar() {
  
  const router = useRouter(); 

  const handleSearch = (searchTerm: string) => {
    if (searchTerm.trim()) {
      router.push(`/catalog?search=${searchTerm}`);
    } else {
      router.push('/catalog');
    }
  };

  const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar se o menu está aberto ou fechado

  // Função para alternar o estado do menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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

        <div className="flex justify-start">
          <FiMenu 
            size={30}  
            color="black" 
            className="cursor-pointer" 
            onClick={toggleMenu} // Ao clicar no ícone, alterna o estado do menu
          />
        </div>
      </nav>

      {/* Esta div aparece ou desaparece com base no estado do menu */}
      <div
        className={`transition-all  duration-500 ease-in-out  mt-16 p-4 overflow-hidden ${menuOpen ? 'md:max-h-screen' : 'max-h-0 opacity-0'}`}
      >
        <ul className='flex flex-row max-h-full gap-2'><li className='text-gray-400 cursor-pointer'><Link href='/catalog'>princcesa 1</Link></li><li className='text-gray-400 cursor-pointer'><Link href='/catalog'>princcesa 2</Link></li><li className='text-gray-400 cursor-pointer'><Link href='/catalog'>princcesa 3</Link></li></ul>
        {/* Aqui você pode colocar os conteúdos adicionais ou links do menu */}
      </div>
    </div>
  );
}

export default Navbar;
