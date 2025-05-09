import { useState } from 'react'
import { axiosInstance } from '../api/axiosInstance'

export default function useGetData<T>(url:string,initalState:T) {
    const [data, setData] = useState(initalState)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)

    const getData = async () => {
        setError(null)
        setIsLoading(true)
        try {
            const response = await axiosInstance.get(url)
            setData(response.data)
        } catch (error: any) {
            const errMess = await error.response.data.message
            setError(errMess)
            alert(errMess)
        } finally {
            setIsLoading(false)
        }
    }

    return { getData, data, setData, isLoading, error }
}