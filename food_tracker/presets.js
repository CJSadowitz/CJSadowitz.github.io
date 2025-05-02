function get_presets() {
    const presets = ["Preset 1", "Preset 2", "Preset 3", "Custom Option", "Something Else"];
    return presets;
}

function show_suggestions() {
    let input = document.getElementById("userInput").value.toLowerCase();
    let suggestionsDiv = document.getElementById("suggestions");
    suggestionsDiv.innerHTML = ""; // Clear previous suggestions

    if (input.length > 0) {
        let matches = get_presets().filter(item => item.toLowerCase().includes(input));
        if (matches.length > 0) {
            suggestionsDiv.style.display = "block";
            matches.forEach(match => {
                let div = document.createElement("div");
                div.textContent = match;
                div.onclick = () => { 
                    document.getElementById("userInput").value = match; 
                    suggestionsDiv.style.display = "none"; 
                };
                suggestionsDiv.appendChild(div);
            });
        } else {
            suggestionsDiv.style.display = "none";
        }
    } else {
        suggestionsDiv.style.display = "none";
    }
}