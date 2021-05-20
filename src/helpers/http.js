export function http(method, path, body) {
  const user = JSON.parse(localStorage.getItem('user'));
  return fetch(process.env.VUE_APP_BACKEND_URL + path, {
    method: method,
    headers: {
      'Authorization': 'Bearer ' + user.token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  }).then(response => {
    if (response.status == 401)
      document.getElementById('header').dispatchEvent(new Event('disconnect'))
    return response
  })
}

export function httpNoAuth(method, path, body) {
  return fetch(process.env.VUE_APP_BACKEND_URL + path, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
}
