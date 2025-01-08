import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

interface SelectOption {
	value: string;
	label: string;
	disabled?: boolean;
}

interface SelectProps {
	options: SelectOption[];
	value?: string;
	onChange?: (value: string) => void;
	placeholder?: string;
	disabled?: boolean;
	className?: string;
}

export default function Select({
	options,
	value,
	onChange,
	placeholder = "Select an option",
	disabled = false,
	className = "",
}: SelectProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedValue, setSelectedValue] = useState(value);
	const selectRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				selectRef.current &&
				!selectRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	useEffect(() => {
		setSelectedValue(value);
	}, [value]);

	const handleSelect = (option: SelectOption) => {
		if (option.disabled) return;
		setSelectedValue(option.value);
		onChange?.(option.value);
		setIsOpen(false);
	};

	const selectedOption = options.find((opt) => opt.value === selectedValue);

	return (
		<div
			ref={selectRef}
			className={`text-primary relative w-full ${className}`}
		>
			<button
				onClick={() => !disabled && setIsOpen(!isOpen)}
				className={`flex hover:bg-gray-50 h-9 w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm  ${
					disabled
						? "cursor-not-allowed opacity-50"
						: "hover:border-gray-300"
				} focus:outline-none  transition-all duration-200  focus:ring-1 focus:ring-blue-500`}
				disabled={disabled}
			>
				<span className="text-left">
					{selectedOption ? selectedOption.label : placeholder}
				</span>
				<ChevronDown
					className={`h-4 w-4 transition-transform duration-200 ${
						isOpen ? "rotate-180" : "rotate-0"
					}`}
				/>
			</button>

			<div
				className={`absolute left-0 right-0 z-50 mt-1 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg transition-all duration-200 origin-top
          ${
				isOpen
					? "opacity-100 scale-y-100 translate-y-0"
					: "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
			}`}
			>
				{options.map((option) => (
					<button
						key={option.value}
						onClick={() => handleSelect(option)}
						disabled={option.disabled}
						className={`flex w-full items-center justify-between px-3 py-2 text-sm transition-colors
              ${
					option.disabled
						? "cursor-not-allowed opacity-50"
						: "cursor-pointer hover:bg-gray-50"
				} 
              ${
					selectedValue === option.value
						? "bg-blue-50 text-blue-600"
						: "text-gray-900"
				} focus:bg-gray-50 focus:outline-none`}
					>
						<span className="text-left ml-3">{option.label}</span>
						{selectedValue === option.value && (
							<Check
								className={`ml-2 h-4 w-4 text-blue-600 transition-all duration-200 
                ${
					selectedValue === option.value
						? "opacity-100 scale-100"
						: "opacity-0 scale-0"
				}`}
							/>
						)}
					</button>
				))}
			</div>
		</div>
	);
}
