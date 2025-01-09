"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import Label from "@/components/ui/Label";
import Select from "@/components/ui/Select";
import Modal from "@/components/ui/Modal";
import AdditionalCosts from "./AdditionalCosts";
import { CostEstimationType, FormDataType } from "./types";
import { format } from "date-fns";
import { hotelService } from "@/services/hotelService";
import AnimatedWrapper from "@/components/ui/AnimatedWrapper";
import DatePicker from "@/components/ui/DatePicker";
import Image from "next/image";

const airports = [
	{ code: "CGK", name: "Jakarta (CGK)" },
	{ code: "SUB", name: "Surabaya (SUB)" },
	{ code: "JED", name: "Jeddah (JED)" },
	{ code: "MED", name: "Madinah (MED)" },
].map((airport) => ({
	value: airport.code,
	label: airport.name,
}));

const transports = [
	{ id: "transport1", name: "Transport Premium", price: 1000000 },
	{ id: "transport2", name: "Transport Regular", price: 750000 },
	{ id: "transport3", name: "Transport Ekonomi", price: 500000 },
].map((transport) => ({
	value: transport.id,
	label: `${transport.name} - Rp ${transport.price.toLocaleString("id-ID")}`,
}));

interface Hotel {
	hotel_id: number;
	property: {
		name: string;
		priceBreakdown: {
			grossPrice: {
				value: number;
			};
		};
	};
}

