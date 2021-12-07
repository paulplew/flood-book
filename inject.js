const fbColor = '#227bef';

const update = () => {
  chrome.storage.sync.get('clock', (result) => {
    const clock = result.clock;
    const span = document.getElementById('countdown');

    const [hours, minutes, seconds] = format(clock.startValue - clock.elapsed -
      (clock.paused ? 0 : (Date.now() - clock.started)));

    span.innerText = `${hours}:${minutes}:${seconds}`;
  });
}

const format = (milliseconds) => {
  const hours = new String(Math.floor(milliseconds / 3600000)).padStart(2, 0);
  milliseconds -= (hours * 3600000);
  const minutes = new String(Math.floor(milliseconds / 60000)).padStart(2, 0);
  milliseconds -= (minutes * 60000);
  const seconds = new String(Math.floor(milliseconds / 1000)).padStart(2, 0);
  return [hours, minutes, seconds];
}

const flood = () => {
  chrome.storage.sync.get('clock', (result) => {
    const clock = result.clock;
    if (clock.started === -1) {
      clock.started = Date.now();
    }
    clock.paused = false;

    const [hours, minutes, seconds] = format(clock.startValue - clock.elapsed -
      (clock.paused ? 0 : (Date.now() - clock.started)));


    const span = document.createElement('span');
    span.id = 'countdown';
    span.style.backgroundColor = fbColor;
    span.style.color = "white";
    span.innerText = `${hours}:${minutes}:${seconds}`;
    span.style.position = "absolute";
    span.style.zIndex = "999";
    span.style.top = "0px";
    span.style.left = "0px";

    const div = document.createElement('div');
    div.id = "container";
    div.style.padding = "1px";
    div.style.borderRadius = "1em";
    div.appendChild(span);

    const wave1 = document.createElement('div');
    wave1.className = 'wave';

    const wave2 = document.createElement('div');
    wave2.className = 'wave';

    const ocean = document.createElement('div');
    ocean.id = 'ocean';
    ocean.style.zIndex = "999";
    ocean.append(wave1, wave2);

    document.body.append(div, ocean);
    console.log('TESTING');

    setInterval(update, 1000)

    chrome.storage.sync.set({ clock: clock });
  });

}

flood();

