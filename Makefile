start:
	echo "Starting Exercise Log Containers"
	docker-compose up --build -d

stop:
	docker-compose stop

clean:
	docker-compose rm
	y

buildc:
	docker-compose build --no-cache

build:
	docker-compose build