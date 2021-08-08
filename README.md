# gallery-frontend-web

![](https://img.shields.io/badge/release-Alpha%20Corvi-blue)
![](https://img.shields.io/badge/Release&Alpha%20Corvi&blue) 


## development setup

Start app:
```bash
make up && make run
```

Register your user:
```bash
curl http://localhost:5000/signin \
  -X POST \
  -H 'Content-Type: application/json' \
  -d '{"name":"tristan","email":"tristan@tic.sh"}'
```
