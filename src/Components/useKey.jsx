import { useEffect } from "react";

//we are creating a custom hook, so it can be a reusable logic
export function useKey(key, action) {
  useEffect(
    function () {

        //when a key is press, do the action
      function callback(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action();
        }
      }

      document.addEventListener("keydown", callback);

      //cleanup function, to remove the event listener, so there isnt 
      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [action, key]
  );
}
