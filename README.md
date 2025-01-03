# Spotify Ad Blocker Browser Extension  

## 🎵 Overview  
The Spotify Ad Blocker is a browser extension that enables users to block ads for an uninterrupted listening experience. This extension is lightweight, fast, and designed to enhance your Spotify experience.  

⚠️ **Disclaimer**: This extension is intended for personal and educational purposes only. Please ensure you comply with Spotify's Terms of Service and your local copyright laws.  

---

## 🚀 Features

### Ad Blocker  
- Skip all Spotify ads automatically.  
- Block requests to ad-related Spotify domains.  
- Lightweight implementation ensures smooth performance.  

---

## 🛠 Installation  

### 1. Clone the Repository  
Run the following commands in your terminal to clone the repository: 

```
git clone https://github.com/spotcache/SpotLoader.git  
cd SpotLoader
```

### 2. Load the Extension in Your Browser
Open your browser and go to the extensions page:

Chrome: chrome://extensions/

Edge: edge://extensions/

Firefox: about:debugging#/runtime/this-firefox

Brave: brave://extensions/

# Drag and drop the original repo folder into your browser's extensions page.

## Enable Developer Mode or equivalent.

Click on "Load unpacked" and select the folder where the repository was cloned.

## 🛡 Ad Blocker Functionality
This extension includes ad-blocking capabilities to provide an uninterrupted Spotify listening experience. Ads are blocked by redirecting ad-related requests to blank audio files. Here's how it works:

Ads are replaced with a silent, blank audio file (blank.mp3).
Key ad domains such as audio-ak-spotify-com.akamaized.net and audio-fa.scdn.co are targeted.
Implementation Details
The ad-blocking functionality is defined in the rules.json file using declarativeNetRequest rules, ensuring minimal impact on browser performance.

## 📜 License
This extension is licensed under the MIT License.

## 🔧 Contributing
Pull requests are welcome! For significant changes, please open an issue to discuss your ideas first.

### ⚠️ Disclaimer
This extension is intended for personal and educational use only. Downloading copyrighted material without authorization may violate copyright laws. Please use responsibly.

### File Summary:  
1. Installation instructions include both cloning the repository and loading it into the browser.  
2. Ad blocker functionality is described in its own section.  
3. Legal disclaimers and license information are clearly included.  
