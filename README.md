# gallery-frontend-web

![](https://img.shields.io/badge/release-Alpha%20Corvi-blue)
![](https://img.shields.io/badge/Release&Alpha%20Corvi&blue)


![](https://img.shields.io/badge/Vue.js-1.0.0.svg?logo=vue&logoColor=white)
![](https://img.shields.io/badge/Release&Alpha%20Corvi&blue)
Python-3.9.0-blue.svg?logo=python&logoColor=white&

## Release

| Release name    | Release | Contains                                         |
|-----------------|:-------:|--------------------------------------------------|
|        -        | V-0.0.1 | Basic application slice to test out architecture |
|        -        | V-0.0.4 | Login system using mailing security              |
|        -        | V-0.1.0 | Album structure and picture addition             |
|        -        | V-0.1.1 | Main design of core front                        |
| Named version 1 | V-0.1.2 | First public release of working core application |
|                 |         |                                                  |

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
