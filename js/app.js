"use strict";

let dancingCatImages1 = [
    "giphy.gif",
    "sebas-bleizeffer.gif",
    "happy-cat.gif",
    "cat-meme-funny.gif",
    "2063575_8abc6.gif"
];
let dancingCatImages1iterator = 0;
let midiPlay = undefined;
let paused = false;
let stopped = false;
let playingAudio = false;
let navButtons = undefined;
let homeDancingCatInterval = undefined;

document.addEventListener("DOMContentLoaded", () => {
    navButtons = document.querySelectorAll(".nav-link");
    for(let i = 0; i < navButtons.length; i++) {
        navButtons[i].addEventListener("click", navigateWithinContainer);
    }
    navButtons[0].click();
});

function navigateWithinContainer(event) {
    event.preventDefault();
    loadPage(event.target.href);
}

async function loadPage(page) {
    MIDIjs.stop();
    playingAudio = false;
    midiPlay = undefined;

    let pageContent = await fetch(page)
    .then((response) => response.text());
    document.querySelector("#content").innerHTML = pageContent;

    let pageName = page.split("/");
    pageName = pageName[pageName.length-1];

    switch(pageName) {
        case "home.html":
            home();
            break;
        case "art-gallery.html":
            playingAudio = true;
            break;
        case "crypto.html":
            crypto();
            break;
        default:
            break;
    }
    if(pageName !== "home.html")
        clearInterval(homeDancingCatInterval);

    if(midiPlay != undefined)
        MIDIjs.play("./mid/"+midiPlay);
    else {
        playAudioMusics();
    }
}

function playAudioMusics() {
    try { document.querySelector("#audioMusics").play(); } catch(e) { }
}
function pauseAudioMusics() {
    try { document.querySelector("#audioMusics").pause(); } catch(e) { }
}
function stopAudioMusics() {
    try {
        document.querySelector("#audioMusics").pause();
        document.querySelector("#audioMusics").currentTime = 0;
    } catch(e) { }
}

function pauseUnpauseMusicPlayback() {
    if(stopped) {
        stopped = false;
        paused = false;
        if(midiPlay != undefined)
            MIDIjs.play("./mid/"+midiPlay);
        else
            playAudioMusics();
    }
    else {
        if(!paused) {
            paused = true;
            if(midiPlay != undefined)
                MIDIjs.pause();
            else
                pauseAudioMusics();
        } else {
            paused = false;
            if(midiPlay != undefined)
                MIDIjs.resume();
            else
                playAudioMusics();
        }
    }
}
function stopMusicPlayback() {
    MIDIjs.stop();
    stopAudioMusics();
    stopped = true;
    paused = true;
}

function home() {
    midiPlay = "Joost-Cant-Get-Enoof.mid";
    homeDancingCatInterval = setInterval(() => {
        document.querySelector("#dancing-cat-slide-1").src = "./img/"+dancingCatImages1[dancingCatImages1iterator];
        if(dancingCatImages1iterator < dancingCatImages1.length - 1)
            dancingCatImages1iterator++;
        else
            dancingCatImages1iterator = 0;
    }, 2000);
    document.querySelector("#artists-link-art").addEventListener("click", (event) => {
        event.preventDefault();
        navButtons[1].click();
    });
    document.querySelector("#artists-link-music").addEventListener("click", (event) => {
        event.preventDefault();
        navButtons[2].click();
    });
}

function crypto() {
    let videos = document.getElementsByTagName("video");
    for(let i = 0; i < videos.length; i++) {
        videos[i].play();
    }
}