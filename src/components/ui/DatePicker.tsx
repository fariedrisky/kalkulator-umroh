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
} from "date-fns";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { id } from "date-fns/locale";

interface DatePickerProps {
	selected?: Date;
	onChange: (date: Date) => void;
	className?: string;
}

type View = "days" | "months" | "years";

const DatePicker = ({
	selected,
	onChange,
	className = "",
}: DatePickerProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [currentMonth, setCurrentMonth] = useState(new Date());
	const [view, setView] = useState<View>("days");
	const datePickerRef = useRef<HTMLDivElement>(null);
	const yearStart = Math.floor(currentMonth.getFullYear() / 10) * 10 - 1;

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
		setCurrentMonth(addMonths(currentMonth, 1));
	};

	const previousMonth = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
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
		return eachDayOfInterval({ start, end });
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
		e.preventDefault();
		e.stopPropagation();
		setCurrentMonth(setMonth(currentMonth, monthIndex));
		setView("days");
	};

	const handleYearSelect = (e: React.MouseEvent, year: number) => {
		e.preventDefault();
		e.stopPropagation();
		setCurrentMonth(setYear(currentMonth, year));
		setView("months");
	};

	const handleViewChange = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setView(
			view === "days" ? "months" : view === "months" ? "years" : "years"
		);
	};

	const handleDaySelect = (day: Date) => {
		onChange(day);
		setIsOpen(false);
		setView("days");
	};

	const renderHeader = () => {
		let title: string;
		let onPrevious: (e: React.MouseEvent) => void;
		let onNext: (e: React.MouseEvent) => void;

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
			<div className="mb-4 flex items-center justify-between">
				<button
					type="button"
					onClick={onPrevious}
					className="rounded-full p-1 hover:bg-gray-100"
				>
					<ChevronLeft className="h-5 w-5" />
				</button>
				<button
					type="button"
					onClick={handleViewChange}
					className="px-2 py-1 font-semibold hover:bg-gray-100"
				>
					{title}
				</button>
				<button
					type="button"
					onClick={onNext}
					className="rounded-full p-1 hover:bg-gray-100"
				>
					<ChevronRight className="h-5 w-5" />
				</button>
			</div>
		);
	};

	const renderMonths = () => (
		<div className="grid grid-cols-4 gap-2">
			{months.map((month, index) => {
				const isCurrentMonth = currentMonth.getMonth() === index;
				return (
					<button
						type="button"
						key={month}
						onClick={(e) => handleMonthSelect(e, index)}
						className={`p-2 text-sm ${
							isCurrentMonth
								? "bg-blue-500 text-white"
								: "hover:bg-gray-100"
						}`}
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
				const isCurrentYear = currentMonth.getFullYear() === year;
				return (
					<button
						type="button"
						key={year}
						onClick={(e) => handleYearSelect(e, year)}
						className={`p-2 text-sm ${
							isCurrentYear
								? "bg-blue-500 text-white"
								: "hover:bg-gray-100"
						} ${
							year === yearStart || year === yearStart + 11
								? "text-gray-400"
								: ""
						}`}
					>
						{year}
					</button>
				);
			})}
		</div>
	);

	const renderDays = () => (
		<>
			<div className="mb-2 grid grid-cols-7 gap-1">
				{["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map(
					(day) => (
						<div
							key={day}
							className="text-center text-sm font-medium text-gray-500"
						>
							{day}
						</div>
					)
				)}
			</div>

			<div className="grid grid-cols-7 gap-1">
				{Array.from({
					length: new Date(
						currentMonth.getFullYear(),
						currentMonth.getMonth(),
						1
					).getDay(),
				}).map((_, index) => (
					<div key={`empty-${index}`} className="h-8" />
				))}

				{getDaysInMonth().map((day) => {
					const isSelected = selected
						? isSameDay(day, selected)
						: false;
					const isCurrentMonth = isSameMonth(day, currentMonth);
					const isCurrentDay = isToday(day);

					return (
						<button
							type="button"
							key={day.toString()}
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								handleDaySelect(day);
							}}
							className={`flex h-8 w-8 items-center justify-center text-sm ${
								!isCurrentMonth && "text-gray-300"
							} ${
								isSelected &&
								"bg-blue-500 text-white hover:bg-blue-600"
							} ${
								!isSelected &&
								isCurrentMonth &&
								"hover:bg-gray-100"
							} ${
								isCurrentDay &&
								!isSelected &&
								"border border-blue-500 text-blue-500"
							}`}
						>
							{format(day, "d")}
						</button>
					);
				})}
			</div>
		</>
	);

	return (
		<div className={`relative ${className}`} ref={datePickerRef}>
			<div
				className="flex w-full cursor-pointer items-center border border-gray-300 bg-white p-2 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
				onClick={() => setIsOpen(!isOpen)}
			>
				<Calendar className="mr-2 h-5 w-5 text-gray-500 transition-all duration-300 hover:text-blue-500" />
				<input
					type="text"
					readOnly
					className="w-full cursor-pointer text-sm outline-none"
					placeholder="Pilih tanggal"
					value={
						selected
							? format(selected, "dd MMMM yyyy", { locale: id })
							: ""
					}
				/>
			</div>

			{isOpen && (
				<div className="absolute z-50 mt-2 w-72 border bg-white p-4 shadow-lg">
					{renderHeader()}
					{view === "days" && renderDays()}
					{view === "months" && renderMonths()}
					{view === "years" && renderYears()}
				</div>
			)}
		</div>
	);
};

export default DatePicker;
