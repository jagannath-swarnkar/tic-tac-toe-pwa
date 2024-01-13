import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import swDev from "./swDev";


let deferredPrompt;
const handleBeforeInstallPrompt = (event) => {
  console.log('event', event)
    // Prevent the default behavior to avoid showing the browser's default installation prompt
    event.preventDefault();

    // Store the event for later use
    deferredPrompt = event;

    // Optionally, you can show your own custom UI to prompt the user to install the app
    // This UI could be a button or any other element that triggers the installation
    // when clicked.

    // For example, you might have a button with an onClick handler that calls promptInstallation()
    // <button onClick={promptInstallation}>Install App</button>
};
window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
window.promptInstallation = () => {
  console.log('deferredPrompt', deferredPrompt)
    if (deferredPrompt) {
        // Show the installation prompt
        deferredPrompt.prompt();

        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === "accepted") {
                console.log("User accepted the installation");
            } else {
                console.log("User dismissed the installation");
            }

            // Reset deferredPrompt to null after prompting
            deferredPrompt = null;
        });
    }
};


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

swDev();
reportWebVitals();