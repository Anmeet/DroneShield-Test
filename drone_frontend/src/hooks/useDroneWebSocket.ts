/** Hook that manages the websocket connection and update drone position and paths */

import { useEffect, useState } from 'react'
import type { DronePosition } from '../App'

const useDroneWebSocket = () => {
	const [dronePosition, setDronePosition] = useState<DronePosition>({
		latitude: -33.946765,
		longitude: 151.1796423,
	})
	const [path, setPath] = useState<DronePosition[]>([])
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const websocket = new WebSocket('ws://localhost:8080/')

		websocket.onopen = () => {
			console.log('Web Socket connected.')
			setError(null)
		}

		websocket.onmessage = (event) => {
			try {
				const newPosition = JSON.parse(event.data) as DronePosition
				setDronePosition((prevPosition) => {
					// Only update position if it's different
					if (
						prevPosition.latitude === newPosition.latitude &&
						prevPosition.longitude === newPosition.longitude
					) {
						return prevPosition
					}
					// Add new position to path if it's valid
					setPath((prevPath) => [...prevPath, newPosition])
					return newPosition
				})
			} catch (parseError) {
				console.error('Error parsing message data:', parseError)
				setError('Error parsing drone data.')
			}
		}

		websocket.onerror = (errorEvent) => {
			console.error('WebSocket error:', errorEvent)
			setError('WebSocket connection error. Check connection.')
		}

		websocket.onclose = (closeEvent) => {
			console.warn('WebSocket connection closed:', closeEvent)
			setError('WebSocket connection closed.')
		}

		return () => websocket.close()
	}, [])

	return { dronePosition, path, error }
}

export default useDroneWebSocket
