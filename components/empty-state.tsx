import { LineChartIcon } from "lucide-react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { usePackages } from "@/providers/filters";
import { Badge } from "./ui/badge";

const examples = [
  {
    label: "Next.js vs Vue.js",
    packages: ["next.js", "vue.js"],
  },
  {
    label: "React vs Angular",
    packages: ["react", "@angular/core"],
  },
  {
    label: "Express vs Hono",
    packages: ["express", "hono"],
  },
  {
    label: "Tailwind CSS vs Bootstrap",
    packages: ["tailwindcss", "bootstrap"],
  },
  {
    label: "ESLint vs Biome vs Oxlint",
    packages: ["eslint", "@biomejs/biome", "oxlint"],
  },
  {
    label: "Vite vs Webpack",
    packages: ["vite", "webpack"],
  },
  {
    label: "Jest vs Mocha vs Vitest",
    packages: ["jest", "mocha", "vitest"],
  },
];

export const EmptyState = () => {
  const [_packages, setPackages] = usePackages();

  return (
    <Empty className="size-full rounded-lg border border-solid bg-background">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <LineChartIcon />
        </EmptyMedia>
        <EmptyTitle>No packages selected</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t selected any packages yet. Get started by selecting a
          package or try one of the examples below.
        </EmptyDescription>
        <EmptyContent className="mt-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {examples.map((example) => (
              <button
                key={example.label}
                onClick={() => setPackages(example.packages)}
                type="button"
              >
                <Badge
                  className="cursor-pointer hover:bg-sidebar"
                  key={example.label}
                  variant="secondary"
                >
                  {example.label}
                </Badge>
              </button>
            ))}
          </div>
        </EmptyContent>
      </EmptyHeader>
    </Empty>
  );
};
