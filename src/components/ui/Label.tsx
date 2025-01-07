import React from "react";
import { cn } from "@/lib/utils";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
	children: React.ReactNode;
	htmlFor?: string;
	required?: boolean;
	className?: string;
	optional?: boolean;
}

const Label: React.FC<LabelProps> = ({
	children,
	htmlFor,
	required,
	className,
	optional = false,
	...props
}) => {
	return (
		<label
			htmlFor={htmlFor}
			className={cn("block text-sm font-medium text-gray-700", className)}
			{...props}
		>
			{children}
			{required && <span className="ml-1 text-red-500">*</span>}
			{optional && <span className="ml-1 text-gray-400">(Optional)</span>}
		</label>
	);
};

export default Label;
