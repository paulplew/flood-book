// attached to the reset button will reset the clock and save it
const resetClock = () => {
  chrome.storage.sync.get("clock", (response) => {
    chrome.storage.sync.set({
      'clock': {
        ...response.clock,
        elapsed: 0
      }
    });
  });
}

// when the value is changed on the input update the stored value and the value
// in the clock
const handleTimeChange = (event) => {
  const floodSeconds = (event.target.value * 60);

  chrome.storage.sync.get('clock', (result) => {
    chrome.storage.sync.set({
      floodTime: floodSeconds,
      clock: {
        ...result.clock,
        startValue: Math.max(floodSeconds, result.clock.elapsed)
      }
    });
  });
}

// button to reset the countdown
const resetButton = document.getElementById('reset');
resetButton.onclick = resetClock;

// input for the amount of time allowed on the page
const minutes = document.getElementById('time-input');
minutes.onchange = handleTimeChange;

// get the current allowed time and set it 
chrome.storage.sync.get('floodTime', (result) => {
  minutes.value = result.floodTime / 60;
});