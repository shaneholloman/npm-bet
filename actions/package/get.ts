"use server";

export type PackageData = {
  start: string;
  end: string;
  package: string;
  downloads: {
    downloads: number;
    day: string;
  }[];
};

export const getPackageData = async (
  packageName: string,
  timeRange: string
): Promise<PackageData> => {
  const response = await fetch(
    `https://api.npmjs.org/downloads/range/${timeRange}/${packageName}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch package data");
  }

  return response.json();
};
