let visualDisplays = document.querySelectorAll('.num');

let interval = 5000;

visualDisplays.forEach((visualDisplay) => {

  let  startValue = 0;

  let endValue = parseInt(visualDisplay.getAttribute("data-val"));

  let duration = Math.floor( interval / endValue);

  let counter = setInterval( function () {

    startValue += 1;
    visualDisplay.textContent = startValue;

    if(startValue == endValue) {
      clearInterval(counter);
    }
  }, duration);
   
})


  