const density = ' .,-~_+:iabc*#MW&8%B@$'
//const density = '        .:Ã¢â€“â€˜Ã¢â€“â€™Ã¢â€“â€œÃ¢â€“Ë†';

let video;
let asciiDiv;

let slider

function setup() {
  noCanvas();

  video = createVideo("film_720p.mp4");
  video.autoplay = true;
  video.controls = false;
  video.muted = true;
  video.playsinline = true;
  video.pause();
  video.size(90, 40);
  asciiDiv = createDiv();
  slider = createSlider(3, 40, 5);
  slider.addClass("mySliders");
  //input = createInput("Test")
}

function vidLoad() {
  video.loop();
  video.volume(0);
}

function draw() {
  video.hide()
  video.loadPixels();
  let asciiImage = "";
  for (let j = 0; j < video.height; j++) {
    for (let i = 0; i < video.width; i++) {
      const pixelIndex = (i + j * video.width) * 4;
      const r = video.pixels[pixelIndex + 0];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];
      const avg = (r + g + b) / slider.value();
      const len = density.length;
      const charIndex = floor(map(avg, 0, 255, 0, len));
      const c = density.charAt(charIndex);
      if (c == " ") asciiImage += "&nbsp;";
      else asciiImage += c;
    }
    asciiImage += '<br/>';
  }
  asciiDiv.html(asciiImage);

}

function playPause() {
  const isVideoPlaying = video => !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2);
  if (isVideoPlaying) {
    video.play();
    video.muted = false;
    video.volume(1);
  }

  var aud = document.getElementById("ascii-script");
  aud.onplay = function () {
    alert("The audio has started to play");
  };

  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }

  // Your code here
}


// Modal Javascript
// playPause() Jetzt beim Button Klick
// Button Klick entfernt opened so das modal nichtmehr sichtbar ist
document.getElementById('closemodale').addEventListener("click", function () {
  playPause();
  document.getElementById('modal').classList.remove('opened');
});
