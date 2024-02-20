

console.log("JS starts");

let origin = window.location.origin;
let port = + origin.substring(origin.lastIndexOf(':') + 1);
let neworigin = "http://127.0.0.1:" + port + "/spotify-clone/";

async function getSongs() {
    let songorigin = neworigin + "needed/songs/";

    let data = await fetch(songorigin);
    let songsdata = await data.text();

    let div = document.createElement("div");
    div.innerHTML = songsdata;
    let all_songs = div.getElementsByClassName("icon icon icon-mp3 icon-default");

    // let all_songs = await fetch(neworigin + "needed/sample-songs/data.json").then(response => response.json());
    // console.log(all_songs);

    let songs = [];
    for (let index = 0; index < all_songs.length; index++) {
        songs.push(all_songs[index].href);
    }

    return songs;
}

class Song {
    id;
    title = '';
    description = '';
    artistName = '';
    duration = 0;
    link = '';
    cover = '';

    constructor() {
        this.id;
        this.title = '';
        this.description = '';
        this.artistName = "None";
        this.duration = 0;
        this.link = '';
        this.cover = '';
    }
}

var playing = false;
var currentSong = null;
var songInterval = null;
var currentTime = 0;
var SongTime = 0;

function displayCircle() {
    let circle_left = document.getElementById("circle");
    circle_left.style.left = `${Math.round((Math.round(currentTime * 100) / SongTime) * 100) / 100}%`;
    console.log(`${Math.round((Math.round(currentTime * 100) / SongTime) * 100) / 100}%`);
    currentTime += 0.5;
}

function playSong(song) {
    if(song.id == currentSong) return;
    if (playing) {
        play_pause();
        currentTime = 0;
    }
    
    currentSong = song.id;
    playing = false;
    currentTime = 0;
    play_pause();
    displayOnPlaybar(song);
}

function play_pause() {
    let play = document.getElementById("play_song");

    if (playing) {
        currentSong.pause();
        clearInterval(songInterval);
        console.log("Interval cleared");
        play.src = "needed/play-big.svg";
    } else {
        currentSong.play();
        currentTime = currentTime > 0 ? currentTime : 0;
        SongTime = Math.round(currentSong.duration);
        songInterval = setInterval(displayCircle, 1000);
        play.src = "needed/pause.svg";
    }

    playing = !(playing);
}

function clicked(command) {
    if (command == "play_song") {
        if (currentSong == null) {
            let song = all_Songs[Math.round(Math.random() * 10)];
            displayOnPlaybar(song);
            currentSong = song.id;
        }
        play_pause();
    }
}

function displayOnPlaybar(song) {
    let song_cover = document.getElementById("song-cover-img");
    let song_title = document.getElementsByClassName("song-title")[0];
    let song_desc = document.getElementsByClassName("song-desc")[0];

    song_cover.src = song.cover;
    song_cover.alt = song.id;
    song_title.innerHTML = song.title;
    song_desc.innerHTML = song.description;
}

function addSongs_CardContainer(songs) {
    let all_songs = new Array();

    let card_container = document.getElementById("card-container");
    for (let index = 0; index < songs.length; index++) {
        let element = songs[index];
        element = element;
        let new_song = new Song();

        let div = document.createElement("div");
        div.classList.add("card");
        div.classList.add("border");

        let playbutton = document.createElement("button");
        playbutton.classList.add("button");
        playbutton.classList.add("border-r50");

        let logo_img = document.createElement("img");
        logo_img.classList.add("logo-img");
        logo_img.classList.add("logo");
        logo_img.src = "needed/logo.png";
        logo_img.alt = "logo";

        let cover = document.createElement("img");
        cover.classList.add("cover");
        cover.classList.add("border");
        let findex = element.lastIndexOf("/") + 1;
        let sindex = element.lastIndexOf(".");
        let song_index = element.substring(findex, sindex);
        song_index = song_index.replaceAll("%20", " ");
        cover.src = neworigin + "needed/covers/" + song_index + ".jpg";
        cover.alt = "cover";

        let card_heading = document.createElement("h4");
        card_heading.classList.add("card-heading");
        card_heading.innerText = "Todays Top Hits_" + song_index;

        let card_body = document.createElement("h4");
        card_body.classList.add("card-body");
        card_body.innerText = "Top of hottest 50_" + song_index;

        new_song.id = new Audio(element);
        new_song.id.id = "song_" + song_index;
        new_song.id.preload = "metadata";
        new_song.title = card_heading.innerText;
        new_song.description = card_body.innerText;
        new_song.link = element;
        new_song.cover = cover.src;
        new_song.id.addEventListener("loadeddata", () => {
            new_song.duration = new_song.id.duration;
            playbutton.addEventListener("click", () => {
                playSong(new_song);
            });
        });

        all_songs.push(new_song);

        div.appendChild(playbutton);
        div.appendChild(logo_img);
        div.appendChild(cover);
        div.appendChild(card_heading);
        div.appendChild(card_body);

        card_container.appendChild(div);
    }

    return all_songs;
}

function addSongs_Library(songs) {

    let songUL = document.getElementById("song-list");
    for (let index = 0; index < songs.length; index++) {
        let song = songs[index];
        let li = document.createElement("li");
        li.className = "flex space-between lib-song";

        let ddiv = document.createElement("div");
        ddiv.className = "flex space-between lib-song-details";

        let img = document.createElement("img");
        img.className = "logo lib-song-cover";
        img.src = "needed/music-note.svg";

        let div = document.createElement("div");
        div.className = "flex-v center";

        let h4 = document.createElement("h4");
        h4.innerText = song.title;

        let h6 = document.createElement("h6");
        h6.style.color = "rgb(160, 158, 158)";
        h6.innerHTML = song.artistName;

        div.appendChild(h4);
        div.appendChild(h6);

        ddiv.appendChild(img);
        ddiv.appendChild(div);

        let div2 = document.createElement("div");
        div2.className = "center";

        let button = document.createElement("button");
        button.className = "flex lib-song-play";

        let span = document.createElement("span");
        span.className = "center";
        span.innerText = "Play"
        let img2 = document.createElement("img");
        img2.className = "logo";
        img2.src = "needed/play-lib.svg";

        button.appendChild(span);
        button.appendChild(img2);

        button.addEventListener("click", () => {
            playSong(song);
        });

        div2.appendChild(button);

        li.appendChild(ddiv);
        li.appendChild(div2);

        songUL.appendChild(li);
    }
}

var all_Songs = new Array(Song);
async function main() {
    let songs = await getSongs();

    //add songs to card-container
    all_Songs = addSongs_CardContainer(songs);
    // add songs to library
    addSongs_Library(all_Songs);
}

main();