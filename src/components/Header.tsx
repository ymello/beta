import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface HeaderProps {
  loggedIn: boolean;
}

export function Header({ loggedIn }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleChangeMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Sua Empresa</span>
            <Image
              height={32}
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={handleChangeMenu}
            aria-expanded={isOpen ? "true" : "false"}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Abrir menu principal</span>
            <svg
              className={`h-6 w-6 ${isOpen ? "hidden" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
            <svg
              className={`h-6 w-6 ${isOpen ? "" : "hidden"}`}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className={`hidden lg:flex lg:gap-x-12 ${isOpen ? "hidden" : ""}`}>
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Recursos
          </a>
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Marketplace
          </a>
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Empresa
          </a>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a
            onClick={loggedIn ? handleLogout : undefined}
            className="cursor-pointer text-sm font-semibold leading-6 text-gray-900"
          >
            {loggedIn ? "Sair" : "Entrar"}{" "}
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>
      <div
        className={`lg:hidden ${isOpen ? "" : "hidden"}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 z-10" onClick={handleChangeMenu}></div>
        <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Sua Empresa</span>
              <Image
                height={32}
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
            <button
              type="button"
              onClick={handleChangeMenu}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Fechar menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Recursos
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Marketplace
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Empresa
                </a>
              </div>
              <div className="py-6">
                <a
                  onClick={loggedIn ? handleLogout : undefined}
                  className="cursor-pointer -mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  {loggedIn ? "Sair" : "Entrar"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
