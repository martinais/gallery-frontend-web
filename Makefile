DCEXEC=docker-compose exec -u node -w /usr/src/app frontend

up:
	docker-compose build
	docker-compose up -d
	$(DCEXEC) npm install
	$(DCEXEC) npm run serve

down:
	docker-compose down
	
shell:
	$(DCEXEC) bash

root:
	docker-compose exec frontend bash
