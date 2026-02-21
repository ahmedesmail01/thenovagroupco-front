import { createLazyFileRoute } from "@tanstack/react-router";
import { HeroSection } from "../components/sections/HeroSection";
import { FocusSection } from "../components/sections/FocusSection";
import {
  StorySection,
  PackagesSection,
  EventsSection,
} from "../components/sections/OtherSections";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <FocusSection />
      <StorySection />
      <PackagesSection />
      <EventsSection />
    </div>
  );
}
