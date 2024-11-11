package main

import (
	"context"
	"net/http"

	"github.com/go-redis/redis/v8"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func main() {
	http.HandleFunc("/", handleWebSocket)
	http.ListenAndServe(":8080", nil)
}

func handleWebSocket(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		return
	}

	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr: "redis:6379", // Replace with your Redis server address
	})

	pubsub := rdb.Subscribe(ctx, "drone_coordinates")
	ch := pubsub.Channel()

	for msg := range ch {
		err := conn.WriteMessage(websocket.TextMessage, []byte(msg.Payload))
		if err != nil {
			return
		}
	}
}
