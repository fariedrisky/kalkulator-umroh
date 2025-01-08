"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/Card";
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

// Dummy data
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
	console.log("KalkulatorUmroh ~ costEstimation:", costEstimation);

	const [hotels, setHotels] = useState<Hotel[]>([]);
	const [isLoadingHotels, setIsLoadingHotels] = useState(false);
	const [hotelError, setHotelError] = useState<string | null>(null);
	console.log("KalkulatorUmroh ~ hotelError:", hotelError);

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
		<div className="relative min-h-screen">
			<div
				className="fixed inset-0 z-0 bg-gray-100"
				style={{
					backgroundColor: "#ffff",
					backgroundImage: `
					  linear-gradient(67.5deg, #ffff 10%, transparent 10%),
					  linear-gradient(157.5deg, #ffff 10%, transparent 10%),
					  linear-gradient(67.5deg, transparent 90%, #ffff 90%),
					  linear-gradient(157.5deg, transparent 90%, #ffff 90%),
					  linear-gradient(22.5deg, #ffff 10%, transparent 10%),
					  linear-gradient(112.5deg, #ffff 10%, transparent 10%),
					  linear-gradient(22.5deg, transparent 90%, #ffff 90%),
					  linear-gradient(112.5deg, transparent 90%, #ffff 90%),
					  linear-gradient(22.5deg, transparent 33%, #f2f2f2 33%, #f2f2f2 36%, transparent 36%, transparent 64%, #f2f2f2 64%, #f2f2f2 67%, transparent 67%),
					  linear-gradient(-22.5deg, transparent 33%, #f2f2f2 33%, #f2f2f2 36%, transparent 36%, transparent 64%, #f2f2f2 64%, #f2f2f2 67%, transparent 67%),
					  linear-gradient(112.5deg, transparent 33%, #f2f2f2 33%, #f2f2f2 36%, transparent 36%, transparent 64%, #f2f2f2 64%, #f2f2f2 67%, transparent 67%),
					  linear-gradient(-112.5deg, transparent 33%, #f2f2f2 33%, #f2f2f2 36%, transparent 36%, transparent 64%, #f2f2f2 64%, #f2f2f2 67%, transparent 67%)
					`,
					backgroundSize: "250px 250px",
					backgroundPosition:
						"-100px 150px, -150px 150px, -150px 100px, -100px 100px, -150px 100px, -100px 100px, -100px 150px, -150px 150px, 0 0, 0 0, 0 0, 0 0",
				}}
			/>

			<div className="relative z-10 w-full max-w-4xl mx-auto p-4 md:p-6 space-y-6 md:space-y-8">
				<Card className="w-full">
					<CardHeader>
						<CardTitle className="text-center text-2xl md:text-3xl font-serif">
							Kalkulator Umroh
						</CardTitle>
						<CardDescription className="text-center text-sm md:text-base">
							Hitung biaya perjalanan umroh Anda dengan mudah
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4 md:space-y-6">
							{/* Flight Details Section */}
							<div className="space-y-4 md:space-y-6">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
									<div className="space-y-2">
										<Label>Tanggal Keberangkatan</Label>
										<DatePicker
											value={formData.departureDate}
											minDate={new Date()}
											onChange={(date) =>
												handleInputChange(
													"departureDate",
													date
												)
											}
											className="w-full"
										/>
									</div>
									<div className="space-y-2">
										<Label>Tanggal Kembali</Label>
										<DatePicker
											value={formData.returnDate}
											minDate={new Date()}
											onChange={(date) =>
												handleInputChange(
													"returnDate",
													date
												)
											}
											className="w-full"
										/>
									</div>
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
								<div className="space-y-2">
									<Label>Bandara Keberangkatan</Label>
									<Select
										options={airports.filter(
											(airport) =>
												airport.value !==
												formData.destinationAirport
										)}
										value={formData.originAirport}
										onChange={(value) =>
											handleInputChange(
												"originAirport",
												value
											)
										}
										placeholder="Pilih Bandara Asal"
									/>
								</div>
								<div className="space-y-2">
									<Label>Bandara Tujuan</Label>
									<Select
										options={airports.filter(
											(airport) =>
												airport.value !==
												formData.originAirport
										)}
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

							{/* Additional sections with responsive adjustments */}
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

							{/* Radio groups with responsive spacing */}
							<div className="space-y-4">
								<div className="space-y-2">
									<Label className="text-sm md:text-base">
										Apakah sudah mempunyai VISA +
										Siskopatuh?
									</Label>
									<RadioGroup
										id="visa-status"
										name="visa"
										value={formData.hasVisa}
										onChange={(e) =>
											handleInputChange(
												"hasVisa",
												e.target.value
											)
										}
										className="space-y-2 md:space-y-3"
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
							</div>

							{/* Hotel sections with responsive adjustments */}
							<div className="space-y-4">
								<Label className="text-sm md:text-base">
									Sudah Booking Hotel di Madinah?
								</Label>
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
									className="space-y-2 md:space-y-3"
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
												value={
													formData.selectedMadinahHotel
												}
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

							{/* Hotel Mekah Section */}
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
												value={
													formData.selectedMekahHotel
												}
												onChange={(value) => {
													handleInputChange(
														"selectedMekahHotel",
														value
													);
													const selectedHotel =
														hotels.find(
															(hotel) =>
																hotel.hotel_id.toString() ===
																value
														);
													if (selectedHotel) {
														setCostEstimation(
															(prev) => ({
																...prev,
																makkahHotel:
																	selectedHotel
																		.property
																		.priceBreakdown
																		.grossPrice
																		.value,
															})
														);
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

							{/* Airport Transport Section */}
							<div className="space-y-4">
								<Label>
									Sudah Booking Mobil Jemputan di Bandara?
								</Label>
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

								{formData.airportTransportStatus ===
									"belum" && (
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

							{/* Additional Services Section */}
							<div className="space-y-4">
								<div className="space-y-2">
									<Label>
										Perlu jasa Muthoif (pendamping selama di
										Arab)?
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

							{/* Price Check Button */}
							<Button
								className="w-full text-sm md:text-base py-2 md:py-3"
								onClick={() => setShowPriceModal(true)}
							>
								Cek Harga Paket
							</Button>
						</div>
					</CardContent>
				</Card>

				{/* Price Modal */}
				<Modal isOpen={showPriceModal} onClose={handleCloseModal}>
					<div className="space-y-4 p-4 md:p-6">
						<h2 className="text-lg md:text-xl font-semibold">
							Perkiraan Biaya
						</h2>
						<p className="text-sm md:text-base">
							Perkiraan biaya wajib yang harus Anda siapkan untuk
							keberangkatan tanggal{" "}
							{formData.departureDate?.toLocaleDateString()}{" "}
							sampai dengan{" "}
							{formData.returnDate?.toLocaleDateString()} adalah
							sebesar Rp. 25.000.000
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
		</div>
	);
};

export default KalkulatorUmroh;
