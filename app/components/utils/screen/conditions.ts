export const isMobile = (variant: string | undefined) =>
  !variant || variant === "sm" || variant === "md";
