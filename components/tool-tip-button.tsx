"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link"
  | null
  | undefined;

type ButtonSize = "default" | "sm" | "lg" | "icon";

interface ToolTipButtonProps {
  content: string;
  icon: React.ReactNode;
  onClick?: () => void;
  label?: string;
  buttonVariant?: ButtonVariant;
  buttonSize?: ButtonSize;
  buttonClassName?: string;
  delay?: number;
  disabled?: boolean;
  loading?: boolean;
  tooltipContent?: React.ReactNode;
}

export const ToolTipButton = ({
  content,
  icon,
  onClick,
  label,
  buttonVariant = "ghost",
  buttonSize = "icon",
  buttonClassName = "",
  delay = 0,
  disabled = false,
  loading = false,
  tooltipContent,
}: ToolTipButtonProps) => {
  return (
    <TooltipProvider delayDuration={delay}>
      <Tooltip>
        <TooltipTrigger
          asChild
          className={disabled ? "cursor-not-allowed" : "cursor-pointer"}
        >
          <Button
            size={buttonSize}
            variant={buttonVariant}
            disabled={disabled}
            className={buttonClassName}
            onClick={onClick}
          >
            {loading ? (
              <Loader className="min-w-4 min-h-4 animate-spin" />
            ) : (
              <>
                {icon}
                {label && <span className="ml-2">{label}</span>}
              </>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipContent || (loading? "Loading...":content)}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
