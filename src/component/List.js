import React, { useEffect } from "react";
import { FetchBookList,FetchBookCoverImg } from "../Redux/Action/APIcallAction";
import {useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";


function List(){
    const dispatch = useDispatch()
    useSelector((state)=> {
        console.log("state===>",state)
    })
    return(
        <div>
            <Button onClick={()=>{
                dispatch(FetchBookList())
            }}>call</Button>
        </div>
    )
}

export default List