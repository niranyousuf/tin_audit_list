"use client";

import { useMemo } from "react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import tinData from "../../../public/tins.json";

// Add rank number and shorten long zone names for axis readability
const shortenZone = (zone: string, index: number): string => {
	const name = zone
		.replace("Taxes Zone, ", "")
		.replace("Taxes Zone-", "Zone-")
		.replace("Large Taxpayers Unit (LTU), ", "LTU, ")
		.trim();
	return `${index + 1}. ${name}`;
};

// Custom tooltip shown on bar hover
const CustomTooltip = ({
	active,
	payload,
}: {
	active?: boolean;
	payload?: { payload: { fullName: string; count: number } }[];
}) => {
	if (active && payload && payload.length) {
		const { fullName, count } = payload[0].payload;
		return (
			<div className="stats-tooltip">
				<p className="stats-tooltip-zone">{fullName}</p>
				<p className="stats-tooltip-count">
					{count.toLocaleString()} returns
				</p>
			</div>
		);
	}
	return null;
};

export default function StatsSection() {
	// Group TIN entries by zone, count occurrences, sort highest first
	const zoneData = useMemo(() => {
		const counts: Record<string, number> = {};
		(
			tinData as {
				tin: string;
				zone: string;
				circle: string;
				submissionType: string;
			}[]
		).forEach((item) => {
			counts[item.zone] = (counts[item.zone] || 0) + 1;
		});

		return Object.entries(counts)
			.map(([zone, count]) => ({ fullName: zone, count }))
			.sort((a, b) => b.count - a.count)
			.map((item, index) => ({
				...item,
				name: shortenZone(item.fullName, index),
			}));
	}, []);

	return (
		<section className="stats-section">
			<div className="stats-header">
				<h2 className="stats-title">Audit Selection by Zone</h2>
				<p className="stats-subtitle">
					NBR AY 2023–24 · Risk-Based ·{" "}
					{tinData.length.toLocaleString()} total returns
				</p>
			</div>

			<div className="stats-chart-wrapper">
				<ResponsiveContainer width="100%" height={zoneData.length * 34}>
					<BarChart
						data={zoneData}
						layout="vertical"
						margin={{ top: 8, right: 8, left: 8, bottom: 8 }}
						barCategoryGap="2%"
					>
						<CartesianGrid
							strokeDasharray="3 3"
							horizontal={false}
							stroke="#e5e7eb"
						/>
						<XAxis
							type="number"
							tickFormatter={(v) => v.toLocaleString()}
							tick={{ fontSize: 12, fill: "#6b7280" }}
							axisLine={false}
							tickLine={false}
						/>
						<YAxis
							type="category"
							dataKey="name"
							width={165}
							tick={(props) => {
								const { x, y, payload } = props;
								return (
									<text
										x={x - 165}
										y={y}
										dy={4}
										textAnchor="start"
										fontSize={12}
										fill="#374151"
									>
										{payload.value}
									</text>
								);
							}}
							axisLine={false}
							tickLine={false}
						/>
						<Tooltip
							content={<CustomTooltip />}
							cursor={{ fill: "#f3f4f6" }}
						/>
						<Bar
							dataKey="count"
							radius={[0, 4, 4, 0]}
							maxBarSize={16}
							shape={(props: any) => {
								const { x, y, width, height, index } = props;
								// Gradually reduce opacity for lower-ranked zones
								const opacity =
									1 - index * 0.04 > 0.5 ? 1 - index * 0.04 : 0.5;
								const fill = index === 0 ? "#1d4ed8" : "#2563eb";
								return (
									<rect
										x={x}
										y={y}
										width={width}
										height={height}
										rx={4}
										fill={fill}
										opacity={opacity}
									/>
								);
							}}
						/>
					</BarChart>
				</ResponsiveContainer>
			</div>
		</section>
	);
}