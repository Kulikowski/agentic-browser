import React from 'react';

export const Button = React.forwardRef<
  HTMLButtonElement,
  {
    label?: string;
    onPress?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
    onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
    children?: React.ReactNode;
  }
>(({ label, onPress, onClick, children, ...props }, ref) => {
  // Handle both onPress (from remote press event) and onClick (standard React)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Call onPress if it exists (from remote press event)
    if (onPress) {
      onPress();
    }

    // Call onClick if it exists (standard React handler)
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <button
      ref={ref}
      onClick={handleClick}
      style={{
        padding: '8px 16px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
      {...props}
    >
      {label || children}
    </button>
  );
});
Button.displayName = 'g-button';