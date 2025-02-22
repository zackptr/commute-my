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
                    "transition transition-color duration-200 ease-in-out rounded-md flex flex-row items-center justify-center px-4 py-2 bg-gradient-to-b disabled:bg-none disabled:[box-shadow:none]",
                    variant === "primary" && "from-steel-blue-600 to-steel-blue-700  border-steel-blue-800 hover:from-steel-blue-700 hover:to-steel-blue-800 hover:border-steel-blue-900 neomorphism-shadow-steel-blue-900 disabled:bg-steel-blue-950 disabled:text-steel-blue-700",
                    variant === "LRT_AG" && "bg-lrt-ampang/60 neomorphism-shadow-lrt-ampang-2",
                    variant === "LRT_SP" && "bg-lrt-sri-petaling/60 neomorphism-shadow-lrt-sri-petaling-2",
                    variant === "LRT_KJ" && "bg-lrt-kelana-jaya/60 neomorphism-shadow-lrt-kelana-jaya-2",
                    variant === "MR_MR" && "bg-monorail-kl/60 neomorphism-shadow-monorail-kl-2",
                    variant === "MRT_KG" && "bg-mrt-kajang/60 neomorphism-shadow-mrt-kajang-2",
                    variant === "MRT_PY" && "bg-mrt-putrajaya/60 neomorphism-shadow-mrt-putrajaya-2",
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