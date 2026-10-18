// Wedding details
var WEDDING = new Date("2026-10-21T20:00:00+05:00");
var WA = "923046126754"; // WhatsApp number: country code, no +
var EVENTS = [
  { n: "Mehndi", d: "Wednesday, 21 October 2026", t: "8:00 PM", v: "At home", a: "Sadhoke", i: "✦", u: "https://maps.app.goo.gl/ggSLFmUZMvMbSMZj9" },
  { n: "Barat", d: "Thursday, 22 October 2026", t: "6:10 PM", v: "Madina Palace", a: "Jinnah Road, Gujranwala", i: "❖", u: "https://maps.app.goo.gl/jLhhnRQhTsEJEq5x8" },
  { n: "Walima", d: "Friday, 23 October 2026", t: "6:10 PM", v: "Rafiq Marquee Sadhoke", a: "Sadhoke", i: "♡", u: "https://maps.google.com?ftid=0x391929ca10701299:0x42a3a2af5b9811f8&entry=gps&shh=CAE&lucs=,94297699,100826479,94231188,94280568,100821559,47071704,94218641,94282134,100835699,100840651,94286869,100820247,100822504&g_st=iw" }
];

// Render event cards.
document.getElementById("events").innerHTML = EVENTS.map(function (event) {
  var directionsUrl = event.u || (event.a ? "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(event.v + " " + event.a) : "");
  var directions = directionsUrl ? '<a class="btn" target="_blank" rel="noopener" href="' + directionsUrl + '">Get Directions</a>' : '';

  return '<div class="card event-card rv"><div class="event-icon" aria-hidden="true">' + event.i + '</div><h3>' + event.n + '</h3><p>' + event.d + '</p><p>' + event.t + '</p><p class="v">' + event.v + '</p>' +
    (event.a ? '<p>' + event.a + '</p>' : '') +
    directions + '</div>';
}).join("");

// Open the invitation from its envelope scene.
document.body.classList.add("locked");
document.getElementById("openInvitation").addEventListener("click", function () {
  document.getElementById("opening").classList.add("is-open");
  document.body.classList.remove("locked");
  startMusic();
});

var music = document.getElementById("weddingMusic");
var musicToggle = document.getElementById("musicToggle");
music.volume = .8;

function setMusicState(isPlaying) {
  musicPlaying = isPlaying;
  musicToggle.textContent = isPlaying ? "❚❚" : "♫";
  musicToggle.setAttribute("aria-label", isPlaying ? "Pause wedding music" : "Play wedding music");
  musicToggle.setAttribute("aria-pressed", String(isPlaying));
}

function startMusic() {
  music.play().then(function () {
    setMusicState(true);
  }).catch(function () {
    setMusicState(false);
  });
}

window.addEventListener("load", startMusic);

// Update the countdown clock.
function tick() {
  var difference = WEDDING - new Date();

  if (difference <= 0) {
    document.querySelector(".cd").style.display = "none";
    document.getElementById("done").style.display = "block";
    return;
  }

  var seconds = Math.floor(difference / 1000);
  document.getElementById("d").textContent = Math.floor(seconds / 86400);
  document.getElementById("h").textContent = Math.floor(seconds % 86400 / 3600);
  document.getElementById("m").textContent = Math.floor(seconds % 3600 / 60);
  document.getElementById("s").textContent = seconds % 60;
}

tick();
setInterval(tick, 1000);

// Reveal sections as they enter the viewport.
var revealItems = document.querySelectorAll(".rv");

if ("IntersectionObserver" in window) {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .15 });

  revealItems.forEach(function (element) {
    observer.observe(element);
  });
} else {
  revealItems.forEach(function (element) {
    element.classList.add("in");
  });
}

// Open WhatsApp with a pre-filled RSVP message.
document.getElementById("rsvp").addEventListener("submit", function (event) {
  event.preventDefault();

  var name = document.getElementById("nm").value.trim();
  var guests = document.getElementById("gs").value;
  var attendance = document.querySelector('input[name="a"]:checked').value;
  var message = "Assalam o Alaikum! This is " + name + ". I am " + attendance + " Farooq & Humaira’s wedding. Guests: " + guests + ".";

  window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(message), "_blank");
});

// Reveal a small blessing after the guest sends their RSVP.
document.getElementById("blessingButton").addEventListener("click", function () {
  var blessing = document.getElementById("blessingCard");
  blessing.hidden = false;
  blessing.classList.add("blessing-visible");
});

var musicPlaying = false;

musicToggle.addEventListener("click", function () {
  if (music.paused) {
    startMusic();
  } else {
    music.pause();
    setMusicState(false);
  }
});

// Offer a brief blessing as each invitation section comes into view.
var scrollBlessing = document.getElementById("scrollBlessing");
var blessingTimer;
var blessingSections = document.querySelectorAll("[data-blessing]");

