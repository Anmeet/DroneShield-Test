import 'leaflet/dist/leaflet.css'
import { MapContainer, Polyline, TileLayer } from 'react-leaflet'

import type { LatLngTuple } from 'leaflet'
import { Marker, MarkerLayer } from 'react-leaflet-marker'
import type { DronePosition } from './App'
import DroneMarker from './DroneMarker'
import useAutoCenterMap from './hooks/useAutoCenterMap'
import { useEffect, useState } from 'react'
import './Map.css'

const mapStyles = {
	height: 'calc(100vh)',
}

type MapProps = {
	dronePosition: DronePosition
	path: DronePosition[]
	isAutoCenter: boolean
}

type AutoCenterControlProps = Omit<MapProps, 'path'>

const AutoCenterControl: React.FC<AutoCenterControlProps> = ({
	dronePosition,
	isAutoCenter,
}: AutoCenterControlProps) => {
	useAutoCenterMap(dronePosition, isAutoCenter)
	return null
}

const Map = ({ dronePosition, isAutoCenter, path }: MapProps) => {
	const [mapError, setMapError] = useState<string | null>(null)

	// Handle tile loading error
	const handleTileError = () => {
		setMapError(
			'Error loading map tiles. Please check your connection or try again later.'
		)
	}

	useEffect(() => {
		if (
			!dronePosition ||
			!isFinite(dronePosition.latitude) ||
			!isFinite(dronePosition.longitude)
		) {
			setMapError('Invalid drone position.')
		}
	}, [dronePosition])
	return (
		<div className='map-container'>
			{mapError ? (
				<div className='map-error-message'>{mapError}</div>
			) : (
				<MapContainer
					center={[dronePosition.latitude, dronePosition.longitude]}
					zoom={15}
					style={mapStyles}
					whenReady={() => {
						if (
							!dronePosition ||
							!isFinite(dronePosition.latitude) ||
							!isFinite(dronePosition.longitude)
						) {
							setMapError(
								'Failed to initialize map due to invalid drone position.'
							)
						}
					}}
				>
					<TileLayer
						attribution=''
						url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
						eventHandlers={{ tileerror: handleTileError }}
					/>
					<MarkerLayer>
						<Marker
							position={[dronePosition.latitude, dronePosition.longitude]}
						>
							<DroneMarker />
						</Marker>
					</MarkerLayer>

					<Polyline
						pathOptions={{ color: 'red', weight: 1, dashArray: '3, 10' }}
						positions={path.map(
							(pos) => [pos.latitude, pos.longitude] as LatLngTuple
						)}
					/>

					<AutoCenterControl
						dronePosition={dronePosition}
						isAutoCenter={isAutoCenter}
					/>
				</MapContainer>
			)}
		</div>
	)
}

export default Map
