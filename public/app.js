let btn = document.getElementById("addbtn");
let clrbtn = document.getElementById("clear");

let arr = ["Anonymous", "Secret or Secretive", "Ghost", "Incognito", "Nameless", "Unknown", "Discrete",
    "Unnamed", "Mystery or Mysterious", "Invisible", "Hidden", "Disguised", "Covet", "Masked", "Faceless",
    "Whistleblower", "Silent", "Anon"];

let aname = arr[Math.floor(Math.random() * arr.length)];
let visible_name = document.getElementsByClassName('forname')[0];
visible_name.value = aname;

let colorArr = ["primary", "secondary", "success", "danger", "warning", "info", "light"];

const generateComment = async () => {
    var d = new Date();
    var month;
    if (d.getMonth) {
        month = d.getMonth() + 1;
    }
    let date = d.getDate() + "/" + month + "/" + d.getFullYear();
    let time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    let content = document.getElementById('textarea').value;
    let status;
    if (content !== "") {
        status = true;
    }
    let color = colorArr[Math.floor(Math.random() * colorArr.length)];
    if (status) {
        const res = await fetch('https://test-api-i49m.onrender.com/', ({
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: document.getElementsByClassName('forname')[0].value,
                date: date,
                time: time,
                content: content,
                color: color
            })
        }));
    }

    document.getElementById("textarea").value = "";
    visible_name.value = arr[Math.floor(Math.random() * arr.length)];

    // Reload the page to display the new comment
    location.reload();
};

btn.addEventListener("click", (e) => {
    e.preventDefault();
    generateComment();
});

document.getElementById("textarea").addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
        e.preventDefault();
        generateComment();
    }
});

clrbtn.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("textarea").value = "";
});

async function LoadInitial() {
    const res = await fetch('https://test-api-i49m.onrender.com/');
    const jsondata = await res.json();

    document.querySelector(".post").innerHTML = ""; // Clear previous comments

    for (let i = 0; i < jsondata.length; i++) {
        document.querySelector(".post").insertAdjacentHTML("afterbegin",
            `<div class="card1">
                <div class="card-body">
                    <h5 class="card-title">${jsondata[i].name}</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">${jsondata[i].date}</h6>
                    <h6 class="card-subtitle mb-2 text-body-secondary">${jsondata[i].time}</h6>
                    <p class="card-text">${jsondata[i].content}</p>
                </div>
            </div>`);
    }
}

LoadInitial();
