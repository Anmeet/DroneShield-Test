import { useState } from 'react'
import Map from './Map'
import './App.css'
import useDroneWebSocket from './hooks/useDroneWebSocket'

export interface DronePosition {
	latitude: number
	longitude: number
}

const App = () => {
	const { dronePosition, path, error } = useDroneWebSocket()
	const [isAutoCenter, setisAutoCenter] = useState(true)

	const handleAutoCenterChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setisAutoCenter(event.target.checked)
	}

	return (
		<div className='app-container'>
			<div className='checkbox-container'>
				<label>
					<input
						type='checkbox'
						checked={isAutoCenter}
						onChange={handleAutoCenterChange}
					/>
					Auto-Center on Drone
				</label>
			</div>

			{error && <div className='error-message'>{error}</div>}
			<Map
				isAutoCenter={isAutoCenter}
				path={path}
				dronePosition={dronePosition}
			/>
		</div>
	)
}

export default App
