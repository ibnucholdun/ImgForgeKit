import { Gem } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PremiumSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="bg-primary/10 dark:bg-primary/20 flex flex-col items-center justify-between gap-12 rounded-xl p-8 md:p-12 lg:flex-row lg:p-16">
          <div className="lg:w-1/2">
            <h2 className="text-text-light dark:text-text-dark mb-4 text-4xl font-bold">
              Unlock Your Creative Potential with Premium
            </h2>
            <p className="text-text-secondary-light dark:text-text-secondary-dark mb-8 text-lg">
              Elevate your editing game with exclusive features. Go Premium for
              unlimited access, higher processing priority, and advanced
              AI-powered tools that will transform your images.
            </p>
            <Link
              className="bg-primary inline-flex items-center space-x-2 rounded-lg px-6 py-3 font-bold text-white transition duration-300 hover:bg-red-700"
              href="/pricing"
            >
              <Gem className="h-6 w-6" />
              <span>Upgrade to Premium</span>
            </Link>
          </div>
          <div className="mt-8 flex justify-center lg:mt-0 lg:w-1/2">
            <Image
              alt="Premium features collage"
              className="rounded-lg shadow-xl"
              src={"/premium-section.png"}
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumSection;
