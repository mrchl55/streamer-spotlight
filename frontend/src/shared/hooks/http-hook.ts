import {useCallback, useState, useEffect} from "react";

export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    const sendRequest = useCallback(async (url: string, method = 'GET', body: any = null, headers: any = {}) => {
        setIsLoading(true)
        setError(false)
        try {
            const response = await fetch(url, {
                method,
                body,
                headers
            })
            const responseData = await response.json()
            if (!response.ok) {
                throw new Error(responseData.message)
            }
            setError(false)
            setIsLoading(false)
            return responseData
        } catch (err: any) {
            console.log(err.message)
            setError(err.message)
            setIsLoading(false)
            throw err;
        }

    }, [])
    return {isLoading, error, sendRequest}
}