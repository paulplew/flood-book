const handleTimeChange = (event) => {
  const floodSeconds = (event.target.value * 60 * 1000);
  chrome.storage.sync.set({ floodTime: floodSeconds });
}

let timeInput = document.getElementById('time-limit');
timeInput.onchange = handleTimeChange;

chrome.storage.sync.get(['floodTime'], (result) => {
  if (result.floodTime !== undefined) {
    timeInput.value = (result.floodTime / (60 * 1000));
  }
})
