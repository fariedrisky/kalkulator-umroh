import React, { createContext, useContext } from "react";
import { FaCircle } from "react-icons/fa";

// Context for RadioGroup
interface RadioGroupContextType {
	name: string;
	value?: string | number;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	disabled?: boolean;
	groupId?: string;
}

const RadioGroupContext = createContext<RadioGroupContextType | undefined>(
	undefined
);

// RadioGroup Component
interface RadioGroupProps {
	id?: string;
	name: string;
	value?: string | number;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	disabled?: boolean;
	children: React.ReactNode;
	className?: string;
}

export function RadioGroup({
	id,
	name,
	value,
	onChange,
	disabled,
	children,
	className = "",
}: RadioGroupProps) {
	return (
		<RadioGroupContext.Provider
			value={{ name, value, onChange, disabled, groupId: id }}
		>
			<div id={id} className={`flex flex-row gap-5 ${className}`}>
				{children}
			</div>
		</RadioGroupContext.Provider>
	);
}

// RadioGroupItem Component
interface RadioGroupItemProps {
	id?: string;
	value: string | number;
	label: string;
	disabled?: boolean;
	className?: string;
}

export function RadioGroupItem({
	id: customId,
	value,
	label,
	disabled: itemDisabled,
	className = "",
}: RadioGroupItemProps) {
	const group = useContext(RadioGroupContext);
	if (!group) {
		throw new Error("RadioGroupItem must be used within a RadioGroup");
	}

	const id =
		customId ||
		`${group.groupId ? `${group.groupId}-` : ""}${group.name}-${value}`;
	const isDisabled = itemDisabled || group.disabled;

	return (
		<>
			<style>
				{`
          .radio-input:not(:checked):not(:active):hover {
            background-color: #f9fafb;
          }
        `}
			</style>
			<div className={`relative flex items-center gap-2 ${className}`}>
				<div className="relative flex items-center justify-center">
					<input
						type="radio"
						id={id}
						name={group.name}
						value={value}
						checked={group.value === value}
						disabled={isDisabled}
						onChange={group.onChange}
						className="radio-input group peer relative h-[18px] w-[18px] shrink-0 appearance-none rounded-full border border-gray-300 bg-white checked:border-blue-500 checked:bg-white focus:border-blue-500 active:border-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 active:scale-90 transition-all duration-150"
					/>
					<div className="pointer-events-none absolute inset-0 flex items-center justify-center text-blue-500">
						<FaCircle
							className={`h-[10px] w-[10px] transition-all duration-200 
                ${
					group.value === value
						? "opacity-100 scale-100"
						: "opacity-0 scale-0"
				} 
                origin-center`}
						/>
					</div>
				</div>
				<label
					htmlFor={id}
					className={`text-sm ${
						isDisabled
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
