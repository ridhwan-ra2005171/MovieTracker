import React, {useRef, useEffect} from "react";

export default function Search({query, setQuery}) {

  //we want the search bar to be the main focus when the user lands
  const inputEl = useRef(null);
  useEffect(function(){

    function callback(e) {

      if(document.activeElement === inputEl.current) {
        return; //dont reset the input
      }

      if(e.key === 'Enter') {
        e.preventDefault();
        inputEl.current.focus();
        setQuery(""); //resets the input
      }
    }

    //we want to focus on search bar when user keydown enter
    document.addEventListener('keydown', callback)

    inputEl.current.focus(); //this is correct way of calling DOM
    //cleanup function
    return()=> document.addEventListener('keydown', callback);
  }, []);

    return(
        <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputEl}
      />
    )
}