const KalkulatorUmroh = () => {
	const [showPriceModal, setShowPriceModal] = useState(false);
	const [showAdditionalCosts, setShowAdditionalCosts] =
		useState<boolean>(false);

	const [formData, setFormData] = useState<FormDataType>({
		departureDate: new Date(),
		returnDate: new Date(),
		originAirport: "",
		destinationAirport: "",
		excludeFlight: false,
		hasVisa: "belum",
		hotelMadinahStatus: "belum",
		selectedMadinahHotel: "",
		hotelMakkahStatus: "belum",
		selectedMekahHotel: "",
		airportTransportStatus: "belum",
		selectedTransport: "",
		muthoifStatus: "tidak",
		handlingStatus: "tidak",
		additionalItems: {
			ihram: "ya",
			tas: "ya",
			koper: "ya",
			tasJinjing: "ya",
		},
	});

	const [costEstimation, setCostEstimation] = useState<CostEstimationType>({
		makkahHotel: 0,
		madinahHotel: 0,
		transport: 0,
		visa: 0,
		muthoif: 0,
		handling: 0,
	});

	console.log("costEstimation", costEstimation);

	const [hotels, setHotels] = useState<Hotel[]>([]);
	const [isLoadingHotels, setIsLoadingHotels] = useState(false);
	const [hotelError, setHotelError] = useState<string | null>(null);

	console.log("hotelError", hotelError);

	useEffect(() => {
		const fetchHotels = async () => {
			if (!formData.departureDate || !formData.returnDate) return;

			try {
				setIsLoadingHotels(true);
				setHotelError(null);

				const formattedDepartureDate = format(
					formData.departureDate,
					"yyyy-MM-dd"
				);
				const formattedReturnDate = format(
					formData.returnDate,
					"yyyy-MM-dd"
				);

				const hotelData = await hotelService.searchHotels({
					dest_id: "21157",
					search_type: "landmark",
					arrival_date: formattedDepartureDate,
					departure_date: formattedReturnDate,
				});

				setHotels(hotelData.data.hotels || []);
			} catch (error) {
				console.error("Error fetching hotels:", error);
				setHotelError("Failed to fetch hotels. Please try again.");
			} finally {
				setIsLoadingHotels(false);
			}
		};

		fetchHotels();
	}, [formData.departureDate, formData.returnDate]);

	const handleInputChange = (
		field: string,
		value: FormDataType[keyof FormDataType]
	) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleAdditionalItemChange = (item: string, value: string) => {
		setFormData((prev) => ({
			...prev,
			additionalItems: {
				...prev.additionalItems,
				[item]: value,
			},
		}));
	};

	const formattedHotels = hotels.map((hotel) => ({
		value: hotel.hotel_id.toString(),
		label: `${
			hotel.property.name
		} - Rp ${hotel.property.priceBreakdown.grossPrice.value.toLocaleString(
			"id-ID"
		)}`,
		disabled: false,
	}));

	const handleCloseModal = () => {
		setShowPriceModal(false);
	};

	return (
		<div className="min-h-screen bg-white">
			{/* Hero Image Section */}
			<div className="relative w-full h-96">
				<Image
					src="/assets/images/hero.jpg"
					alt="Mosque Illustration"
					layout="fill"
					objectFit="cover"
					priority
					className="w-full"
				/>
				<div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
					<div className="text-center text-white">
						<h1 className="text-4xl font-serif mb-4">
							Kalkulator Umroh
						</h1>
						<p className="text-xl">
							Calculate your expense in advance for hassle-free
							Umrah trip
						</p>
					</div>
				</div>
			</div>

			{/* Form Section */}
			<div className="max-w-3xl mx-auto px-4 py-12">
				<div className="space-y-8">
					{/* Date Selection */}
					<div className="flex flex-col md:flex-row gap-4">
						<div className="flex-1 space-y-2">
							<Label>Tanggal Keberangkatan</Label>
							<DatePicker
								value={formData.departureDate}
								onChange={(date) =>
									handleInputChange("departureDate", date)
								}
							/>
						</div>
						<div className="flex-1 space-y-2">
							<Label>Tanggal Kembali</Label>
							<DatePicker
								value={formData.returnDate}
								onChange={(date) =>
									handleInputChange("returnDate", date)
								}
							/>
						</div>
					</div>

					{/* Airport Selection */}
					<div className="flex flex-col md:flex-row gap-4">
						<div className="flex-1 space-y-2">
							<Label>Bandara Keberangkatan</Label>
							<Select
								options={airports}
								value={formData.originAirport}
								onChange={(value) =>
									handleInputChange("originAirport", value)
								}
								placeholder="Pilih Bandara Asal"
							/>
						</div>
						<div className="flex-1 space-y-2">
							<Label>Bandara Tujuan</Label>
							<Select
								options={airports}
								value={formData.destinationAirport}
								onChange={(value) =>
									handleInputChange(
										"destinationAirport",
										value
									)
								}
								placeholder="Pilih Bandara Tujuan"
							/>
						</div>
					</div>

					{/* Flight Exclusion Checkbox */}
					<div className="flex items-center space-x-2">
						<Checkbox
							id="excludeFlight"
							name="excludeFlight"
							label="Tidak termasuk tiket pesawat"
							checked={formData.excludeFlight}
							onChange={(e) =>
								handleInputChange(
									"excludeFlight",
									e.target.checked
								)
							}
						/>
					</div>

					{/* Visa Status */}
					<div className="space-y-2">
						<Label>Apakah sudah mempunyai VISA + Siskopatuh?</Label>
						<RadioGroup
							id="visa-status"
							name="visa"
							value={formData.hasVisa}
							onChange={(e) =>
								handleInputChange("hasVisa", e.target.value)
							}
						>
							<RadioGroupItem
								value="sudah"
								id="visa-yes"
								label="Sudah"
							/>
							<RadioGroupItem
								value="belum"
								id="visa-no"
								label="Belum"
							/>
						</RadioGroup>
					</div>

					{/* Hotel Madinah */}
					<div className="space-y-4">
						<Label>Sudah Booking Hotel di Madinah?</Label>
						<RadioGroup
							id="hotel-madinah-status"
							name="hotel-madinah"
							value={formData.hotelMadinahStatus}
							onChange={(e) =>
								handleInputChange(
									"hotelMadinahStatus",
									e.target.value
								)
							}
						>
							<RadioGroupItem
								value="sudah"
								id="hotel-madinah-yes"
								label="Sudah"
							/>
							<RadioGroupItem
								value="belum"
								id="hotel-madinah-no"
								label="Belum"
							/>
						</RadioGroup>

						{formData.hotelMadinahStatus === "belum" && (
							<AnimatedWrapper>
								<div className="mt-4">
									<Select
										options={formattedHotels}
										value={formData.selectedMadinahHotel}
										onChange={(value) =>
											handleInputChange(
												"selectedMadinahHotel",
												value
											)
										}
										placeholder="Pilih Hotel di Madinah"
										disabled={isLoadingHotels}
									/>
								</div>
							</AnimatedWrapper>
						)}
					</div>

					{/* Hotel Mekah */}
					<div className="space-y-4">
						<Label>Sudah Booking Hotel di Mekah?</Label>
						<RadioGroup
							id="hotel-mekah-status"
							name="hotel-mekah"
							value={formData.hotelMakkahStatus}
							onChange={(e) =>
								handleInputChange(
									"hotelMakkahStatus",
									e.target.value
								)
							}
						>
							<RadioGroupItem
								value="sudah"
								id="hotel-mekah-yes"
								label="Sudah"
							/>
							<RadioGroupItem
								value="belum"
								id="hotel-mekah-no"
								label="Belum"
							/>
						</RadioGroup>

						{formData.hotelMakkahStatus === "belum" && (
							<AnimatedWrapper>
								<div className="mt-4">
									<Select
										options={formattedHotels}
										value={formData.selectedMekahHotel}
										onChange={(value) => {
											handleInputChange(
												"selectedMekahHotel",
												value
											);
											const selectedHotel = hotels.find(
												(hotel) =>
													hotel.hotel_id.toString() ===
													value
											);
											if (selectedHotel) {
												setCostEstimation((prev) => ({
													...prev,
													makkahHotel:
														selectedHotel.property
															.priceBreakdown
															.grossPrice.value,
												}));
											}
										}}
										placeholder={
											isLoadingHotels
												? "Loading hotels..."
												: !formData.departureDate ||
												  !formData.returnDate
												? "Please select dates first"
												: "Pilih Hotel di Mekah"
										}
										disabled={
											isLoadingHotels ||
											!formData.departureDate ||
											!formData.returnDate
										}
									/>
								</div>
							</AnimatedWrapper>
						)}
					</div>

					{/* Transport */}
					<div className="space-y-4">
						<Label>Sudah Booking Mobil Jemputan di Bandara?</Label>
						<RadioGroup
							id="transport-status"
							name="transport"
							value={formData.airportTransportStatus}
							onChange={(e) =>
								handleInputChange(
									"airportTransportStatus",
									e.target.value
								)
							}
						>
							<RadioGroupItem
								value="sudah"
								id="transport-yes"
								label="Sudah"
							/>
							<RadioGroupItem
								value="tidak-perlu"
								id="transport-not-needed"
								label="Tidak Perlu"
							/>
							<RadioGroupItem
								value="belum"
								id="transport-no"
								label="Belum"
							/>
						</RadioGroup>

						{formData.airportTransportStatus === "belum" && (
							<AnimatedWrapper>
								<Select
									options={transports}
									value={formData.selectedTransport}
									onChange={(value) =>
										handleInputChange(
											"selectedTransport",
											value
										)
									}
									placeholder="Pilih Layanan Transport"
								/>
							</AnimatedWrapper>
						)}
					</div>

					{/* Additional Services */}
					<div className="space-y-4">
						<div className="space-y-2">
							<Label>
								Perlu jasa Muthoif (pendamping selama di Arab)?
							</Label>
							<RadioGroup
								id="muthoif-status"
								name="muthoif"
								value={formData.muthoifStatus}
								onChange={(e) =>
									handleInputChange(
										"muthoifStatus",
										e.target.value
									)
								}
							>
								<RadioGroupItem
									value="ya"
									id="muthoif-yes"
									label="Ya"
								/>
								<RadioGroupItem
									value="tidak"
									id="muthoif-no"
									label="Tidak"
								/>
							</RadioGroup>
						</div>

						<div className="space-y-2">
							<Label>
								Perlu jasa Handling Barang di Bandara?
							</Label>
							<RadioGroup
								id="handling-status"
								name="handling"
								value={formData.handlingStatus}
								onChange={(e) =>
									handleInputChange(
										"handlingStatus",
										e.target.value
									)
								}
							>
								<RadioGroupItem
									value="ya"
									id="handling-yes"
									label="Ya"
								/>
								<RadioGroupItem
									value="tidak"
									id="handling-no"
									label="Tidak"
								/>
							</RadioGroup>
						</div>
					</div>

					<Button
						className="w-full py-3 mt-8"
						onClick={() => setShowPriceModal(true)}
					>
						Cek Harga Paket
					</Button>
				</div>
			</div>

			{/* Price Modal */}
			<Modal isOpen={showPriceModal} onClose={handleCloseModal}>
				<div className="space-y-4 p-4 md:p-6">
					<h2 className="text-lg md:text-xl font-semibold">
						Perkiraan Biaya
					</h2>
					<p className="text-sm md:text-base">
						Perkiraan biaya wajib yang harus Anda siapkan untuk
						keberangkatan tanggal{" "}
						{formData.departureDate?.toLocaleDateString()} sampai
						dengan {formData.returnDate?.toLocaleDateString()}{" "}
						adalah sebesar Rp. 25.000.000
					</p>
					<div className="flex flex-col md:flex-row justify-between space-y-2 md:space-y-0 md:space-x-4">
						<Button
							variant="outline"
							className="w-full md:w-auto"
							onClick={() => {
								setShowPriceModal(false);
								setShowAdditionalCosts(true);
							}}
						>
							Lihat biaya-biaya lainnya
						</Button>
						<Button
							className="w-full md:w-auto"
							onClick={handleCloseModal}
						>
							Ok saya paham
						</Button>
					</div>
				</div>
			</Modal>

			{/* Additional Costs Form */}
			{showAdditionalCosts && (
				<AdditionalCosts
					formData={formData}
					handleAdditionalItemChange={handleAdditionalItemChange}
				/>
			)}
		</div>
	);
};

export default KalkulatorUmroh;
