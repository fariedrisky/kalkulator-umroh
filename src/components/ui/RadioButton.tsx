import { FaCircle } from "react-icons/fa";

interface RadioButtonProps {
	id: string;
	name: string;
	value: string | number;
	label: string;
	checked?: boolean;
	disabled?: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	className?: string;
}

export default function RadioButton({
	id,
	name,
	value,
	label,
	checked,
	disabled,
	onChange,
	className = "",
}: RadioButtonProps) {
	return (
		<>
			<style>
				{`
          .radio-input:not(:checked):not(:active):hover {
            background-color: #f9fafb;;
          }
        `}
			</style>
			<div className={`relative flex items-center gap-2 ${className}`}>
				<div className="relative flex items-center justify-center">
					<input
						type="radio"
						id={id}
						name={name}
						value={value}
						checked={checked}
						disabled={disabled}
						onChange={onChange}
						className="radio-input peer relative h-[18px] w-[18px] shrink-0 appearance-none rounded-full border border-gray-300 bg-white checked:border-blue-500 checked:bg-white focus:border-blue-500 active:border-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 active:scale-90 transition-all duration-150"
					/>
					<div className="pointer-events-none absolute inset-0 flex items-center justify-center text-blue-500">
						<FaCircle
							className={`h-[10px] w-[10px] transition-all duration-200 
                ${checked ? "opacity-100 scale-100" : "opacity-0 scale-0"} 
                origin-center`}
						/>
					</div>
				</div>
				<label
					htmlFor={id}
					className={`text-sm ${
						disabled
							? "cursor-not-allowed text-gray-400"
							: "cursor-pointer text-gray-500"
					} pointer-events-none`}
				>
					{label}
				</label>
			</div>
		</>
	);
}
