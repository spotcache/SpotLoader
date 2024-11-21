document.getElementById("download-song").addEventListener("click", async () => {
  const progressBar = document.getElementById("progress-bar");
  const statusMessage = document.getElementById("status-message");

  try {
    // Communicate with the content script to get song info
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const songInfo = await chrome.tabs.sendMessage(tab.id, { action: "getSongInfo" });

    if (songInfo && songInfo.downloadUrl) {
      // Start the download
      const downloadId = await chrome.downloads.download({ url: songInfo.downloadUrl, filename: `${songInfo.title}.mp3` });

      // Update progress bar
      chrome.downloads.onChanged.addListener((delta) => {
        if (delta.id === downloadId && delta.state?.current === "in_progress" && delta.totalBytes && delta.bytesReceived) {
          const progress = (delta.bytesReceived / delta.totalBytes) * 100;
          progressBar.value = progress;
        } else if (delta.id === downloadId && delta.state?.current === "complete") {
          statusMessage.textContent = "Download complete!";
        }
      });
    } else {
      statusMessage.textContent = "Unable to fetch song information.";
    }
  } catch (error) {
    console.error("Error downloading song:", error);
    statusMessage.textContent = "An error occurred. Check console for details.";
  }
});
