import React from "react";

interface SeparatorProps {
	orientation?: "horizontal" | "vertical";
	className?: string;
	decorative?: boolean;
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
	(
		{
			orientation = "horizontal",
			className = "",
			decorative = true,
			...props
		},
		ref
	) => {
		return (
			<div
				ref={ref}
				role={decorative ? "none" : "separator"}
				aria-orientation={decorative ? undefined : orientation}
				className={`shrink-0 bg-gray-200 ${
					orientation === "horizontal"
						? "h-[1px] w-full"
						: "h-full w-[1px]"
				} ${className} `}
				{...props}
			/>
		);
	}
);

Separator.displayName = "Separator";

export { Separator };
