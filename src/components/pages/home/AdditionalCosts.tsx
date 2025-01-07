import React from "react";
import Label from "@/components/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import Card from "@/components/ui/Card";

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
		<Card
			title="Biaya Tambahan Keberangkatan Umroh"
			description=""
			className="w-full"
		>
			<div className="space-y-6">
				<div className="space-y-4">
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
								<RadioGroupItem value="ya" label="Ya" />
								<RadioGroupItem value="tidak" label="Tidak" />
							</RadioGroup>
						</div>
					))}
				</div>

				<div className="p-4 bg-gray-100 rounded-lg">
					<p className="text-gray-700">
						Total biaya tambahan yang anda perlukan: Rp. 2.500.000
					</p>
					<p className="mt-2 text-gray-700">
						Total biaya keseluruhan: Rp. 27.500.000
					</p>
				</div>
			</div>
		</Card>
	);
}
