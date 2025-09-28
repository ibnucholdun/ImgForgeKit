"use client";

import { useState } from "react";
import AdvantagesSection from "./_components/AdvantagesSection";
import HeroSection from "./_components/HeroSection";
import ListToolsSection from "./_components/ListToolsSection";
import PremiumSection from "./_components/PremiumSection";
import WorkflowSection from "./_components/WorkflowSection";

export default function HomePage() {
  const [active, setActive] = useState<string>("All");
  return (
    <main>
      <HeroSection active={active} onChange={setActive} />
      <ListToolsSection active={active} />
      <WorkflowSection />
      <PremiumSection />
      <AdvantagesSection />
    </main>
  );
}
