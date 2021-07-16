# gallery-frontend-web

## development setup

Start app:
```bash
make up && make run
```

Register your user:
```bash
curl http://localhost:5000/signin \
  -X POST \
  -d '{"name":"tristan","email":"tristan@tic.sh"}' \
  -H 'Content-Type: application/json'
```
