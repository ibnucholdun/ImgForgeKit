import clsx from "clsx";
import React from "react";

type HeroSectionProps = {
  active: string;
  onChange: (val: string) => void;
};

const HeroSection: React.FC<HeroSectionProps> = ({ active, onChange }) => {
  const nav = ["All", "Optimize", "Create", "Edit", "Convert", "Security"];

  return (
    <section className="py-20 text-center">
      <div className="container mx-auto px-6">
        <h1 className="text-text-light dark:text-text-dark mb-4 text-4xl font-bold md:text-6xl">
          Every tool you could want to edit images in bulk
        </h1>
        <p className="text-text-secondary-light dark:text-text-secondary-dark mx-auto max-w-3xl text-lg">
          Your online photo editor is here and forever free!
        </p>
        <div className="bg-background-light dark:bg-surface-dark mx-auto mt-8 flex max-w-sm flex-wrap justify-center space-x-1 rounded-lg p-1 md:flex-nowrap">
          {nav.map((item) => {
            const isActive = active === item;
            return (
              <button
                key={item}
                role="tab"
                aria-selected={isActive}
                onClick={() => onChange(item)}
                className={clsx(
                  "text-text-secondary-light dark:text-text-secondary-dark w-full rounded-md px-4 py-2 text-sm font-semibold hover:bg-gray-200 dark:hover:bg-gray-700",
                  isActive && "bg-primary text-white",
                )}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
