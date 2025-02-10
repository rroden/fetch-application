const BASE_URL = "https://frontend-take-home-service.fetch.com"

export interface DogSearchResult {
    resultIds: string[];
    total: number;
    next: string;
    prev: string;
}

export interface DogResult {
    img: string;
    name: string;
    age: number;
    breed: string;
    zip_code: string;
    id: string;
}

export interface MatchResult {
    match: string;
}

export async function getDogs(sort?: string, breed?: string): Promise<DogSearchResult> {
    const headers = new Headers()
    headers.append("Content-Type", "application/json")

    const querySort = sort ?? 'breed:asc'

    const params = {
        size: '10',
        sort: querySort,
    }

    const queryParams = new URLSearchParams(params);

    if (breed) {
        queryParams.append("breeds", breed);
    }

    const response = await fetch(`${BASE_URL}/dogs/search?${queryParams.toString()}`,
        {   method: "GET", 
            headers: headers, 
            credentials: "include",
        });

    const data = await response.json();
    return data;
}

export async function getDogDetails(resultIds: string[]): Promise<DogResult[]> {
    const headers = new Headers()
    headers.append("Content-Type", "application/json")
    const response = await fetch(`${BASE_URL}/dogs`,
        { method: "POST", body: JSON.stringify(resultIds), headers: headers, credentials: "include"});
    const data = await response.json();
    return data;
}

export async function fetchNextPage(path: string): Promise<DogSearchResult> {
    const headers = new Headers()
    headers.append("Content-Type", "application/json")
    const response = await fetch(`${BASE_URL}${path}`,
        { method: "GET", headers: headers, credentials: "include"});
    const data = await response.json();
    return data;
}

export async function getDogBreeds() {
    const headers = new Headers()
    headers.append("Content-Type", "application/json")
    const response = await fetch(`${BASE_URL}/dogs/breeds`,
        { method: "GET", headers: headers, credentials: "include"});
    const data = await response.json();
    return data;
}

export async function getMatchId(favorites: string[]): Promise<MatchResult> {
    const headers = new Headers()
    headers.append("Content-Type", "application/json")
    const response = await fetch(`${BASE_URL}/dogs/match`,
        { method: "POST", body: JSON.stringify(favorites), headers: headers, credentials: "include"});
    const data = await response.json();
    return data;
}
