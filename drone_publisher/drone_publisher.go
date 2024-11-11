package main

import (
	"context"
	"encoding/json"
	"fmt"
	"math/rand"
	"time"

	"github.com/go-redis/redis/v8"
)

type Location struct {
	Latitude  float64 `json:"latitude"`
	Longitude float64 `json:"longitude"`
}

func main() {
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr: "redis:6379", // Replace with your Redis server address
	})

	for {
		coordinates, _ := json.Marshal(simulateDroneCoordinates())

		err := rdb.Publish(ctx, "drone_coordinates", coordinates).Err()
		if err != nil {
			fmt.Println("Error publishing drone coordinates:", err)
		}

		time.Sleep(time.Second)
	}
}

func simulateDroneCoordinates() Location {
	location := Location{Latitude: -33.947346, Longitude: 151.179428}

	location.Latitude = location.Latitude + rand.Float64()*0.001
	location.Longitude = location.Longitude + rand.Float64()*0.001

	return location
}
