// on the install of the extension run this code
chrome.runtime.onInstalled.addListener(details => {
  // set the initial flood time
  chrome.storage.sync.set({ "floodTime": (1 * 60) });

  // create a simple clock to keep track of the total time and the elapsed time
  // in seconds
  const clock = {
    startValue: 60,
    elapsed: 0,
  };

  // save the clock
  chrome.storage.sync.set({ "clock": clock  });
});