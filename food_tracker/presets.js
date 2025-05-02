async function get_presets() {
    const presets = await get_presets_from_db();
    list = presets.data.flat().slice(5);
    names = [];
    for (let i = 0; i < list.length; i+=5) {
        names.push(list[i]);
    }
    console.log("Called");
    return names;
}

class Suggestions {
    constructor() {
        this.names = [];
    }
    async init() {
        this.names = await get_presets();
    }
    show_suggestions() {
        let input = document.getElementById("userInput").value.toLowerCase();
        let suggestionsDiv = document.getElementById("suggestions");
        suggestionsDiv.innerHTML = ""; // Clear previous suggestions
        var matches = this.names;

        if (input.length > 0) {
            matches = matches.filter(item => item.toLowerCase().includes(input));
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

}


async function get_presets_from_db() {
    const url="https://script.google.com/macros/s/AKfycbx1uSn7CirwNZV6CgqQTqJbazQF7YuNTo4zoh-QF3EpeOFv9GxeL8K8KslTnr8akaOvkA/exec?type=get_full_food_preset"

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}