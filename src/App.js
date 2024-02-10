import { useState } from "react";
import ProjectRoute from "./Router";
import Header from "./component/Header";

function App() {
  const [searchValue,setSearchValue] = useState("")
  const onSearchValue=(e)=>{
    setSearchValue(e)
  }
  return (
    <div className="App" style={{width:"100vw",height:"auto",padding:"0px",margin:"0px"}}>
      <Header 
        searchValue={searchValue}
        onSearchValue={onSearchValue}
      />
      <div>
        <ProjectRoute 
           searchValue={searchValue}
        />
      </div>
    </div>
  );
}

export default App;
