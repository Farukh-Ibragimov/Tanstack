const BASE_URL = "http://localhost:3000"

class ApiError extends Error{
    constructor( response) {
        super("ApiError" + response.status)
    }
}

export const jsonApiInstance = async (url,init ) =>{
    let headers = init?.headers ?? {}
    if(init?.json){
        headers = {
            'Content-Type': 'application/json',
            ...headers
        }
        init.body = JSON.stringify(init.json)
    }
    const result = await fetch(`${BASE_URL}${url}`,{
        ...init,
        headers
    })
    if(!result.ok){
        throw new ApiError(result)
    }
    return await result.json()
    //msdckasjdkljlasdkfjklsdjfkl
}
