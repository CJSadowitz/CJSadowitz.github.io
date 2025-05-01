function handle_simple_checklist(checkbox) {
    if (checkbox.checked) {
        update_task_log(checkbox.id)
    }
}

function handle_complex_checklist(checkbox) {
    if (checkbox.checked) {
        console.log("Complex");
    }
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
        console.log(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

async function update_task_log(task_name) {
    
    const now = new Date();
    const date = String(now.getUTCFullYear()) + "/" + String(now.getUTCMonth()) + "/" + String(now.getUTCDay());
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