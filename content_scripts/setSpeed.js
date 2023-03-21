(() => {
    if (window.hasRun) {
        return;
    }
    window.hasRun = true;

    browser.runtime.onMessage.addListener((message) => {
        if (message.command === "setSpeed") {
            document.getElementsByTagName("video")[0].playbackRate = message.speed;
        }
    });
})();