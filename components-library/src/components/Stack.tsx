import React from 'react';

export const Stack = React.forwardRef<
  HTMLDivElement,
  {
    direction?: string;
    spacing?: string;
    align?: string;
    justify?: string;
    children?: React.ReactNode;
  }
>(
  (
    {
      direction = 'vertical',
      spacing = '8',
      align = 'stretch',
      justify = 'flex-start',
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        style={{
          display: 'flex',
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
          gap: `${spacing}px`,
          alignItems: align,
          justifyContent: justify,
        }}
        {...props}
      >
        {children}
      </div>
    );
  },
);
Stack.displayName = 'g-stack';