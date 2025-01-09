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
		<div className="flex items-center gap-2">
			<div className="relative flex items-center justify-center">
				<style>
					{`
			  .checkbox-input:not(:checked):not(:active):hover {
				background-color: #f9fafb;
			  }
			  
			  .checkmark-path {
				stroke-dasharray: 23; /* Ditambah karena path lebih panjang */
				stroke-dashoffset: 23; /* Disesuaikan dengan stroke-dasharray */
				transition: stroke-dashoffset 250ms ease-in-out;
			  }
			  
			  .checkbox-input:checked + div .checkmark-path {
				stroke-dashoffset: 0;
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
					className="checkbox-input peer relative h-[18px] w-[18px] shrink-0 appearance-none rounded-sm border border-gray-300 bg-white 
			  checked:border-accent checked:bg-accent 
			  focus:outline-none focus:ring-1 focus:ring-accent/20
			  disabled:cursor-not-allowed disabled:opacity-50 
			  active:scale-95 transition-all duration-150"
				/>
				<div className="pointer-events-none absolute inset-0 flex items-center justify-center text-white">
					<svg
						viewBox="0 0 24 24"
						className="h-[14px] w-[14px]"
						fill="none"
						stroke="currentColor"
						strokeWidth="3"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path
							d="M4 12L9 17L20 5" /* Dimodifikasi untuk garis kanan yang lebih panjang */
							className={`checkmark-path ${
								checked ? "opacity-100" : "opacity-0"
							}`}
						/>
					</svg>
				</div>
			</div>

			{label && (
				<label
					htmlFor={id}
					className={`select-none text-sm ${
						disabled ? "text-gray-400" : "text-gray-500"
					}`}
				>
					{label}
				</label>
			)}
		</div>
	);
}
