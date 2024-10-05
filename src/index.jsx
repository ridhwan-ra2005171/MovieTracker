import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"
import App from "./Components/App";
import StarRating from "./Components/StarRating";
import React, {useState} from "react";



const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
    
    {/* <Test/> */}
  </StrictMode>
);


//below is just a test, in case user want to pass down state props like to display the rating as a text.
// function Test(){
//   const [movieRating, setMovieRating] = useState(0)

//   return(
//       <div>
//           <StarRating color="blue" maxRating={10} onSetRating={setMovieRating}/>
//           <p>The movie was rated: {movieRating}</p>
//       </div>
//   )
// }

// can reuse the starrating
{/* <StartRating
      maxRating={5}
      color="red"
      size={100}
    /> */}