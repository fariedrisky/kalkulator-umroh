import React, { useState, useRef, useEffect } from "react";
import {
	format,
	addMonths,
	subMonths,
	startOfMonth,
	endOfMonth,
	eachDayOfInterval,
	isSameMonth,
	isSameDay,
	isToday,
	setYear,
	setMonth,
	isBefore,
	isAfter,
	startOfDay,
	addDays,
	subDays,
} from "date-fns";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { id } from "date-fns/locale";
interface DatePickerBaseProps {
	label?: string;
	error?: string;
	value?: Date;
	onChange: (date: Date) => void;
	minDate?: Date;
	maxDate?: Date;
	disabledDates?: Date[];
	placeholder?: string;
	disabled?: boolean;
}

interface DatePickerProps
	extends DatePickerBaseProps,
		Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {}

type View = "days" | "months" | "years";

export default function DatePicker({
	label,
	error,
	value,
	onChange,
	minDate,
	maxDate,
	disabledDates = [],
	placeholder = "Pilih tanggal",
	className = "",
	disabled = false,
	...props
}: DatePickerProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [currentMonth, setCurrentMonth] = useState(value || new Date());
	const [view, setView] = useState<View>("days");
	const [slideDirection, setSlideDirection] = useState("");
	const datePickerRef = useRef<HTMLDivElement>(null);
	const yearStart = Math.floor(currentMonth.getFullYear() / 10) * 10 - 1;

	useEffect(() => {
		if (!isOpen) {
			// Reset slide direction when popup closes
			setSlideDirection("");
		}
	}, [isOpen]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				datePickerRef.current &&
				!datePickerRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
				setView("days");
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const nextMonth = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setSlideDirection("slide-left");
		setCurrentMonth(addMonths(currentMonth, 1));
	};

	const previousMonth = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setSlideDirection("slide-right");
		setCurrentMonth(subMonths(currentMonth, 1));
	};

	const nextYear = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setCurrentMonth(
			new Date(currentMonth.getFullYear() + 1, currentMonth.getMonth())
		);
	};

	const previousYear = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setCurrentMonth(
			new Date(currentMonth.getFullYear() - 1, currentMonth.getMonth())
		);
	};

	const nextDecade = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setCurrentMonth(
			new Date(currentMonth.getFullYear() + 10, currentMonth.getMonth())
		);
	};

	const previousDecade = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setCurrentMonth(
			new Date(currentMonth.getFullYear() - 10, currentMonth.getMonth())
		);
	};

	const getDaysInMonth = () => {
		const start = startOfMonth(currentMonth);
		const end = endOfMonth(currentMonth);
		const days = eachDayOfInterval({ start, end });

		const firstDay = startOfMonth(currentMonth);
		const prevDays = Array.from({ length: firstDay.getDay() }, (_, i) =>
			subDays(firstDay, i + 1)
		).reverse();

		const lastDay = endOfMonth(currentMonth);
		const nextDays = Array.from({ length: 6 - lastDay.getDay() }, (_, i) =>
			addDays(lastDay, i + 1)
		);

		return [...prevDays, ...days, ...nextDays];
	};

	const isDateDisabled = (date: Date) => {
		const startOfDayDate = startOfDay(date);

		if (minDate && isBefore(startOfDayDate, startOfDay(minDate))) {
			return true;
		}

		if (maxDate && isAfter(startOfDayDate, startOfDay(maxDate))) {
			return true;
		}

		return disabledDates.some((disabledDate) =>
			isSameDay(startOfDayDate, disabledDate)
		);
	};

	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"Mei",
		"Jun",
		"Jul",
		"Agu",
		"Sep",
		"Okt",
		"Nov",
		"Des",
	];

	const handleMonthSelect = (e: React.MouseEvent, monthIndex: number) => {
		setCurrentMonth(setMonth(currentMonth, monthIndex));
		setView("days");
	};

	const handleYearSelect = (e: React.MouseEvent, year: number) => {
		setCurrentMonth(setYear(currentMonth, year));
		setView("months");
	};

	const handleViewChange = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setView((currentView) => {
			if (currentView === "days") return "months";
			if (currentView === "months") return "years";
			return "years";
		});
	};

	const handleDaySelect = (day: Date) => {
		if (!isDateDisabled(day) && !disabled) {
			onChange(day);
			setIsOpen(false);
			setView("days");
		}
	};

	const renderDays = () => (
		<>
			<div className="mb-1 grid grid-cols-7 gap-0.5">
				{["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map(
					(day) => (
						<div
							key={day}
							className="text-center text-xs font-medium text-gray-500"
						>
							{day}
						</div>
					)
				)}
			</div>

			<div className="grid grid-cols-7 gap-0.5">
				{getDaysInMonth().map((day, index) => {
					const isSelected = value ? isSameDay(day, value) : false;
					const isCurrentMonth = isSameMonth(day, currentMonth);
					const isCurrentDay = isToday(day);
					const isDisabled = isDateDisabled(day);

					return (
						<button
							type="button"
							key={index}
							onClick={() => handleDaySelect(day)}
							disabled={isDisabled || disabled}
							className={`
					flex h-6 w-6 md:h-8 md:w-8 items-center justify-center rounded-md text-xs md:text-sm
					transition-all duration-200 ease-in-out
					${!isCurrentMonth ? "text-gray-300" : ""}
					${isSelected && !isDisabled ? "bg-accent text-white hover:bg-blue-600" : ""}
					${!isSelected && isCurrentMonth && !isDisabled ? "hover:bg-gray-100" : ""}
					${
						isCurrentDay && !isSelected && !isDisabled
							? "border border-accent text-accent"
							: ""
					}
					${
						isDisabled || disabled
							? "cursor-not-allowed text-gray-300 hover:bg-white"
							: "hover:scale-105"
					}
				  `}
						>
							{format(day, "d")}
						</button>
					);
				})}
			</div>
		</>
	);

	const renderMonths = () => (
		<div className="grid grid-cols-4 gap-1 md:gap-2">
			{months.map((month, index) => {
				const isSelected = currentMonth.getMonth() === index;
				const isCurrent =
					new Date().getMonth() === index &&
					new Date().getFullYear() === currentMonth.getFullYear();

				return (
					<button
						type="button"
						key={month}
						onClick={(e) => handleMonthSelect(e, index)}
						disabled={disabled}
						className={`
				  p-1 md:p-2 text-xs md:text-sm rounded-md transition-all duration-200
				  ${
						isSelected
							? "bg-accent text-white hover:bg-blue-600"
							: isCurrent
							? "border border-accent text-accent hover:bg-gray-100"
							: "hover:bg-gray-100"
					}
				  ${!disabled && "hover:scale-105"}
				`}
					>
						{month}
					</button>
				);
			})}
		</div>
	);

	const renderYears = () => (
		<div className="grid grid-cols-3 gap-2">
			{Array.from({ length: 12 }, (_, i) => yearStart + i).map((year) => {
				const isSelected = currentMonth.getFullYear() === year;
				const isCurrent = new Date().getFullYear() === year;

				return (
					<button
						type="button"
						key={year}
						onClick={(e) => handleYearSelect(e, year)}
						disabled={disabled}
						className={`
              p-2 text-sm rounded-lg transition-all duration-200
              ${
					isSelected
						? "bg-accent text-white hover:bg-blue-600"
						: isCurrent
						? "border border-accent text-accent hover:bg-gray-100"
						: "hover:bg-gray-100"
				}
              ${
					year === yearStart || year === yearStart + 11
						? "text-gray-400"
						: ""
				}
              ${!disabled && "hover:scale-105"}
            `}
					>
						{year}
					</button>
				);
			})}
		</div>
	);

	const renderHeader = () => {
		let title;
		let onPrevious;
		let onNext;

		switch (view) {
			case "months":
				title = currentMonth.getFullYear().toString();
				onPrevious = previousYear;
				onNext = nextYear;
				break;
			case "years":
				title = `${yearStart + 1}-${yearStart + 10}`;
				onPrevious = previousDecade;
				onNext = nextDecade;
				break;
			default:
				title = format(currentMonth, "MMMM yyyy", { locale: id });
				onPrevious = previousMonth;
				onNext = nextMonth;
		}

		return (
			<div className="mb-2 md:mb-4 flex items-center justify-between">
				<button
					type="button"
					onClick={onPrevious}
					className="rounded-full p-0.5 md:p-1 transition-all duration-200 hover:bg-gray-100 hover:scale-105"
					disabled={disabled}
				>
					<ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
				</button>
				<button
					type="button"
					onClick={handleViewChange}
					className="px-1.5 py-0.5 md:px-2 md:py-1 rounded-md text-sm md:text-base font-semibold transition-all duration-200 hover:bg-gray-100 hover:scale-105"
					disabled={disabled}
				>
					{title}
				</button>
				<button
					type="button"
					onClick={onNext}
					className="rounded-full p-0.5 md:p-1 transition-all duration-200 hover:bg-gray-100 hover:scale-105"
					disabled={disabled}
				>
					<ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
				</button>
			</div>
		);
	};

	return (
		<>
			<style>
				{`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95) translateY(-10px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
          
          @keyframes slideLeft {
            from { opacity: 0; transform: translateX(20px); }
            to { opacity: 1; transform: translateX(0); }
          }
          
          @keyframes slideRight {
            from { opacity: 0; transform: translateX(-20px); }
            to { opacity: 1; transform: translateX(0); }
          }

          .calendar-popup {
            animation: fadeIn 0.2s ease-out;
          }

          .slide-left {
            animation: slideLeft 0.2s ease-out;
          }

          .slide-right {
            animation: slideRight 0.2s ease-out;
          }
        `}
			</style>

			<div
				className={`relative  ${className} ${
					error ? "border-red-500" : ""
				} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
				ref={datePickerRef}
				{...props}
			>
				{label && (
					<label className="block text-sm font-medium text-gray-700 mb-1">
						{label}
					</label>
				)}

				<div
					onClick={() => !disabled && setIsOpen(!isOpen)}
					className={`
            group flex w-full rounded-xl cursor-pointer items-center 
            border border-gray-300 bg-white p-2 px-3 py-2 text-sm
            transition-all duration-200 
            hover:bg-gray-50 
            focus-within:ring-1 focus-within:ring-accent
            ${error ? "border-red-500" : ""}
            ${disabled ? "cursor-not-allowed pointer-events-none" : ""}
          `}
				>
					<Calendar
						className={`
              mr-2 h-5 w-5 text-gray-500 
              transition-colors duration-200 
       
            `}
					/>
					<input
						type="text"
						readOnly
						className={`
              w-full cursor-pointer text-sm 
              bg-transparent outline-none
              ${disabled ? "cursor-not-allowed" : ""}
            `}
						placeholder={placeholder}
						value={
							value
								? format(value, "dd MMMM yyyy", { locale: id })
								: ""
						}
						disabled={disabled}
					/>
				</div>

				{error && <p className="mt-1 text-sm text-red-500">{error}</p>}

				{isOpen && !disabled && (
					<div
						className={`${
							isOpen ? "calendar-popup" : ""
						}  absolute z-50 mt-2 w-72 border bg-white p-4 shadow-lg rounded-xl`}
					>
						{renderHeader()}
						<div key={slideDirection} className={slideDirection}>
							{view === "days" && renderDays()}
							{view === "months" && renderMonths()}
							{view === "years" && renderYears()}
						</div>
					</div>
				)}
			</div>
		</>
	);
}
