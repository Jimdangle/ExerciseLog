startb:
	echo "Starting Exercise Log Containers"
	docker-compose up --build
startd:
	docker-compose up --build -d

start:
	docker-compose up

stop:
	docker-compose stop

clean:
	docker-compose rm
	y

buildc:
	docker-compose build --no-cache

build:
	docker-compose build