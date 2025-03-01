import { createContext, useContext, type ButtonHTMLAttributes, type PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

// TODO: Make this more flexible.
type ButtonVariant = "primary" | "LRT_AG" | "LRT_SP" | "MR_MR" | "LRT_KJ" | "MRT_KG" | "MRT_PY" | string;

interface ButtonContextValue {
    variant: ButtonVariant;
}

const ButtonContext = createContext<ButtonContextValue | null>(null);

interface ButtonRootProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
}

const ButtonRoot: React.FC<ButtonRootProps> = ({ children, variant = "primary", className, ...props }) => {
    return (
        <ButtonContext.Provider value={{ variant }}>
            <button
                className={twMerge(
                    "transition transition-color duration-250 ease-in-out rounded-md flex flex-row items-center justify-center px-4 py-2 bg-gradient-to-b disabled:bg-none disabled:[box-shadow:none]",
                    variant === "primary" && "from-steel-blue-600 to-steel-blue-700 border-steel-blue-800 hover:from-steel-blue-700 hover:to-steel-blue-800 hover:border-steel-blue-900 neomorphism-shadow-steel-blue-900 disabled:bg-steel-blue-950 disabled:text-steel-blue-700",
                    variant === "tangerine" && "bg-tangerine-500/60 hover:bg-tangerine-900 neomorphism-shadow-tangerine-900",
                    variant === "crimson" && "bg-crimson-500/60 hover:bg-crimson-900 neomorphism-shadow-crimson-900",
                    variant === "magenta" && "bg-magenta-500/60 hover:bg-magenta-900 neomorphism-shadow-magenta-900",
                    variant === "chartreuse" && "bg-chartreuse-500/60 hover:bg-chartreuse-900 neomorphism-shadow-chartreuse-900",
                    variant === "jade" && "bg-jade-500/60 hover:bg-jade-900 neomorphism-shadow-jade-900",
                    variant === "saffron" && "bg-saffron-500/60 hover:bg-saffron-900 neomorphism-shadow-saffron-900",
                    className,
                )}
                {...props}
            >
                {children}
            </button>
        </ButtonContext.Provider>
    );
};

interface ButtonIconProps {
    icon: React.ReactElement;
    className?: string;
}

const ButtonIcon: React.FC<ButtonIconProps> = ({ icon, className }) => {
    const context = useContext(ButtonContext);
    if (!context) {
        throw new Error("Button.Icon must be used within Button.Root");
    }

    return (
        <span className={className}>
            {icon}
        </span>
    );    
};

type ButtonTextProps = PropsWithChildren<{
    className?: string;
  }>

const ButtonText: React.FC<ButtonTextProps> = ({ children, className = '' }) => {
    const context = useContext(ButtonContext);
    if (!context) throw new Error('Button.Text must be used within Button.Root');
  
    return <span className={twMerge("font-semibold", className)}>{children}</span>;
  };

export const Button = {
    Root: ButtonRoot,
    Icon: ButtonIcon,
    Text: ButtonText,
};