if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    document.getElementById('start-voice').onclick = function() {
        document.getElementById('message').innerText = "Listening...";
        recognition.start();
    };

    recognition.onresult = function(event) {
        const voiceCommand = event.results[0][0].transcript;
        document.getElementById('message').innerText = `You said: "${voiceCommand}"`;
        processVoiceCommand(voiceCommand);
    };

    recognition.onerror = function(event) {
        document.getElementById('message').innerText = "Error occurred. Please try again.";
        console.error("Speech recognition error:", event.error);
    };
} else {
    alert("Web Speech API not supported in this browser.");
}


function processVoiceCommand(command) {
    const words = command.toLowerCase().split(" ");
    let quantity = 1;

    if (words.includes("buy")) {
        const index = words.indexOf("buy");

        
        if (!isNaN(words[index + 1])) {
            quantity = parseInt(words[index + 1]);
        }

        
        const product = words.slice(index + 2).join(" ");
        document.getElementById('message').innerText = `Confirmed: Buying ${quantity} units of ${product}.`;
    } else {
        document.getElementById('message').innerText = "Command not recognized. Please say 'buy' followed by the product and quantity.";
    }
}
