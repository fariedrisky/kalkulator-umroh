export default function AnimatedWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div
			className="mt-4 transition-all duration-300 ease-in-out 
            animate-in fade-in slide-in-from-top-4 
            data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:slide-out-to-top-4"
		>
			{children}
		</div>
	);
}
