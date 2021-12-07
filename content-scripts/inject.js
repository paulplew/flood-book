const fbColor = '#227bef';

// updates the height of the waves according to the elapsed percentage of the
// given clock
const updateWaves = (clock) => {
  const ocean = document.getElementById('ocean');
  ocean.style.top = `${window.innerHeight - Math.floor(window.innerHeight * (clock.elapsed / clock.startValue))}px`;
}

// updates the clock on the top lefthand side of the page
// call every second using setInterval
// updates the height of the waves if the time is divisible by 10
const updateClock = () => {
  chrome.storage.sync.get('clock', (result) => {
    const clock = result.clock;
    // grab the clock
    const span = document.getElementById('countdown');

    // calculate the HMS for the remaining time
    const [hours, minutes, seconds] = format(clock.startValue - clock.elapsed);

    // update the text on the clock
    span.innerText = `${hours}:${minutes}:${seconds}`;

    // update the clock in storage
    chrome.storage.sync.set({
      'clock': {
        ...clock,
        elapsed: clock.elapsed < clock.startValue ? clock.elapsed + 1 : clock.startValue
      }
    });

    // if the elapsed time is divisible by 10 update the waves
    // will usually update the waves every 10 seconds for a smoother experience
    if (clock.elapsed % 10 === 0) updateWaves(clock);
  });

}

// formats the given number of seconds into hours minutes and seconds
const format = (seconds) => {
  const h = new String(Math.floor(seconds / 3600)).padStart(2, 0);
  seconds -= (h * 3600);
  const m = new String(Math.floor(seconds / 60)).padStart(2, 0);
  seconds -= (m * 60);
  const s = new String(seconds).padStart(2, 0);
  return [h, m, s];
}

// sets up the clock on the upper lefthadn side of the page and the waves that
// are sitting just off the bottom of the screen
// call once
const flood = () => {
  chrome.storage.sync.get('clock', (result) => {
    const clock = result.clock;

    // get the HMS of the total time on the clock
    const [hours, minutes, seconds] = format(clock.startValue - clock.elapsed -
      (clock.paused ? 0 : (Date.now() - clock.started)));

    // create the clock numbers
    const span = document.createElement('span');
    span.id = 'countdown';
    span.style.backgroundColor = fbColor;
    span.style.color = "white";
    span.style.fontSize = '1.75em';
    span.innerText = `${hours}:${minutes}:${seconds}`;

    // style the clock using a div
    const div = document.createElement('div');
    div.id = "container";
    div.style.borderRadius = "1em";
    div.style.position = "sticky";
    div.style.height = "0px"
    div.style.zIndex = "999";
    div.style.top = "0px";
    div.style.left = "0px";
    div.appendChild(span);

    // create two waves 
    // styled using injected css [waves.css] because there are more styling options
    const wave1 = document.createElement('div');
    wave1.className = 'wave';
    const wave2 = document.createElement('div');
    wave2.className = 'wave';

    const ocean = document.createElement('div');
    ocean.id = 'ocean';

    const container = document.createElement('div');
    container.className = 'wave-container';

    // this is what moves the waves 
    ocean.style.top = `${window.innerHeight}px`
    container.append(wave1, wave2);
    ocean.appendChild(container);


    document.body.insertBefore(ocean, document.body.firstChild);
    document.body.insertBefore(div, document.body.firstChild);

    // update the clock every 1 second
    setInterval(updateClock, 1000);

  });

}

// call flood on run
flood();

