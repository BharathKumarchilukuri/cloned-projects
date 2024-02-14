

console.log("JS starts");

let origin = window.location.origin;
let port = + origin.substring(origin.lastIndexOf(':')+1);
let neworigin = "http://127.0.0.1:"+ port +"/spotify-clone/";

async function getSongs(){
    let songorigin = neworigin + "needed/songs/";

    let data = await fetch(songorigin);
    let songsdata = await data.text();

    let div = document.createElement("div");
    div.innerHTML = songsdata;
    let allsongs = div.getElementsByClassName("icon icon icon-mp3 icon-default");
    
    let songs = [];
    for (let index = 0; index < allsongs.length; index++) {
        songs.push(allsongs[index].href);
    }

    return songs;
}

class Song{
    id;
    title = '';
    description = '';
    duration = 0;
    link = '';
    cover = '';
}

function playSong(song) {
    song.play();
}

async function main() {
    let songs = await getSongs();
    
    let allsongs = new Array(Song);

    //add songs to card-container
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
        let findex = element.lastIndexOf("/")+1;
        let sindex = element.lastIndexOf(".");
        let song_index = element.substring( findex, sindex);
        cover.src = neworigin + "needed/covers/" + song_index + ".jpg";
        cover.alt = "cover";

        let card_heading = document.createElement("h4");
        card_heading.classList.add("card-heading");
        card_heading.innerText = "Todays Top Hits";

        let card_body = document.createElement("h4");
        card_body.classList.add("card-body");
        card_body.innerText = "Top of hottest 50";

        new_song.id = new Audio(element);
        new_song.id.id = "song_" + song_index;
        new_song.id.preload = "metadata";
        new_song.title = card_heading.innerText;
        new_song.description = card_body.innerText;
        new_song.link = element;
        new_song.cover = cover.src;
        new_song.id.addEventListener("loadeddata" ,() => {
            new_song.duration = new_song.id.duration;
            playbutton.addEventListener("click", () =>{
                playSong(new_song.id);
            });
        });
        
        allsongs.push(new_song);

        div.appendChild(playbutton);
        div.appendChild(logo_img);
        div.appendChild(cover);
        div.appendChild(card_heading);
        div.appendChild(card_body);

        card_container.appendChild(div);
    }
}

main();