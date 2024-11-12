/**Hook that enables map to auto center only when necessary */

import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import type { DronePosition } from '../App'

const useAutoCenterMap = (position: DronePosition, isAutoCenter: boolean) => {
	const map = useMap()

	useEffect(() => {
		if (isAutoCenter) {
			const mapBounds = map.getBounds()
			const isVisible = mapBounds.contains([
				position.latitude,
				position.longitude,
			])

			if (!isVisible) {
				map.setView([position.latitude, position.longitude], map.getZoom())
			}
		}
	}, [position, isAutoCenter, map])
}

export default useAutoCenterMap
