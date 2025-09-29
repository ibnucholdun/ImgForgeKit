"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import React from "react";

const Footer = () => {
  const pathname = usePathname();
  const isVisibleFooter = pathname === "/";
  return (
    <>
      <footer
        className={clsx(
          "bg-gray-800 pt-16 pb-8 text-gray-300 dark:bg-black",
          !isVisibleFooter && "hidden",
        )}
      >
        <div className="container mx-auto px-6">
          <div className="mb-8 grid grid-cols-2 gap-8 md:grid-cols-5">
            <div>
              <h4 className="mb-4 font-semibold text-white">PRODUCT</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a className="hover:text-primary" href="#">
                    Home
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary" href="#">
                    Features
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary" href="#">
                    Pricing
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary" href="#">
                    Tools
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary" href="#">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-white">RESOURCES</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a className="hover:text-primary" href="#">
                    ImgForgeKit
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-white">LEGAL</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a className="hover:text-primary" href="#">
                    Privacy policy
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary" href="#">
                    Terms &amp; conditions
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary" href="#">
                    Cookies
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-white">COMPANY</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a className="hover:text-primary" href="#">
                    About us
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary" href="#">
                    Blog
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary" href="#">
                    Press
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 flex flex-col items-center justify-between border-t border-gray-700 pt-8 text-sm md:flex-row">
            <div className="mb-4 flex items-center space-x-4 md:mb-0">
              <div className="flex space-x-4 text-gray-400">
                <a className="hover:text-white" href="#">
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      clipRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </a>
                <a className="hover:text-white" href="#">
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a className="hover:text-white" href="#">
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.477 2 12.011c0 4.432 2.865 8.18 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12.011C22 6.477 17.523 2 12 2z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
            <div className="text-gray-400">
              © ImgForgeKit 2025 - Your Image Editor
            </div>
          </div>
        </div>
      </footer>
      {!isVisibleFooter && (
        <footer className="bg-surface-light dark:bg-surface-dark py-4">
          <div className="container mx-auto px-4 text-center text-sm text-gray-500 dark:text-gray-400">
            © ImgForgeKit 2025 ® - Your Image Editor
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
