import { ImageResponse } from "next/og";

export const runtime = "edge";

// OG image dimensions — recommended for social sharing
export const size = {
	width: 1200,
	height: 630,
};

export const contentType = "image/png";

export default async function OGImage() {
	return new ImageResponse(
		(
			<div
				style={{
					width: "1200px",
					height: "630px",
					background: "#ffffff",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					padding: "80px",
					fontFamily: "system-ui, sans-serif",
					position: "relative",
				}}
			>
				{/* Top accent line */}
				<div
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						right: 0,
						height: "6px",
						background: "#2563eb",
					}}
				/>

				{/* App name badge */}
				<div
					style={{
						display: "flex",
						alignItems: "center",
						marginBottom: "32px",
					}}
				>
					<div
						style={{
							background: "#eff6ff",
							border: "1px solid #bfdbfe",
							borderRadius: "8px",
							padding: "6px 16px",
							fontSize: "16px",
							fontWeight: 600,
							color: "#2563eb",
							letterSpacing: "0.5px",
						}}
					>
						AuditList
					</div>
					<div
						style={{
							marginLeft: "16px",
							fontSize: "16px",
							color: "#9ca3af",
						}}
					>
						AY 2023–24 · Risk-Based
					</div>
				</div>

				{/* Main heading */}
				<div
					style={{
						fontSize: "64px",
						fontWeight: 700,
						color: "#111827",
						lineHeight: 1.1,
						marginBottom: "24px",
						maxWidth: "800px",
					}}
				>
					Is Your TIN on the{" "}
					<span style={{ color: "#2563eb" }}>NBR Audit List?</span>
				</div>

				{/* Subtitle */}
				<div
					style={{
						fontSize: "24px",
						color: "#6b7280",
						marginBottom: "48px",
						maxWidth: "700px",
						lineHeight: 1.5,
					}}
				>
					Check instantly — type your 12-digit TIN and get your audit
					status with zone, circle, and submission type.
				</div>

				{/* Stats row */}
				<div style={{ display: "flex", gap: "40px" }}>
					{/* Stat 1 */}
					<div style={{ display: "flex", flexDirection: "column" }}>
						<div
							style={{
								fontSize: "32px",
								fontWeight: 700,
								color: "#111827",
							}}
						>
							72,196
						</div>
						<div style={{ fontSize: "16px", color: "#9ca3af" }}>
							Returns selected
						</div>
					</div>

					{/* Divider */}
					<div
						style={{
							width: "1px",
							background: "#e5e7eb",
							alignSelf: "stretch",
						}}
					/>

					{/* Stat 2 */}
					<div style={{ display: "flex", flexDirection: "column" }}>
						<div
							style={{
								fontSize: "32px",
								fontWeight: 700,
								color: "#111827",
							}}
						>
							2023–24
						</div>
						<div style={{ fontSize: "16px", color: "#9ca3af" }}>
							Assessment year
						</div>
					</div>

					{/* Divider */}
					<div
						style={{
							width: "1px",
							background: "#e5e7eb",
							alignSelf: "stretch",
						}}
					/>

					{/* Stat 3 */}
					<div style={{ display: "flex", flexDirection: "column" }}>
						<div
							style={{
								fontSize: "32px",
								fontWeight: 700,
								color: "#111827",
							}}
						>
							100%
						</div>
						<div style={{ fontSize: "16px", color: "#9ca3af" }}>
							Client-side · private
						</div>
					</div>
				</div>

				{/* Bottom URL */}
				<div
					style={{
						position: "absolute",
						bottom: "48px",
						left: "80px",
						fontSize: "18px",
						color: "#9ca3af",
					}}
				>
					tin-audit-list.vercel.app
				</div>
			</div>
		),
		{ ...size }
	);
}