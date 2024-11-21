chrome.runtime.onInstalled.addListener(() => {
    console.log("Spotify Song Downloader installed.");
});

chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: downloadSong
    });
});

async function downloadSong() {
    try {
        const songUrl = getSongUrl(); // Function to extract song URL from the page
        if (!songUrl) throw new Error("No song URL found.");

        const response = await fetch(songUrl);
        if (!response.ok) throw new Error("Failed to fetch the song.");

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const filename = "downloaded_song.mp3"; // You can modify this to include metadata

        chrome.downloads.download({
            url: url,
            filename: filename,
            saveAs: true
        });
    } catch (error) {
        console.error("Error downloading song:", error.message);
        alert("An error occurred: " + error.message);
    }
}

function getSongUrl() {
    // Logic to extract the song URL from the Spotify page
    // This is a placeholder and should be implemented based on the page structure
    return "https://example.com/song.mp3"; // Replace with actual logic
}
