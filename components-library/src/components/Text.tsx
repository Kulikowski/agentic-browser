import React from 'react';

export const Text = React.forwardRef<
  HTMLSpanElement,
  {
    content?: string;
    children?: React.ReactNode;
  }
>(({ content, children, ...props }, ref) => {
  return (
    <span ref={ref} {...props}>
      {content || children}
    </span>
  );
});
Text.displayName = 'g-text';