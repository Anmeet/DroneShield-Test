import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '../src/__mocks__/reactLeafletMock'
import Map from './Map'
import App from './App'

describe('App Component', () => {
	it('should toggle the isAutoCenter state when checkbox is clicked', () => {
		render(<App />)

		const checkbox = screen.getByLabelText(/Auto-Center on Drone/i)

		// Initially, the checkbox should be checked (autoCenter is true by default)
		expect(checkbox).toBeChecked()

		// Simulate a click event to uncheck the checkbox
		fireEvent.click(checkbox)
		expect(checkbox).not.toBeChecked()

		// Simulate another click to check the checkbox again
		fireEvent.click(checkbox)
		expect(checkbox).toBeChecked()
	})
})

describe('Map Component', () => {
	const defaultProps = {
		dronePosition: {
			latitude: -33.946765,
			longitude: 151.1896423,
		},
		path: [],
		isAutoCenter: true,
	}

	it('renders map with drone marker', () => {
		render(<Map {...defaultProps} />)

		expect(screen.getByTestId('map-container')).toBeInTheDocument()
		expect(screen.getByTestId('drone-marker')).toBeInTheDocument()
	})

	it('renders path when available', () => {
		const props = {
			...defaultProps,
			path: [
				{ latitude: -33.946, longitude: 151.189 },
				{ latitude: -33.947, longitude: 151.19 },
			],
		}

		render(<Map {...props} />)

		const polyline = screen.getByTestId('polyline')
		const positions = JSON.parse(polyline.dataset.positions || '')
		expect(positions).toHaveLength(2)
		expect(positions[0]).toEqual([
			props.path[0].latitude,
			props.path[0].longitude,
		])
	})
})
