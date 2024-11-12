import { vi } from 'vitest'

// Mock react-leaflet components
vi.mock('react-leaflet', () => ({
	MapContainer: ({ children }: { children: React.ReactNode }) => (
		<div data-testid='map-container'>{children}</div>
	),
	TileLayer: () => <div data-testid='tile-layer' />,
	Polyline: ({ positions }: { positions: [number, number][] }) => (
		<div data-testid='polyline' data-positions={JSON.stringify(positions)} />
	),
	useMap: () => ({
		getBounds: () => ({
			contains: () => true,
		}),
		setView: vi.fn(),
		getZoom: () => 15,
	}),
}))

// Mock react-leaflet-marker
vi.mock('react-leaflet-marker', () => ({
	MarkerLayer: ({ children }: { children: React.ReactNode }) => (
		<div data-testid='marker-layer'>{children}</div>
	),
	Marker: ({
		position,
		children,
	}: {
		position: [number, number]
		children: React.ReactNode
	}) => (
		<div data-testid='drone-marker' data-position={JSON.stringify(position)}>
			{children}
		</div>
	),
}))
