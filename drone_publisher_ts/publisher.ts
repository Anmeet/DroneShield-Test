import Redis from 'ioredis'
import { random } from 'lodash'

type Location = {
  latitude: number
  longitude: number
}

class DroneSimulator {
  private redisClient: Redis
  private readonly channelName: string = 'drone_coordinates'
  private currentLocation: Location

  constructor(redisUrl: string) {
    this.redisClient = new Redis(redisUrl)
    this.currentLocation = { latitude: -33.947346, longitude: 151.179428 }
  }

  public startPublishing() {
    setInterval(async () => {
      this.simulateDroneCoordinates()
      const coordinatesJson = JSON.stringify(this.currentLocation)
      try {
        await this.redisClient.publish(this.channelName, coordinatesJson)
      } catch (err) {
        console.error('Error publishing drone coordinates:', err)
      }
    }, 1000)
  }  

  private simulateDroneCoordinates() {
    this.currentLocation.latitude += 0.001 * random(-1, 1)
    this.currentLocation.longitude += 0.001 * random(-1, 1)
  }
}

const droneSimulator = new DroneSimulator('redis://localhost:6379')
droneSimulator.startPublishing()