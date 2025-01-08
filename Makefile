app/install:
	yarn

app/compile:
	yarn compile

app/start: app/compile
	yarn start

docker/up: docker/down
	docker compose up -d

docker/down:
	docker compose down
