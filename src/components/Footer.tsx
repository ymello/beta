import React from "react";

export function Footer() {
  return (
    <footer className="bg-zinc-50 text-center dark:bg-neutral-700 lg:text-left">
      <div className="bg-black/5 p-4 text-center text-surface dark:text-white">
        <a className="py-5">
          <img
            className="h-8 w-auto mx-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt=""
          />
        </a>
        © 2024 Copyright:
        <a href="https://tw-elements.com/">Teste beta</a>
      </div>
    </footer>
  );
}
