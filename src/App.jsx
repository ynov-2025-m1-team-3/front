import Routes from "./config/router"
import "./App.css"
import { Toaster } from "react-hot-toast";

function App() {
  return ( 
    <>
      <Toaster 
        position="top-left" 
        reverseOrder={true}
      />
      <Routes />
    </>
  ); 
}

export default App;
