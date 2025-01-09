import React from "react";
import Label from "@/components/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";

interface AdditionalCostsProps {
	formData: {
		additionalItems: Record<string, string>;
	};
	handleAdditionalItemChange: (id: string, value: string) => void;
}

const additionalItems = [
	{ id: "ihram", label: "Kain/baju Ihrom" },
	{ id: "tas", label: "Tas gendong/pinggang" },
	{ id: "koper", label: "Koper" },
	{ id: "tasJinjing", label: "Tas jinjing" },
];

export default function AdditionalCosts({
	formData,
	handleAdditionalItemChange,
}: AdditionalCostsProps) {
	const handleRadioChange =
		(id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
			handleAdditionalItemChange(id, e.target.value);
		};

	return (
		<div className="max-w-3xl mx-auto px-4 py-12 bg-white">
			<div className="space-y-8">
				<div className="text-center mb-8">
					<h2 className="text-2xl font-serif mb-2">
						Biaya Tambahan Keberangkatan Umroh
					</h2>
					<p className="text-gray-600">
						Silahkan pilih item tambahan yang Anda perlukan
					</p>
				</div>

				<div className="space-y-6">
					{additionalItems.map((item) => (
						<div key={item.id} className="space-y-2">
							<Label htmlFor={`${item.id}-group`}>
								Apakah Anda sudah mempunyai {item.label}?
							</Label>
							<RadioGroup
								id={`${item.id}-group`}
								name={item.id}
								value={formData.additionalItems[item.id]}
								onChange={handleRadioChange(item.id)}
								className="space-y-2"
							>
								<RadioGroupItem
									value="ya"
									id={`${item.id}-yes`}
									label="Ya"
								/>
								<RadioGroupItem
									value="tidak"
									id={`${item.id}-no`}
									label="Tidak"
								/>
							</RadioGroup>
						</div>
					))}
				</div>

				<div className="mt-8 p-6 bg-gray-50 rounded-lg">
					<div className="space-y-2">
						<p className="text-gray-700">
							Total biaya tambahan yang anda perlukan:{" "}
							<span className="font-semibold">Rp. 2.500.000</span>
						</p>
						<p className="text-gray-700">
							Total biaya keseluruhan:{" "}
							<span className="font-semibold">
								Rp. 27.500.000
							</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
