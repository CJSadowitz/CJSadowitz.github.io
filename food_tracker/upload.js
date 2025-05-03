function upload_preset() {

}

async function upload_custom(event) {

    let food_name = document.getElementById("custom_food_name").value;
    let calorie_count = document.getElementById("custom_calorie_count").value;
    let protein = document.getElementById("custom_protein").value;
    let carbs = document.getElementById("custom_carbs_count").value;
    let fats = document.getElementById("custom_fats_count").value;


    const now = new Date();
    const date = String(now.getUTCFullYear()) + "/" + String(now.getUTCMonth() + 1) + "/" + String(now.getUTCDate());
    var url = "https://script.google.com/macros/s/AKfycbx1uSn7CirwNZV6CgqQTqJbazQF7YuNTo4zoh-QF3EpeOFv9GxeL8K8KslTnr8akaOvkA/exec?type=update_food_log";
    url += "&date=" + String(date);
    url += "&name=" + food_name;
    url += "&calories=" + calorie_count;
    url += "&protein=" + protein;
    url += "&carbs=" + carbs;
    url += "&fat=" + fats;
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        });

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        console.error("Error fetching data:", url);
    }
}

function add_preset() {

}