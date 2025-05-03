function set_page_colors() {
    if (!document.cookie.includes("colors=")) {
        document.cookie = "colors=dark_mode; path=/; max-age=3600";
    }
    document.cookie = "colors=random_colors; path=/; max-age=3600";
    var cookie = String(document.cookie);
    if (cookie.includes("colors=dark_mode")) {
        var bg_color = "gray";
        var container_color = "dimgray";
        var task_color = "darkgray";
        set_colors(bg_color, container_color, task_color);

    }
    else if (cookie.includes("colors=random_colors")) {
        let color_1 = get_random_color();
        let color_2 = get_next_color(color_1);
        let color_3 = get_next_color(color_2);
        var bg_color = oklabToSRGB(color_1.l, color_1.a, color_1.b);
        var container_color = oklabToSRGB(color_2.l, color_2.a, color_2.b);
        var task_color = oklabToSRGB(color_3.l, color_3.a, color_3.b);
        set_colors(bg_color, container_color, task_color);
    }
}

function set_colors(bg_color, container_color, task_color) {
    document.body.style.backgroundColor = bg_color;
    document.getElementById("stretches").style.backgroundColor = container_color;
    document.getElementById("exercises").style.backgroundColor = container_color;
    let tasks = document.getElementsByClassName("task");
    for (let i = 0; i < tasks.length; i++) {
        tasks[i].style.backgroundColor = task_color;
    }
    let listItems = document.getElementsByTagName("li");
    for (let i = 0; i < listItems.length; i++) {
        listItems[i].style.backgroundColor = task_color;
    }
}

function get_random_color() {
    var l = (Math.random() / 2) + 0.5;
    var a = (Math.random() - 0.5) * 0.3; // fix this to low threshold
    var b = (Math.random() - 0.5) * 0.3; // fix this to low threshold
    color = {
        l: l,
        a: a,
        b: b
    };
    return color;
}

function get_next_color(color) {
    var a = (Math.random() - 0.5) * 0.3;
    var b = (Math.random() - 0.5) * 0.3;
    new_color = {
        l: color.l,
        a: color.a + a,
        b: color.b + b
    };
    return new_color;
}

function oklabToSRGB(L, a, B) {
    // Convert to linear RGB space (approximate conversion)
    let l_ = L + 0.3963377774 * a + 0.2158037573 * B;
    let m_ = L - 0.1055613458 * a - 0.0638541728 * B;
    let s_ = L - 0.0894841775 * a - 1.2914855480 * B;

    let l = Math.pow(l_, 3);
    let m = Math.pow(m_, 3);
    let s = Math.pow(s_, 3);

    let r = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
    let g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
    let b = -0.0041960863 * l - 0.7034186170 * m + 1.7076147010 * s;

    // Convert to CSS-friendly format
    r = Math.max(0, Math.min(255, Math.round(r * 255)));
    g = Math.max(0, Math.min(255, Math.round(g * 255)));
    b = Math.max(0, Math.min(255, Math.round(b * 255)));

    return `rgb(${r}, ${g}, ${b})`;
}