"use client";

import { PackageSearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";

type NpmPackage = {
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

type NpmSearchResponse = {
  objects: NpmPackage[];
  total: number;
};

const fetcher = async (url: string): Promise<NpmSearchResponse> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch packages");
  }
  return response.json();
};

export const PackageSearch = () => {
  const [value, setValue] = useState("");
  const router = useRouter();
  const { data, error } = useSWR<NpmSearchResponse>(
    value
      ? `https://registry.npmjs.com/-/v1/search?text=${encodeURIComponent(value)}&size=20`
      : null,
    fetcher,
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
    }
  );

  const handleSelect = (packageName: string) => {
    router.push(`/${packageName}`);
  };

  return (
    <div className="-translate-x-1/2 absolute bottom-4 left-1/2 w-full max-w-md">
      <Command className="w-full rounded-lg border **:data-[slot=command-input-wrapper]:border-none">
        <CommandList>
          {error && (
            <CommandEmpty>Failed to load packages. Try again.</CommandEmpty>
          )}
          {data && data.objects.length === 0 && (
            <CommandEmpty className="flex items-center gap-2 p-4 text-muted-foreground text-sm">
              <PackageSearchIcon className="size-3" /> No packages found.
            </CommandEmpty>
          )}
          {data && data.objects.length > 0 && (
            <CommandGroup>
              {data.objects.map((item) => (
                <CommandItem
                  key={item.package.name}
                  onSelect={() => handleSelect(item.package.name)}
                  value={item.package.name}
                >
                  <span className="shrink-0 truncate font-medium">
                    {item.package.name}
                  </span>
                  <span className="truncate text-muted-foreground text-xs">
                    {item.package.description}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
        <CommandInput
          onValueChange={setValue}
          placeholder="Search for a package"
          value={value}
        />
      </Command>
    </div>
  );
};
