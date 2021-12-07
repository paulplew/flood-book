chrome.runtime.onInstalled.addListener(details => {
  chrome.storage.sync.set({ "floodTime": (15 * 60000) });

  const clock = {
    startValue: 15 * 60000,
    started: -1,
    elapsed: 0
  };

  chrome.storage.sync.set({ "clock": clock  });
});

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, ([tab]) => {
    const regex = new RegExp('facebook');

    if (regex.test(tab.url)) {}
  });
})
