import React, { useEffect, useState } from 'react'
import apiClient from '../utils/api-client';

const useData = (url, customConfig, deps) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true);
        const getData = async () => {
            try {
                const res = await apiClient.get(url, customConfig);
                if (res.status === 200) {
                    setData(res.data);
                    setIsLoading(false)
                }
            } catch (error) {
                console.error(error.message);
                setIsLoading(false)
            }
        };
        getData();
    }, deps ? deps : []);

    return [data, isLoading]

}

export default useData