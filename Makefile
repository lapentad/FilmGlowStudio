.PHONY: install dev build lint preview docker-build docker-up docker-down clean

install:
	npm install

dev:
	npm run dev

build:
	npm run build

lint:
	npm run lint

preview:
	npm run preview

docker-build:
	docker-compose build

docker-up:
	docker-compose up -d

docker-down:
	docker-compose down

clean:
	rm -rf node_modules dist
