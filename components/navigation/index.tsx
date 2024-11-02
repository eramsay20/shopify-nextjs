// baseline source: https://tailwindui.com/components/marketing/sections/heroes

"use client";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const cartSVG = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7 18C6.44771 18 6 18.4477 6 19C6 19.5523 6.44771 20 7 20C7.55228 20 8 19.5523 8 19C8 18.4477 7.55228 18 7 18ZM2 2H4L6.68 12.39C6.83717 13.0536 7.39452 13.5115 8.06573 13.5615L17.06 14.34C17.6062 14.3826 18.1065 14.0758 18.34 13.59L21.78 6.49C22.051 5.93794 21.6716 5.29528 21.06 5.29H5.21L4.27 2H2ZM17 18C16.4477 18 16 18.4477 16 19C16 19.5523 16.4477 20 17 20C17.5523 20 18 19.5523 18 19C18 18.4477 17.5523 18 17 18Z"
      fill="currentColor"
    />
  </svg>
);

const logoSVG = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* <!-- Bag Body --> */}
    <rect
      x="3"
      y="7"
      width="18"
      height="14"
      rx="2"
      ry="2"
      fill="#8B4513"
    />
    {/* <!-- Bag Handles --> */}
    <path
      d="M7 7V4C7 2.89543 7.89543 2 9 2H15C16.1046 2 17 2.89543 17 4V7"
      stroke="black"
      stroke-width="2"
      stroke-linecap="round"
    />
    {/* <!-- Bag Details --> */}
    <line
      x1="12"
      y1="11"
      x2="12"
      y2="16"
      stroke="black"
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
)

const navigation = [
  { name: "SHOP ALL PRODUCTS", href: "#" },
  // { name: "Features", href: "#" },
  // { name: "Marketplace", href: "#" },
  // { name: "COMPANY", href: "#" },
];

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-6 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="flex -m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              {logoSVG}
              <span className="ml-2 text-gray-900 font-bold uppercase">
                Ram&apos;s Leather Supply
              </span>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a
              href="/checkout"
              className="flex text-sm font-semibold leading-6 text-gray-900"
            >
              <div className="pr-2">{cartSVG}</div>
              Cart
              {/* <span aria-hidden="true">&rarr;</span> */}
            </a>
          </div>
        </nav>
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  alt=""
                  src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                  className="h-8 w-auto"
                />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </div>
  );
}
