import { Button } from "./ui/button";
import GithubIcon from "@/assets/github-mark.svg";
import GithubIconDark from "@/assets/github-mark-white.svg";

export function Footer() {
  return (
    <div className="flex justify-between gap-2 mt-auto">
      {/* TODO: add background changer  */}
      <div></div>
      <div>
        <Button variant="ghost" size="icon" asChild>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/agn907/shigoto"
          >
            <img className="size-8 dark:hidden" src={GithubIcon} alt="Github" />
            <img
              className="size-8 hidden dark:block"
              src={GithubIconDark}
              alt="Github"
            />
          </a>
        </Button>
      </div>
    </div>
  );
}
