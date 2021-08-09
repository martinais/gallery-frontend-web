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
        if (response.status === 401)
            document.getElementById('header').dispatchEvent(new Event('disconnect'))
        return response
    })
}

export function httpUpload(file) {
    return hashFile(file).then(hash => httpSendFile(hash, file))
}

function hashFile(file) {
    return file.arrayBuffer()
        .then(buffer => window.crypto.subtle.digest('SHA-1', buffer))
        .then(hBuffer => Array.from(new Uint8Array(hBuffer)))
        .then(hArray => hArray.map(b => b.toString(16).padStart(2, '0')).join(''))
}

function httpSendFile(hash, file) {
    const fd = new FormData()
    fd.append('file', file)
    const user = JSON.parse(localStorage.getItem('user'));
    return fetch(process.env.VUE_APP_BACKEND_URL + '/pic/' + hash, {
        method: 'PUT',
        headers: {'Authorization': 'Bearer ' + user.token},
        body: fd
    }).then(response => {
        if (response.status === 401)
            document.getElementById('header').dispatchEvent(new Event('disconnect'))
        return hash
    })
}

export function httpNoAuth(method, path, body) {
    return fetch(process.env.VUE_APP_BACKEND_URL + path, {
        method: method,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    })
}

export function httpBuildPic(hash, callback) {
    http('GET', '/pic/' + hash).then(data => data.blob().then(blob => {
        const reader = new FileReader();
        reader.onload = () => callback(reader.result)
        reader.readAsDataURL(blob)
    }))
}
