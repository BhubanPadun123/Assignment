import * as actionTypes from "./ActionTypes"
import axios from "axios"

let data_collection = []
export const FetchBookList = () => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.FETCH_BOOK_LIST,
            payload: {}
        })
        const result = await (await axios.get(`https://openlibrary.org/people/mekBot/books/already-read.json`)).data
        if (result.reading_log_entries) {
            result.reading_log_entries.map(async (item) => {
                const img = (await axios.get(`https://covers.openlibrary.org/b/id/${item.work.cover_id}-M.jpg`)).config.url
                const itemData = {
                    bookinfo: item,
                    bookimg: img
                }
                data_collection.push(itemData)
            })
        }
        if (data_collection.length > 0) {
            dispatch({
                type: actionTypes.FETCH_BOOK_LIST_RESPONSE,
                payload: data_collection
            })
        }
        else {
            dispatch({
                type: actionTypes.FETCH_BOOK_LIST_ERROR,
                payload: "error"
            })
        }
    } catch (err) {
        dispatch({
            type: actionTypes.FETCH_BOOK_LIST_ERROR,
            payload: err
        })
    }
}
export const FetchBookCoverImg = (cover_id) => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.FETCH_BOOK_COVER_IMG,
            payload: {}
        })
        await axios.get(`https://covers.openlibrary.org/b/id/${cover_id}-M.jpg`).then((res) => {
            dispatch({
                type: actionTypes.FETCH_BOOK_COVER_IMG_RESPONSE,
                payload: res.config.url
            })
        }).catch((error) => {
            dispatch({
                type: actionTypes.FETCH_BOOK_COVER_IMG_ERROR,
                payload: error
            })
        })
    } catch (err) {
        dispatch({
            type: actionTypes.FETCH_BOOK_COVER_IMG_ERROR,
            payload: err
        })
    }
}

