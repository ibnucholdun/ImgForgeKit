import { Gauge, Headphones, ShieldCheck } from "lucide-react";
import React from "react";

interface AdvantageList {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const advantagesData: AdvantageList[] = [
  {
    id: 1,
    icon: ShieldCheck,
    title: "Bank-Level Security",
    description:
      "our files are encrypted and automatically deleted from our servers after 2 hours. Your privacy is our priority.",
  },
  {
    id: 2,
    icon: Gauge,
    title: "Optimized for Speed",
    description:
      "Our tools are built for performance. Edit and download your images in seconds, no matter the file size.",
  },
  {
    id: 3,
    icon: Headphones,
    title: "Dedicated Support",
    description:
      "Have a question? Our customer support team is here to help you get the most out of our tools.",
  },
];
const AdvantagesSection = () => {
  return (
    <section className="bg-surface-light dark:bg-surface-dark py-20 text-center">
      <div className="container mx-auto px-6">
        <h2 className="mb-4 text-4xl font-bold">
          Simple, Powerful, and Reliable
        </h2>
        <p className="text-text-secondary-light dark:text-text-secondary-dark mx-auto mb-12 max-w-4xl text-lg">
          Millions trust ImgForgeKit for its intuitive interface and robust
          performance. We&apos;re committed to providing a secure and
          user-friendly platform for all your image editing needs.
        </p>
        <div className="grid gap-8 md:grid-cols-3">
          {advantagesData.map((advantage) => (
            <AdvantageCard
              key={advantage.id}
              icon={advantage.icon}
              title={advantage.title}
              description={advantage.description}
            />
          ))}
          {/* <div className="flex flex-col items-center">
            <div className="bg-primary/10 mb-4 rounded-full p-4">
              <span className="material-icons-outlined text-primary text-4xl">
                security
              </span>
            </div>
            <h3 className="mb-2 text-xl font-semibold">Bank-Level Security</h3>
            <p className="text-text-secondary-light dark:text-text-secondary-dark">
              Your files are encrypted and automatically deleted from our
              servers after 2 hours. Your privacy is our priority.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-primary/10 mb-4 rounded-full p-4">
              <span className="material-icons-outlined text-primary text-4xl">
                speed
              </span>
            </div>
            <h3 className="mb-2 text-xl font-semibold">Optimized for Speed</h3>
            <p className="text-text-secondary-light dark:text-text-secondary-dark">
              Our tools are built for performance. Edit and download your images
              in seconds, no matter the file size.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-primary/10 mb-4 rounded-full p-4">
              <span className="material-icons-outlined text-primary text-4xl">
                support_agent
              </span>
            </div>
            <h3 className="mb-2 text-xl font-semibold">Dedicated Support</h3>
            <p className="text-text-secondary-light dark:text-text-secondary-dark">
              Have a question? Our customer support team is here to help you get
              the most out of our tools.
            </p>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;

const AdvantageCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-primary/10 mb-4 rounded-full p-4">
        <Icon className="text-primary h-9 w-9 text-4xl" />
      </div>
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-text-secondary-light dark:text-text-secondary-dark">
        {description}
      </p>
    </div>
  );
};
