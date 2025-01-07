import { format } from "date-fns";

const indonesianMonths = {
	January: "Januari",
	February: "Februari",
	March: "Maret",
	April: "April",
	May: "Mei",
	June: "Juni",
	July: "Juli",
	August: "Agustus",
	September: "September",
	October: "Oktober",
	November: "November",
	December: "Desember",
};

const formatToIndonesian = (date: Date | undefined): string => {
	if (!date) return "";

	// Format tanggal ke "dd MMMM yyyy" (e.g., "15 January 2024")
	const englishDate = format(date, "d MMMM yyyy");

	// Ganti nama bulan ke bahasa Indonesia
	return englishDate.replace(
		/(?:January|February|March|April|May|June|July|August|September|October|November|December)/g,
		(month) => indonesianMonths[month as keyof typeof indonesianMonths]
	);
};

export default formatToIndonesian;
