function handle_simple_checklist(checkbox) {
    if (checkbox.checked) {
        update_task_log(checkbox.id)
        checkbox.disabled = true;
    }
}

function handle_complex_checklist(checkbox) {
    if (checkbox.checked) {
        console.log("Complex");
    }
}

async function task_enabling() {
    // Disable all tasks
    const all_tasks = [
        ...document.getElementById("simple_checklist").querySelectorAll("input"),
        ...document.getElementById("complex_checklist").querySelectorAll("input")
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
        completed_tasks.push(list[i+1]);
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

async function get_data() {
    const url="https://script.google.com/macros/s/AKfycbx1uSn7CirwNZV6CgqQTqJbazQF7YuNTo4zoh-QF3EpeOFv9GxeL8K8KslTnr8akaOvkA/exec?type=get_full_sheet"

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

async function update_task_log(task_name) {
    
    const now = new Date();
    const date = String(now.getUTCFullYear()) + "/" + String(now.getUTCMonth() + 1) + "/" + String(now.getUTCDate());
    const start = String(now.getHours()) + ":" + String(now.getMinutes());
    var url = "https://script.google.com/macros/s/AKfycbx1uSn7CirwNZV6CgqQTqJbazQF7YuNTo4zoh-QF3EpeOFv9GxeL8K8KslTnr8akaOvkA/exec?type=post";
    url += "&date=" + String(date);
    url += "&task=" + task_name;
    url += "&start=" + start;
    url += "&end=" + start;
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