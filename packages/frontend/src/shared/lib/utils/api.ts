function getAxiosError(error: any) {
    return error?.response?.data || error
}

function selectAxiosResponse(response: any) {
    return {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        data: response.data,
    }
}

export { getAxiosError, selectAxiosResponse }
