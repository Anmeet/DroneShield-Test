import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import '../src/__mocks__/reactLeafletMock'
import Map from './Map'
import type { DronePosition } from './App'

const mockPosition: DronePosition = {
	latitude: -33.946765,
	longitude: 151.1796423,
}

describe('Map Component', () => {
	it('displays an error message if dronePosition is invalid on mount', () => {
		// Pass an invalid position to trigger the error
		const invalidPosition = { latitude: NaN, longitude: NaN }

		render(
			<Map dronePosition={invalidPosition} path={[]} isAutoCenter={true} />
		)

		// Verify error message for invalid initial position
		expect(screen.getByText('Invalid drone position.')).toBeInTheDocument()
	})

	it('does not display an error if dronePosition is valid', () => {
		// Pass a valid position and check that no error is shown
		render(<Map dronePosition={mockPosition} path={[]} isAutoCenter={true} />)

		// Check that no error message is displayed
		expect(
			screen.queryByText(/Invalid initial drone position/)
		).not.toBeInTheDocument()
		expect(
			screen.queryByText(/Failed to load map tiles/)
		).not.toBeInTheDocument()
	})

	it('displays map elements correctly if no errors occur', () => {
		// Render with valid data to confirm normal behavior
		render(
			<Map
				dronePosition={mockPosition}
				path={[mockPosition]}
				isAutoCenter={true}
			/>
		)

		// Verify the marker element is rendered
		expect(screen.getByTestId('tile-layer')).toBeInTheDocument()
	})
})
