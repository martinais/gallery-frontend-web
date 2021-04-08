PGDB=gallery 		# TODO: take that from .env
PGUSER=postgres 	# TODO: take that from .env

DC=docker-compose
FEEXEC=$(DC) exec -u node -w /usr/src/app frontend
PGEXEC=$(DC) exec database psql -U $(PGUSER)

up:
	$(DC) build
	$(DC) up -d && sleep 3
	$(MAKE) reset
	$(FEEXEC) npm install

run:
	$(FEEXEC) npm run serve

reset:
	-$(PGEXEC) -c '\l' | grep $(PGDB) && $(PGEXEC) -c "DROP DATABASE $(PGDB)"
	$(PGEXEC) -c "CREATE DATABASE $(PGDB)"
	$(DC) exec backend python -c 'import model; model.migrate_database()'
	$(DC) exec kvstore redis-cli flushdb

down:
	$(DC) down --volumes
	
logs:
	$(DC) logs -f

shell:
	$(FEEXEC) bash

root:
	$(DC) exec frontend bash
