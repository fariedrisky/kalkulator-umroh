import React from "react";
import { LoaderCircle } from "lucide-react";

export default function LoadingSpinner({
	color = "text-gray-500",
}: {
	color?: string;
}) {
	return (
		<div className="flex items-center justify-center">
			<LoaderCircle className={`animate-spin ${color}`} />
		</div>
	);
}
