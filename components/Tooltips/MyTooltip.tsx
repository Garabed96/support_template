import { InputProps } from "@chakra-ui/input";
import { Tooltip } from "@chakra-ui/tooltip";
import React, { memo } from "react";

const MyTooltip: React.FC<
  {
    label: string;
    message: string;
    disabled?: boolean;
    children: React.ReactNode;
  } & InputProps
> = memo(({ label, message, children, disabled, ...props }) => (
  <Tooltip
    px={3}
    py={2}
    fontSize="xs"
    rounded="md"
    aria-label={label}
    label={message}
    arrowSize={7}
    isDisabled={disabled}
    hasArrow
    {...props}
  >
    {children}
  </Tooltip>
));

export default MyTooltip;
