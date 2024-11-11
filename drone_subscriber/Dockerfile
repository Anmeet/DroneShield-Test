FROM golang:1.20.2-alpine

WORKDIR /app
COPY . .
RUN go mod vendor
RUN go build -o "drone-sub" ./drone_subscriber.go

RUN chmod +x ./drone-sub

CMD ["./drone-sub"]
