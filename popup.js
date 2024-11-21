document.getElementById("download-song").addEventListener("click", async () => {
  const progressBar = document.getElementById("progress-bar");
  const statusMessage = document.getElementById("status-message");

  try {
    // Communicate with the content script to get song info
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // Ensure the active tab is valid and send the message
    if (!tab || !tab.id) {
      statusMessage.textContent = "Unable to locate the active Spotify tab.";
      return;
    }

    const songInfo = await chrome.tabs.sendMessage(tab.id, { action: "getSongInfo" });

    // Check if song information was retrieved successfully
    if (songInfo && songInfo.downloadUrl) {
      statusMessage.textContent = "Downloading...";
      progressBar.value = 0;

      // Start the download
      const downloadId = await chrome.downloads.download({
        url: songInfo.downloadUrl,
        filename: `${songInfo.title || "spotify-song"}.mp3`,
      });

      // Update progress bar using the Chrome Downloads API
      chrome.downloads.onChanged.addListener((delta) => {
        if (delta.id === downloadId && delta.state?.current === "in_progress") {
          if (delta.totalBytes && delta.bytesReceived) {
            const progress = (delta.bytesReceived / delta.totalBytes) * 100;
            progressBar.value = progress;
          }
        } else if (delta.id === downloadId && delta.state?.current === "complete") {
          statusMessage.textContent = "Download complete!";
          progressBar.value = 100;
        } else if (delta.id === downloadId && delta.state?.current === "interrupted") {
          statusMessage.textContent = "Download interrupted.";
        }
      });
    } else {
      statusMessage.textContent = "Unable to fetch song information. Make sure you're on a Spotify song page.";
    }
  } catch (error) {
    console.error("Error downloading song:", error);
    statusMessage.textContent = "An error occurred. Check the console for details.";
  }
});
