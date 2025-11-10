import { GithubIcon } from "lucide-react";
import { Button } from "./ui/button";

export const GitHub = () => (
  <Button asChild size="icon" variant="outline">
    <a
      href="https://github.com/haydenbleasel/npm.bet"
      rel="noopener noreferrer"
      target="_blank"
    >
      <GithubIcon className="size-4" />
      <span className="sr-only">GitHub</span>
    </a>
  </Button>
);
