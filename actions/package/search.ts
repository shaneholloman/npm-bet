"use server";

export type NpmPackage = {
  package: {
    name: string;
    version: string;
    description: string;
    links: {
      npm: string;
    };
  };
  score: {
    final: number;
  };
};

export type NpmSearchResponse = {
  objects: NpmPackage[];
  total: number;
};

export const searchPackages = async (
  query: string
): Promise<NpmSearchResponse> => {
  const response = await fetch(
    `https://registry.npmjs.com/-/v1/search?text=${encodeURIComponent(query)}&size=10`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch packages");
  }

  return response.json();
};
