import { useEffect } from 'react'
import Map from './Map'
import './App.css'

const App = () => {
	useEffect(() => {
		const websocket = new WebSocket('ws://localhost:8080/')

		websocket.onopen = () => {
			console.log('Web Socket connected.')
		}

		websocket.onmessage = (event) => {
			const data = JSON.parse(event.data)
			console.log(data)
		}

	}, [])

	return <Map />
}

export default App
