import {BookCoverImgReducer,BookListReducer} from "./index"
import { combineReducers } from "redux"


const rootReducer = combineReducers({
    bookList: BookListReducer,
    cover:BookCoverImgReducer
})

export default rootReducer