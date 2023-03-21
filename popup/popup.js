function listenForChange() {
    const speed = document.getElementById("speed");

    speed.addEventListener("change", (e) => {
        const { value } = e.target;
        
        function setSpeed(tabs) {
            browser.tabs.sendMessage(tabs[0].id, {
                command: "setSpeed",
                speed: value
            });
        }
        function reportError(error) {
            console.error(`Could not set speed: ${error}`);
        }

        browser.tabs.query({ active: true, currentWindow: true })
            .then(setSpeed)
            .catch(reportError);
    });
}

function reportExecuteScriptError(error) {
    document.querySelector("#popup-content").classList.add("hidden");
    document.querySelector("#error-content").classList.remove("hidden");
    console.error(`Failed to execute setSpeed content script: ${error.message}`);
}

browser.tabs
    .executeScript({ file: "/content_scripts/setSpeed.js" })
    .then(listenForChange)
    .catch(reportExecuteScriptError);