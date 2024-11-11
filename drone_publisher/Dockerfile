FROM golang:1.20.2-alpine

WORKDIR /app
COPY . .
RUN go mod vendor
RUN go build -o "drone-pub" ./drone_publisher.go

RUN chmod +x ./drone-pub

CMD ["./drone-pub"]
