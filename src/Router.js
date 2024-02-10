import React from "react";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Home from "./component/Home";


const PageRoute = React.lazy(()=> import("./component/List"))


const ProjectRoute =(props)=>{
    return(
        <React.Suspense fallback={<>Loading.....</>}>
            <Router>
                <Routes>
                    <Route path="/" element={<Home searchValue={props.searchValue}/>} />
                    <Route path="/list" element={<PageRoute/>} />
                </Routes>
            </Router>
        </React.Suspense>
    )
}

export default ProjectRoute