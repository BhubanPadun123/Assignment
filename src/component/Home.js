import React, { useEffect, useState } from "react";
import { FetchBookList } from "../Redux/Action/APIcallAction";
import { useSelector, useDispatch } from "react-redux";
import BookCard from "./BookCard";
import { FidgetSpinner } from "react-loader-spinner";
import { Grid, Box } from "@mui/material";

function Home(props) {
    const dispatch = useDispatch()
    const [state, setState] = useState({
        roomList: [],
        searchValue: props.searchValue
    })

    const { error, status, response } = useSelector((state) => state.bookList)

    useEffect(() => {
        dispatch(FetchBookList())
    }, [])
    useEffect(() => {
        if (props.searchValue) {
            const filterValue = state.roomList.filter(item => item.title && item.title.toLowerCase().includes(props.searchValue.toLowerCase()))
            if (filterValue.length > 0) {
                setState((prevState) => ({ ...prevState, roomList: filterValue }))
            }
        } else {
            let data_collection = []
            if (response) {
                response.map((item, idx) => {
                    const data = {
                        sl: idx,
                        title: item.bookinfo.work.title,
                        auther: item.bookinfo.work.author_names[0],
                        publishDate: item.bookinfo.logged_date,
                        url: item.bookimg,
                        status: "UNREAD"
                    }
                    data_collection.push(data)
                })
                setState((prevState) => ({ ...prevState, roomList: data_collection }))
            }
        }
    }, [props.searchValue])
    useEffect(() => {
        let data_collection = []
        if (status === "success") {
            response.map((item, idx) => {
                const data = {
                    sl: idx,
                    title: item.bookinfo.work.title,
                    auther: item.bookinfo.work.author_names[0],
                    publishDate: item.bookinfo.logged_date,
                    url: item.bookimg,
                    status: "UNREAD"
                }
                data_collection.push(data)
            })
            setState((prevState) => ({ ...prevState, roomList: data_collection }))
        }
    }, [status])
    const handleToggle = (item) => {
        const newArray = [...state.roomList]
        const findItem = newArray.filter(i => i.title && i.sl == item.sl && i.title.toLowerCase().includes(item.title.toLowerCase()))
        newArray[findItem[0].sl] = {
            auther: "Benjamin Franklin",
            publishDate: "2023/04/26, 19:46:46",
            sl: 2,
            status: item.status === "UNREAD" ? "READ" : "UNREAD",
            title: "Autobiography",
            url: "https://covers.openlibrary.org/b/id/5647361-M.jpg"
        }
        setState((prevState) => ({ ...prevState, roomList: newArray }))
    }
    return (
        <div style={{
            width: "100%",
            textAlign: "center",
            marginTop: "30px"
        }}>
            {
                status === "success" && (
                    <Grid container spacing={4} justifyContent="center" >
                        {
                            Array.isArray(response) && state.roomList.length > 0 &&
                            state.roomList.map((item, idx) => {
                                return (
                                    <Grid item key={idx}>
                                        <Box bgcolor="primary.light" p={2}>
                                            <BookCard
                                                bookData={item}
                                                handleToggle={handleToggle}
                                            />
                                        </Box>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                )
            }
            {
                (status === "started" || status === "failed" || state.roomList.length === 0) &&
                <div style={{ top: "50%" }}>
                    <FidgetSpinner
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="fidget-spinner-loading"
                        wrapperStyle={{}}
                        wrapperClass="fidget-spinner-wrapper"
                    />
                </div>
            }
        </div>
    )
}

export default Home