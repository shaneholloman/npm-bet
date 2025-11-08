import type { Packument } from "@npm/types";
import { notFound } from "next/navigation";
import { ChartAreaInteractive } from "./chart";

type MainProps = {
  packageName?: string;
};

export const Main = async ({ packageName }: MainProps) => {
  if (!packageName) {
    return (
      <main className="overflow-hidden">
        <ChartAreaInteractive data={{} as Packument} />
      </main>
    );
  }

  const response = await fetch(
    `https://api.npmjs.org/downloads/range/last-year/${packageName}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  console.log(response, "resp");

  if (!response.ok) {
    notFound();
  }

  const packageData = (await response.json()) as {
    start: string;
    end: string;
    package: string;
    downloads: {
      downloads: number;
      day: string;
    }[];
  };

  return (
    <main className="overflow-hidden">
      <ChartAreaInteractive data={packageData} />
    </main>
  );
};
