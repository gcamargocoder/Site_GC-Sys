import { cn } from "@/lib/utils";

type Props = React.ComponentPropsWithoutRef<"div"> & { as?: "div" | "section" };

export function Container({ className, as: Tag = "div", ...props }: Props) {
  return <Tag className={cn("container-x relative z-10", className)} {...props} />;
}
