const BASE_URL = "https://frontend-take-home-service.fetch.com"

export async function logOut(): Promise<boolean> {
    const headers = new Headers()
    headers.append("Content-Type", "application/json")
    const response = await fetch(`${BASE_URL}/auth/logout`,
        { method: "POST", headers: headers, credentials: "include"});
    return response.ok;
}

export async function logIn(name: string, email: string): Promise<boolean> {
    const headers = new Headers()
    headers.append("Content-Type", "application/json")
    const response = await fetch(`${BASE_URL}/auth/login`,
        { method: "POST", body: JSON.stringify({name: name, email: email}), headers: headers, credentials: "include"});
    return response.ok
}
