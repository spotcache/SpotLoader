async function getSongLyrics(song) {
    const proxyUrl = "https://cors-anywhere.herokuapp.com/"; // Proxy URL to bypass CORS
    const targetUrl = `https://genius.com/api/search/?q=${encodeURIComponent(song)}`;

    try {
        const response = await fetch(proxyUrl + targetUrl);
        const data = await response.json();

        if (data.response.hits && data.response.hits.length > 0) {
            const lyricsPageUrl = data.response.hits[0].result.url;

            const lyricsResponse = await fetch(proxyUrl + lyricsPageUrl);
            const lyricsPageText = await lyricsResponse.text();

            const parser = new DOMParser();
            const doc = parser.parseFromString(lyricsPageText, "text/html");

            let lyrics = "";
            doc.querySelectorAll('[data-lyrics-container="true"]').forEach((el) => {
                lyrics += el.innerText + "\n"; // Add newline for readability
            });

            return lyrics;
        } else {
            console.error("No lyrics found.");
            return "Lyrics not found.";
        }
    } catch (error) {
        console.error("Error fetching lyrics:", error.message);
        return "Error fetching lyrics.";
    }
}

function getSongName() {
    try {
        return document.querySelector("div[data-testid='track-info-name']").innerText;
    } catch (error) {
        console.error("Error getting song name:", error.message);
        return "Unknown Song";
    }
}

function getSongArtist() {
    try {
        return document.querySelector("div[data-testid='track-info-artists']").innerText;
    } catch (error) {
        console.error("Error getting artist name:", error.message);
        return "Unknown Artist";
    }
}

function replaceLyrics(lyrics) {
    const lyricBox = document.querySelector('[data-testid="fullscreen-lyric"]');

    if (lyricBox) {
        lyricBox.innerHTML = ""; // Clear existing content
        lyricBox.style.color = "var(--lyrics-color-active)"; // Use Spotify's active lyric color
        lyricBox.style.whiteSpace = "pre-wrap"; // Preserve newlines in the lyrics

        // Add fetched lyrics
        const lyricLines = lyrics.split("\n");
        lyricLines.forEach((line) => {
            const lineElement = document.createElement("p");
            lineElement.innerText = line;
            lyricBox.appendChild(lineElement);
        });
    } else {
        console.warn("Lyric box not found.");
    }
}

function updateLyrics() {
    try {
        if (!document.querySelector('[data-testid="fullscreen-lyric"]')) {
            const songName = getSongName();
            const songArtist = getSongArtist();

            if (songName && songArtist) {
                getSongLyrics(`${songName} by ${songArtist}`).then((lyrics) => {
                    replaceLyrics(lyrics);
                });
            } else {
                console.warn("Could not fetch song details.");
            }
        }
    } catch (error) {
        console.error("Error updating lyrics:", error.message);
    }
}

window.onload = () => {
    const timer = setInterval(() => {
        try {
            // Add a click event listener to the lyrics button in the footer
            const button = document.querySelector(
                "#main > div > div > div > footer > div > div > div > button:nth-child(2)"
            );
            if (button) {
                button.addEventListener("click", updateLyrics);
                clearInterval(timer);
            }
        } catch (error) {
            console.log("Error in lyrics button listener:", error.message);
        }
    }, 250);
};
