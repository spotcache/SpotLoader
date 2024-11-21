async function getSongLyrics(song) {
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const targetUrl = `https://genius.com/api/search/?q=${encodeURIComponent(song)}`;

    try {
        const response = await fetch(proxyUrl + targetUrl);
        const data = await response.json();

        try {
            const lyricsResponse = await fetch(proxyUrl + data.response.hits[0].result.url);
            const lyricsText = await lyricsResponse.text();

            const parser = new DOMParser();
            const doc = parser.parseFromString(lyricsText, 'text/html');

            let lyrics = "";
            doc.querySelectorAll('[data-lyrics-container="true"]').forEach((el) => {
                lyrics += el.innerHTML;
            });

            return lyrics;
        } catch (error) {
            console.error("Error fetching lyrics page:", error.message);
        }
    } catch (error) {
        console.error("Error fetching song data:", error.message);
    }
}

function getSongName() {
    return document.querySelector("div:nth-child(1) > div > div > div > div > span > a").innerText;
}

function getSongArtist() {
    return document.querySelector("div:nth-child(3) > div > div > div > div > span > a").innerText;
}

function replaceLyrics(lyrics) {
    const lyricBoxClassName = "custom-lyrics-container";
    const lyricBoxSelector = `.${lyricBoxClassName}`;
    const lyricBox = document.querySelectorAll('[data-testid="fullscreen-lyric"]');

    if (lyricBox && lyricBox.length > 0) {
        lyricBox[0].parentElement.classList.add(lyricBoxClassName);

        for (let i = 1; i < lyricBox.length; i++) {
            lyricBox[i].style.zIndex = "-100";
        }

        const styleSheet = document.styleSheets[0];
        styleSheet.insertRule(`${lyricBoxSelector}:after { bottom: unset!important; }`);
        for (let i = 3; i <= 5; i++) {
            styleSheet.insertRule(`div.main-view-container__scroll-node-child > main > div > div:nth-child(${i}) { z-index: -100; }`);
        }

        lyricBox[0].innerHTML = lyrics;
        lyricBox[0].style.color = "var(--lyrics-color-active)";
    }
}

function updateLyrics() {
    try {
        if (!document.querySelectorAll('[data-testid="fullscreen-lyric"]')[0]) { 
            getSongLyrics(`${getSongName()} by ${getSongArtist()}`).then(function (lyrics) {
                replaceLyrics(lyrics);
            });
        }
    } catch (error) {
        console.error("Error updating lyrics:", error);
    }
}

window.onload = () => {
    const timer = setInterval(() => {
        try {
            const button = document.querySelector("#main > div > div > div > footer > div > div > div > button:nth-child(2)");
            if (button) {
                button.addEventListener("click", updateLyrics);
                clearInterval(timer);
            }
        } catch (error) {
            console.error("Error setting up lyrics button listener:", error);
        }
    }, 250);
};
