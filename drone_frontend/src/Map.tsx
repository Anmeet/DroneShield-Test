import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import { MarkerLayer, Marker } from 'react-leaflet-marker'
import DroneMarker from './DroneMarker'

const mapStyles = {
	height: 'calc(100vh)',
}

const Map = () => {
	return (
		<MapContainer
			center={[-33.946765, 151.1796423]}
			zoom={14}
			scrollWheelZoom={false}
			style={mapStyles}
		>
			<TileLayer
				attribution=''
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
			/>
			<MarkerLayer>
				<Marker position={[-33.946765, 151.1796423]}>
					<DroneMarker />
				</Marker>
			</MarkerLayer>
		</MapContainer>
	)
}

export default Map
