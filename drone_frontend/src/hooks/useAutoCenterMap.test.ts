import { renderHook } from '@testing-library/react'
import { useMap } from 'react-leaflet'

import useAutoCenterMap from './useAutoCenterMap'
import type { DronePosition } from '../App'

vi.mock('react-leaflet', () => ({
	useMap: vi.fn(),
}))

describe('useAutoCenterMap', () => {
	const mockMap = {
		getBounds: vi.fn(),
		setView: vi.fn(),
		getZoom: vi.fn().mockReturnValue(15),
	}

	beforeEach(() => {
		vi.clearAllMocks()
		;(useMap as any).mockReturnValue(mockMap)
	})

	it('should auto-center the map when the drone is out of bounds', () => {
		const position: DronePosition = { latitude: 50, longitude: 10 }

		// Mock getBounds to return bounds that do not contain the position
		mockMap.getBounds.mockReturnValue({
			contains: () => false,
		})

		renderHook(() => useAutoCenterMap(position, true))

		expect(mockMap.setView).toHaveBeenCalledWith([50, 10], 15)
	})

	it('should not auto-center the map if the position is within bounds', () => {
		const position: DronePosition = { latitude: 50, longitude: 10 }

		// Mock getBounds to return bounds that contain the position
		mockMap.getBounds.mockReturnValue({
			contains: () => true,
		})

		renderHook(() => useAutoCenterMap(position, true))

		expect(mockMap.setView).not.toHaveBeenCalled()
	})

	it('should not auto-center the map when autoCenter is false', () => {
		const position: DronePosition = { latitude: 50, longitude: 10 }

		renderHook(() => useAutoCenterMap(position, false))

		expect(mockMap.setView).not.toHaveBeenCalled()
	})
})
