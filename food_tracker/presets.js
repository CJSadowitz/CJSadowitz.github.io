async function get_presets() {
    const presets = await get_presets_from_db();
    var list = presets.data.flat().slice(5);
    names = [];
    for (let i = 0; i < list.length; i+=5) {
        names.push(list[i]);
    }
    return names;
}

async function update_counts() {
    const sheet = await get_food_sheet();
    var list = sheet.data.slice(1);
    const now = new Date();
    const date = String(now.getFullYear()) + "-" + String(now.getMonth() + 1).padStart(2, '0') + "-" + String(now.getDate()).padStart(2, '0');
    var name = [];
    var calorie_count = document.getElementById("daily_calorie_count");
    var protein_count = document.getElementById("daily_protein_count");
    var carbs_count = document.getElementById("daily_carbs_count");
    var fats_count = document.getElementById("daily_fats_count");
    for (let i = 0; i < list.length; i++) {
        if (!list[i][0].includes(date)) {
            continue;
        }
        name.push(list[i][1]);
        calorie_count.innerHTML = calorie_count.innerHTML - list[i][2];
        protein_count.innerHTML = protein_count.innerHTML - list[i][3];
        carbs_count.innerHTML = carbs_count.innerHTML - list[i][4];
        fats_count.innerHTML = fats_count.innerHTML - list[i][5];
    }
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
        suggestionsDiv.innerHTML = "";
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

async function get_food_sheet() {
    const url="https://script.google.com/macros/s/AKfycbx1uSn7CirwNZV6CgqQTqJbazQF7YuNTo4zoh-QF3EpeOFv9GxeL8K8KslTnr8akaOvkA/exec?type=get_full_food_log"

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