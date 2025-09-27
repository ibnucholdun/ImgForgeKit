import { Cloud, History, Settings2 } from "lucide-react";
import React from "react";

interface WorkflowList {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const workflowList: WorkflowList[] = [
  {
    id: 1,
    icon: Settings2,
    title: "Batch Processing Power",
    description:
      "Edit multiple images at once. Compress, resize, or watermark entire photo batches with a single click, saving you valuable time.",
  },
  {
    id: 2,
    icon: Cloud,
    title: "Seamless Cloud Integration",
    description:
      "Connect your Google Drive or Dropbox to access your photos from anywhere. Edit and save directly to your cloud storage.",
  },
  {
    id: 3,
    icon: History,
    title: "Full Project History",
    description:
      "Never lose an edit. Access your complete editing history for each project, allowing you to revert or reuse previous versions effortlessly.",
  },
];

const WorkflowSection = () => {
  return (
    <section className="bg-background-light dark:bg-surface-dark py-20">
      <div className="container mx-auto px-6">
        <h2 className="mb-12 text-center text-4xl font-bold">
          Streamline Your Workflow
        </h2>
        <div className="grid gap-8 text-center md:grid-cols-3">
          {workflowList.map((workflow) => (
            <WorkflowCard
              key={workflow.id}
              title={workflow.title}
              description={workflow.description}
              icon={workflow.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const WorkflowCard = ({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}) => {
  return (
    <div className="bg-surface-light dark:bg-background-dark rounded-xl p-8 transition-shadow duration-300 hover:shadow-xl">
      <div className="flex justify-center">
        <Icon className="text-primary mb-4 h-12 w-12 text-5xl" />
      </div>
      <h3 className="mb-3 text-2xl font-semibold">{title}</h3>
      <p className="text-text-secondary-light dark:text-text-secondary-dark">
        {description}
      </p>
    </div>
  );
};

export default WorkflowSection;
