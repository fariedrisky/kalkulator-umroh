import { IoMdCheckmark } from "react-icons/io";

interface CheckboxProps {
	id?: string;
	name: string;
	label?: string;
	checked?: boolean;
	disabled?: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	required?: boolean;
}

export default function Checkbox({
	id,
	name,
	label,
	checked,
	disabled,
	onChange,
	required,
}: CheckboxProps) {
	return (
		<>
			<div className="flex items-center gap-2">
				<div className="relative flex items-center justify-center">
					<style>
						{`
          .checkbox-input:not(:checked):not(:active):hover {
            background-color: #f9fafb;
          }
        `}
					</style>

					<input
						type="checkbox"
						id={id}
						name={name}
						checked={checked}
						disabled={disabled}
						onChange={onChange}
						required={required}
						className="checkbox-input peer relative h-[18px] w-[18px] shrink-0 appearance-none rounded-sm border border-gray-300 bg-white checked:border-blue-500 checked:bg-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 active:scale-90 transition-all duration-150"
					/>
					<div className="pointer-events-none absolute inset-0 flex items-center justify-center text-white">
						<IoMdCheckmark
							className={`h-[17px] w-[17px] transition-all duration-200 
              ${checked ? "opacity-100 scale-100" : "opacity-0 scale-0"} 
              origin-center`}
						/>
					</div>
				</div>

				{/* Label with pointer-events-none */}
				<label
					htmlFor={id}
					className={`text-sm ${
						disabled ? "text-gray-400" : "text-gray-500"
					} pointer-events-none`}
				>
					{label}
				</label>
			</div>
		</>
	);
}
