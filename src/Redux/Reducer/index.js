import * as actionTypes from "../Action/ActionTypes"


const initialState = {
    status:"",
    response:[],
    error:[]
}

export const BookListReducer=(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.FETCH_BOOK_LIST:
            state = {
                status:"started",
                response:[],
                error:[]
            }
            return state
        case actionTypes.FETCH_BOOK_LIST_RESPONSE:
            state = {
                status:"success",
                response:action.payload,
                error:[]
            }
            return state
        case actionTypes.FETCH_BOOK_LIST_ERROR:
            state = {
                status:"failed",
                response:[],
                error:action.payload
            }
            return state
        default:
            return state
    }
}

export const BookCoverImgReducer=(state=initialState,action)=> {
    switch(action.type){
        case actionTypes.FETCH_BOOK_COVER_IMG:
            state = {
                status:"started",
                response:[],
                error:[]
            }
            return state
        case actionTypes.FETCH_BOOK_COVER_IMG_RESPONSE:
            state ={
                status:"success",
                response:action.payload,
                error:[]
            }
            return state
        case actionTypes.FETCH_BOOK_COVER_IMG_ERROR:
            state = {
                status:"failed",
                response:[],
                error: action.payload
            }
            return state
        default:
            return state
    }
}