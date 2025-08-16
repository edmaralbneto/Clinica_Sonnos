"use client";

import Image from "next/image";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    {
      label: "Home",
      href: "https://clinicasonnos.com.br/site/",
    },
    {
      label: "Quem Somos",
      href: "https://clinicasonnos.com.br/quem-somos/",
    },
    {
      label: "Serviços",
      isDropdown: true,
      subItems: [
        {
          label: "Polissonografia - Exame de Diagnóstico",
          description: "Exame de Diagnóstico para os Distúrbios Respiratórios do Sono",
          href: "https://clinicasonnos.com.br/servico/polissonografia/",
        },
        {
          label: "Tratamento para Distúrbios Respiratórios",
          description: "Tratamento para Distúrbios Respiratórios do Sono",
          href: "https://clinicasonnos.com.br/servico/apneia-do-sono-e-cpap/",
        },
        {
          label: "Avaliação e Treinamento Muscular",
          description: "Avaliação e Treinamento Muscular Respiratório",
          href: "https://clinicasonnos.com.br/servico/avaliacao-e-treinamento/",
        },
        {
          label: "Clube Sonnos",
          description: "Programa especial para pacientes",
          href: "https://clinicasonnos.com.br/servico/clube-sonnos/",
        },
      ],
    },
    {
      label: "Depoimentos",
      href: "https://clinicasonnos.com.br/depoimentos/",
    },
  ];

  return (
  <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-yellow-500/20 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="https://clinicasonnos.com.br/site/" className="flex items-center">
              <Image
                src="/sonnos1.png"
                alt="Clínica Sonnos"
                width={140}
                height={56}
                className="h-10 w-auto object-contain filter brightness-110"
                priority
              />
            </a>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <div key={index} className="relative group">
                {item.isDropdown ? (
                  <div>
                    <button className="text-black hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center">
                      {item.label}
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {/* Dropdown */}
                    <div className="absolute left-0 mt-2 w-80 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <div className="bg-white rounded-lg border border-yellow-500/30 shadow-2xl py-2">
                        {item.subItems?.map((subItem, subIndex) => (
                          <a
                            key={subIndex}
                            href={subItem.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-4 py-3 hover:bg-yellow-500/10 transition-colors duration-200 group/item"
                          >
                            <div className="text-black group-hover/item:text-yellow-500 font-medium text-sm">
                              {subItem.label}
                            </div>
                            <div className="text-gray-500 text-xs mt-1">
                              {subItem.description}
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-black hover:text-yellow-500 p-2 rounded-md transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white rounded-lg border border-yellow-500/20 mt-2">
              {menuItems.map((item, index) => (
                <div key={index}>
                  {item.isDropdown ? (
                    <div>
                      <div className="text-black px-3 py-2 text-sm font-medium border-b border-yellow-500/20">
                        {item.label}
                      </div>
                      {item.subItems?.map((subItem, subIndex) => (
                        <a
                          key={subIndex}
                          href={subItem.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block pl-6 pr-3 py-2 text-gray-700 hover:text-yellow-400 text-sm transition-colors duration-200"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subItem.label}
                        </a>
                      ))}
                    </div>
                  ) : (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-black hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
