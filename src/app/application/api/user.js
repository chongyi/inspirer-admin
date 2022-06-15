export async function getUserProfile() {
    return await fetch('/api/security/profile')
}

export async function login(payload) {
    return await fetch('/api/login', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
}