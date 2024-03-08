import Image from "next/image";
import React from "react";
import mark from "../../public/mark.svg";

export function Footer() {
  return (
    <footer className="bg-zinc-50 text-center dark:bg-neutral-700 lg:text-left">
      <div className="bg-black/5 p-4 text-center text-surface dark:text-white">
        <a className="py-5">
          <Image
            width={32}
            height={32}
            className="h-8 w-auto mx-auto"
            src={mark}
            alt=""
          />
        </a>
        © 2024 Copyright:
        <a href="https://tw-elements.com/">Teste beta</a>
      </div>
    </footer>
  );
}
