// src/components/ui/Button.jsx
import React from 'react';
import clsx from 'clsx';

/**
 * Button component
 * @param {Object} props
 * @param {"primary"|"secondary"|"destructive"|"outline"|"ghost"} props.variant - Button style
 * @param {"sm"|"md"|"lg"} props.size - Button size
 * @param {string} props.className - Additional class names
 * @param {React.ReactNode} props.children - Button content
 * @param {React.ButtonHTMLAttributes<HTMLButtonElement>} props.rest - Other button props
 */
const Button = ({ variant = 'primary', size = 'md', className, children, ...rest }) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

    const variantClasses = {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-border text-foreground hover:bg-accent hover:text-accent-foreground',
        ghost: 'bg-transparent hover:bg-accent hover:text-accent-foreground',
    };

    const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-md',
        lg: 'px-6 py-3 text-lg',
    };

    return (
        <button className={clsx(baseClasses, variantClasses[variant], sizeClasses[size], className)} {...rest}>
            {children}
        </button>
    );
};

export default Button;
