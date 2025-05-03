async function update_exercise_stretch(element) {
    element.disabled = true;
    var form = element.closest("form");
    var type = form.id;
    var task_name = element.id;
    const now = new Date();
    const date = String(now.getUTCFullYear()) + "/" + String(now.getUTCMonth() + 1) + "/" + String(now.getUTCDate());
    const time = String(now.getHours()) + ":" + String(now.getMinutes()).padStart(2, '0');
    var url = "https://script.google.com/macros/s/AKfycbx1uSn7CirwNZV6CgqQTqJbazQF7YuNTo4zoh-QF3EpeOFv9GxeL8K8KslTnr8akaOvkA/exec?type=update_exercise_stretch";
    url += "&date=" + String(date);
    url += "&es_type=" + type;
    url += "&name=" + task_name;
    url += "&time=" + time;
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
    }
}

async function get_data() {
    const url="https://script.google.com/macros/s/AKfycbx1uSn7CirwNZV6CgqQTqJbazQF7YuNTo4zoh-QF3EpeOFv9GxeL8K8KslTnr8akaOvkA/exec?type=get_exercise_stretch_sheet"

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

async function task_enabling() {
    // Disable all tasks
    const all_tasks = [
        ...document.getElementById("stretches").querySelectorAll("input"),
        ...document.getElementById("exercises").querySelectorAll("input")
    ];
    // Disable all checkboxes at once
    all_tasks.forEach(input => input.disabled = true);
    
    
    // Determine which tasks are already completed
    const data = await get_data();
    var list = data.data.flat().slice(4);
    const now = new Date();
    const date = String(now.getUTCFullYear()) + "-" + String(now.getUTCMonth() + 1).padStart(2, '0') + "-" + String(now.getUTCDate()).padStart(2, '0');

    var completed_tasks = []

    for (let i = 0; i < list.length; i+=4) {
        // Wrong day skip
        if (!list[i].includes(date)) {
            continue;
        }
        completed_tasks.push(list[i+2]);
    }
    for (task in completed_tasks) {
        for (let i = 0; i < all_tasks.length; i++) {
            if (all_tasks[i].id == completed_tasks[task]) {
                all_tasks[i].remove();
            }
        }
    }
    all_tasks.forEach(input => input.disabled = false);
}