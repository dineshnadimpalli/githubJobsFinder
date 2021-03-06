import { useReducer, useEffect } from "react"
import axios from "axios"
import data from './data.json'

const ACTIONS = {
    MAKE_REQUEST: 'make-request',
    GET_DATA: 'get-data',
    ERROR: 'error',
    UPDATE_HAS_NEXT_PAGE: 'update-has-next-page'
}

const BASE_URL = '/positions.json'

function reducer(state, action){
    switch(action.type){
        case ACTIONS.MAKE_REQUEST: 
            return {
                jobs: [],
                loading: true
            }
        case ACTIONS.GET_DATA:
            return {
                ...state,
                jobs: action.payload.jobs,
                loading: false
            }
        case ACTIONS.ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                jobs: []
            }
        case ACTIONS.UPDATE_HAS_NEXT_PAGE:
            return {
                ...state,
                hasNextPage: action.payload.hasNextPage
            }
        default:
            return state
    }
}


export default function useFetchJobs(params, page){
    const [state, dispatch] = useReducer(reducer, { jobs: [], loading: true })

    useEffect(()=>{
        const cancelToken1 = axios.CancelToken.source()
        const cancelToken2 = axios.CancelToken.source()

        dispatch({
            type: ACTIONS.MAKE_REQUEST
        })
        axios.get(
            BASE_URL, 
            {
                cancelToken: cancelToken1.token,
                params: { markdown: true, page: page, ...params, limit: 10 }
            }
        ).then(res=>{
            // console.log(res)
            dispatch({
                type: ACTIONS.GET_DATA,
                payload: {
                    jobs: res.data
                    // jobs: res.data.data  (if you use http://localhost:8000 backend server instead of "proxy" from package.json)
                    // This is done to prevent CORS issues
                }
            })
        }).catch(err=>{
            if(axios.isCancel(err)) return
            dispatch({
                type: ACTIONS.ERROR,
                payload: {
                    error: err
                }
            })
        })

        axios.get(
            BASE_URL, 
            {
                cancelToken: cancelToken2.token,
                params: { markdown: true, page: page+1, ...params, limit: 10 }
            }
        ).then(res=>{
            dispatch({
                type: ACTIONS.UPDATE_HAS_NEXT_PAGE,
                payload: {
                    hasNextPage: res.data.length !== 0
                    // hasNextPage: res.data.data.length !== 0  (if you use http://localhost:8000 as your "BASE_URL" (nodejs backend server) instead of "proxy" from package.json)
                    // This is done to prevent CORS issues
                }
            })
        }).catch(err=>{
            if(axios.isCancel(err)) return
            dispatch({
                type: ACTIONS.ERROR,
                payload: {
                    error: err
                }
            })
        })

        return ()=>{
            cancelToken1.cancel()
            cancelToken2.cancel()
        }
    }, [params, page])    

    return state
}