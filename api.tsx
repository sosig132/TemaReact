
const baseUrl = process.env.EXPO_PUBLIC_API_URL;
const baseHeaders = {
    "Content-Type": 'application/json',
    "Accept": 'application/json',
    "Allow-Access-Control-Origin": '*'
}

export const login = async (email: string, password: string): Promise<string> => {
    const result = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
            ...baseHeaders
        },
        body: JSON.stringify({
            email, password
        })
    })

    const data = await result.json()

    return data.accessToken
};

export const register = async (email: string, password: string) => {
    const result = await fetch(`${baseUrl}/auth/register`, {
        method: 'POST',
        headers: {
            ...baseHeaders
        },
        body: JSON.stringify({
            email, password
        })
    })

    const data = await result.json()

    return data.id;
};

export const getDetails = async (token: string) => {
    const result = await fetch(`${baseUrl}/user/details/me`, {
        method: 'GET',
        headers: {
            ...baseHeaders,
            "Authorization": `Bearer ${token}`
        }
    })

    const json =  await result.json();
    console.log(json)
    return json;
}

export const getGames = async (token: string) => {
    const result = await fetch(`${baseUrl}/game`, {
        method: 'GET',
        headers: {
            ...baseHeaders,
            "Authorization": `Bearer ${token}`
        }
    })

    const json = await result.json();
    console.log(json)
    return json;
}

export const create = async(token:string) =>{

    const result = await fetch(`${baseUrl}/game`, {
        method: 'POST',
        headers: {
            ...baseHeaders,
            "Authorization": `Bearer ${token}`
        }
    })

    const json = await result.json();
    console.log(json)
    return json;
}

export const join = async(token:string, gameId:string) =>{

    const result = await fetch(`${baseUrl}/game/join/${gameId}`, {
        method: 'POST',
        headers: {
            ...baseHeaders,
            "Authorization": `Bearer ${token}`
        }
    })

    const json = await result.json();
    console.log(json)
    return json;
}