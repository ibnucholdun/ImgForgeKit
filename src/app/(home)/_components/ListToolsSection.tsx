import { useRouter } from "next/navigation";
import React, { useMemo } from "react";
import { listTools } from "~/data/data";

const ListToolsSection = ({ active }: { active: string }) => {
  const filtered = useMemo(() => {
    if (active === "All") return listTools;
    return listTools.filter((t) => t.category?.includes(active));
  }, [active]);

  return (
    <section className="container mx-auto px-6 pb-20">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
        {filtered.map(
          (tool: {
            id: number;
            name: string;
            route: string;
            icon: React.ComponentType<{ className?: string }>;
            description: string;
            category: string;
          }) => (
            <CardTool
              key={tool.id}
              title={tool.name}
              description={tool.description}
              icon={tool.icon}
              route={tool.route}
            />
          ),
        )}
      </div>
    </section>
  );
};

const CardTool = ({
  title,
  description,
  icon: Icon,
  route,
}: {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  route: string;
}) => {
  const router = useRouter();
  return (
    <button
      type="button"
      className="bg-surface-light dark:bg-surface-dark cursor-pointer rounded-lg p-6 text-left shadow-md transition-shadow duration-300 hover:shadow-xl"
      aria-label={title}
      onClick={() => router.push(`/${route}`)}
    >
      <Icon className="text-primary mb-4 text-3xl" />
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
        {description}
      </p>
    </button>
  );
};

export default ListToolsSection;
