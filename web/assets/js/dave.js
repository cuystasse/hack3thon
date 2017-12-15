

// counts the number of credits
    function clickCounter() {
      if (typeof(Storage) !== "undefined") {

        //reset the counter when it reaches 100 and play a sound
        if (sessionStorage.clickcount >= 99) {
          sessionStorage.clickcount = 0;
        }
        //increase the counter, stop the current sound and start a new one
        else if (sessionStorage.clickcount) {
          sessionStorage.clickcount = Number(sessionStorage.clickcount) + 1;
        }
        // set the first credit
        else {
          sessionStorage.clickcount = 1;
        }
        // change INSERT COIN. to CREDITS
        console.log(sessionStorage);
      }
    };

// $('.list-element-you-know')
