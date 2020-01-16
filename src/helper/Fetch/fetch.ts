
/*
EXAMPLE

try{
    const data = await sendPostWithJsonResponse(url, formData);
    console.log('Request succeeded with JSON response', data);
}catch(error){
    console.log('Request failed', error);
}
*/
export const sendPostWithJsonResponse = async (
    url: string, 
    data: FormData, 
    headers?: {[key:string]: string}) => 
{

    const response = await post(url, data, headers);

    if(response.status !== 200) throw new Error("Bad response");

    return await response.json();
};

export const sendGetWithJsonResponse = async (url: string) => 
{
    const response = await fetch(url);

    if(response.status !== 200) throw new Error("Bad response");

    return await response.json();
};

const status = (response: Response) => {
    //console.log(response);
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
}

const json = (response: Response) => {
    return response.json()
}

export const post = (url: string, data: FormData, headers?: {[key:string]: string}) => {

    //if we use FormData, it add headers by themselve
    return fetch(url, {
        method: 'post',
        headers: headers,
        body: data
    });
}

