curl -s http://localhost:5000/signin -X POST \
  -H 'Content-Type: application/json' \
  -d "{\"name\":\"$1\",\"email\":\"$2\"}"
