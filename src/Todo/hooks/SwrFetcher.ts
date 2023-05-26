import useSWR from 'swr'
import { GetMethod } from './fetcher'

const GetTodos = (url: string) => {
    const { data } = useSWR(url, GetMethod)
   
    return data
  }

export default GetTodos 