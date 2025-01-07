"use client";
import { useState, useEffect } from "react";
import { ArrowUpCircle } from "lucide-react";

export const ScrollToTop = () => {
	const [isVisible, setIsVisible] = useState(false);

	// Show button when page is scrolled up to given distance
	const toggleVisibility = () => {
		if (window.scrollY > 300) {
			setIsVisible(true);
		} else {
			setIsVisible(false);
		}
	};

	// Set the scroll event listener
	useEffect(() => {
		window.addEventListener("scroll", toggleVisibility);

		// Clean up
		return () => {
			window.removeEventListener("scroll", toggleVisibility);
		};
	}, []);

	// Scroll to top smoothly
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<button
			onClick={scrollToTop}
			className={`fixed bottom-4 right-4 z-50 rounded-full bg-white p-2 shadow-lg transition-all duration-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:hover:bg-gray-700 ${
				isVisible ? "opacity-100" : "opacity-0"
			} pointer-events-auto`}
			aria-label="Scroll to top"
			style={{ transition: "opacity 0.3s ease" }}
		>
			<ArrowUpCircle className="h-8 w-8 text-primary" />
		</button>
	);
};
