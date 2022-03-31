import axios from 'axios'
import { QueryKey, useQuery } from 'react-query'

import { getAxiosError, selectAxiosResponse } from '../lib'

const api = axios.create({
    baseURL: '/api',
})

// Хук useQuery из react-query с дефолтными опциями и модификацией ответа
const useCustomQuery = (keys: QueryKey[], queryFn: () => any, options?: any) =>
    useQuery(keys, queryFn, {
        // Отсеиваем ненужные поля из ответа
        select: selectAxiosResponse,
        onSuccess: (data) => {
            console.log(data)
        },
        onError: (error) => {
            console.error(getAxiosError(error))
        },
        ...options,
    })

export { api, useCustomQuery as useQuery }