function showScrollBlessing(message) {
  clearTimeout(blessingTimer);
  scrollBlessing.textContent = message;
  scrollBlessing.classList.add("is-visible");
  blessingTimer = setTimeout(function () {
    scrollBlessing.classList.remove("is-visible");
  }, 3600);
}

if ("IntersectionObserver" in window) {
  var blessingObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        showScrollBlessing(entry.target.getAttribute("data-blessing"));
        blessingObserver.unobserve(entry.target);
      }
    });
  }, { threshold: .35 });

  blessingSections.forEach(function (section) {
    blessingObserver.observe(section);
  });
}

// Add marigold garlands, fairy lights, and falling petals.
(function () {
  var garland = document.getElementById("gar");
  var garlandColors = ["#E6C98A", "#C19A6B", "#E0A53A", "#D8B47A"];
  var garlandCount = Math.max(6, Math.min(24, Math.ceil(innerWidth / 48)));

  for (var i = 0; i < garlandCount; i++) {
    var strand = document.createElement("div");
    strand.className = "gl";
    strand.style.cssText = "left:" + (i * 100 / garlandCount) + "%;height:" + (36 + Math.random() * (i % 3 ? 50 : 80)) + "px;--c:" + garlandColors[i % 4] + ";animation-delay:-" + (Math.random() * 4) + "s;animation-duration:" + (3 + Math.random() * 2) + "s";
    garland.appendChild(strand);
  }

  if (matchMedia("(prefers-reduced-motion:reduce)").matches) {
    return;
  }

  var petalColors = ["#F6C5D0", "#FADCE3", "#F2B6C5"];

  for (var j = 0; j < 8; j++) {
    var petal = document.createElement("div");
    var size = 9 + Math.random() * 7;
    petal.className = "pt";
    petal.style.cssText = "left:" + Math.random() * 100 + "vw;width:" + size + "px;height:" + size * 1.3 + "px;background:" + petalColors[j % petalColors.length] + ";--t:" + (9 + Math.random() * 8) + "s;--dl:-" + Math.random() * 14 + "s;--dx:" + (Math.random() * 160 - 80) + "px";
    document.querySelector(".hero").appendChild(petal);
  }
})();

// Animate butterflies in response to the scroll position.
(function () {
  var box = document.getElementById("bf");
  var colors = ["#E6C98A", "#C19A6B", "#D8B47A", "#EBD7A8"];
  var butterflies = [];

  var butterflySvg = function (color) {
    return '<svg viewBox="0 0 40 30"><g class="w" fill="' + color + '"><path d="M20 15C12 0 0 2 3 12C5 19 14 19 20 15Z"/><path d="M20 15C14 20 6 28 12 28C17 28 20 21 20 15Z"/><path d="M20 15C28 0 40 2 37 12C35 19 26 19 20 15Z"/><path d="M20 15C26 20 34 28 28 28C23 28 20 21 20 15Z"/></g><path d="M20 8V22" stroke="#8a6a45" stroke-width="1.6" stroke-linecap="round"/></svg>';
  };

  for (var i = 0; i < 9; i++) {
    var element = document.createElement("div");
    var size = 24 + Math.random() * 22;
    element.className = "b";
    element.style.width = size + "px";
    element.style.setProperty("--fs", (.35 + Math.random() * .3) + "s");
    element.innerHTML = butterflySvg(colors[i % colors.length]);
    box.appendChild(element);
    butterflies.push({
      el: element,
      x: Math.random() * 100,
      y: Math.random() * 100,
      sp: .15 + Math.random() * .4,
      ph: Math.random() * 6.28,
      amp: 20 + Math.random() * 40,
      f: .6 + Math.random() * .8
    });
  }

  function frame(time) {
    var viewportHeight = innerHeight;
    var viewportWidth = innerWidth;
    var scrollPosition = scrollY;
    var height = viewportHeight + 120;

    butterflies.forEach(function (butterfly) {
      var rawY = butterfly.y / 100 * viewportHeight - scrollPosition * butterfly.sp - time * .012 * butterfly.sp * 2;
      var y = ((rawY % height) + height) % height - 60;
      var x = butterfly.x / 100 * viewportWidth + Math.sin(time / 1400 * butterfly.f + butterfly.ph) * butterfly.amp + Math.sin(scrollPosition / 260 + butterfly.ph) * 40;
      var rotation = Math.cos(time / 900 * butterfly.f + butterfly.ph) * 14;
      butterfly.el.style.transform = "translate(" + x + "px," + y + "px) rotate(" + rotation + "deg)";
    });

    if (!matchMedia("(prefers-reduced-motion:reduce)").matches) {
      requestAnimationFrame(frame);
    }
  }

  requestAnimationFrame(frame);
})();
