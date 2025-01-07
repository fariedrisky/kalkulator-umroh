import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
	const [closing, setClosing] = useState(false);
	const [animationComplete, setAnimationComplete] = useState(false);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
			setClosing(false);
			// Reset animation state when opening
			setAnimationComplete(false);
		} else {
			document.body.style.overflow = "unset";
		}
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isOpen]);

	const handleClose = () => {
		setClosing(true);
		setTimeout(onClose, 200);
	};

	const handleAnimationComplete = () => {
		if (!closing) {
			setAnimationComplete(true);
		}
	};

	return (
		<AnimatePresence mode="wait">
			{isOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center">
					<motion.div
						initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
						animate={{
							opacity: 1,
							backdropFilter: "blur(8px)",
							transition: { duration: 0.4 },
						}}
						exit={{
							opacity: 0,
							backdropFilter: "blur(0px)",
							transition: { duration: 0.3 },
						}}
						className="fixed inset-0 bg-black/30"
						onClick={handleClose}
					/>

					<motion.div
						variants={modalVariants}
						initial="closed"
						animate={closing ? "closed" : "open"}
						exit="closed"
						onAnimationComplete={handleAnimationComplete}
						className={`relative z-50 max-h-full w-full max-w-xl  rounded-2xl ${
							animationComplete
								? "overflow-auto"
								: "overflow-hidden"
						} bg-white shadow-2xl`}
					>
						<motion.div
							variants={contentVariants}
							initial="closed"
							animate={closing ? "closed" : "open"}
							exit="closed"
							className="px-6 py-6"
						>
							{children}
						</motion.div>
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);
}

const modalVariants = {
	closed: {
		scale: 0.5,
		opacity: 0,
		rotateX: -15,
		transition: {
			type: "spring",
			duration: 0.4,
			ease: "easeInOut",
		},
	},
	open: {
		scale: 1,
		opacity: 1,
		rotateX: 0,
		transition: {
			type: "spring",
			duration: 0.5,
			bounce: 0.3,
		},
	},
};

const contentVariants = {
	closed: {
		opacity: 0,
		y: 20,
		transition: {
			duration: 0.2,
		},
	},
	open: {
		opacity: 1,
		y: 0,
		transition: {
			delay: 0.1,
			duration: 0.4,
		},
	},
};
