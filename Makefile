app/install:
	yarn

app/compile:
	yarn clean
	yarn compile

app/lint/fix:
	yarn fix

app/prod/start: app/compile
	yarn dev

app/dev/start:
	yarn dev

docker/up: docker/down
	docker compose up -d

docker/down:
	docker compose down
