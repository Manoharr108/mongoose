
let btn = document.getElementById("addbtn")
let clrbtn = document.getElementById("clear")

let arr = ["Anonymous", "Secret or Secretive", "Ghost", "Incognito", "Nameless", "Unknown", "Discrete",
    "Unnamed",
    "Mystery or Mysterious ",
    "Invisible",
    "Hidden",
    "Disguised",
    "Covet",
    "Masked",
    "Faceless",
    "Whistleblower",
    "Silent",
    "Anon",]

let i = 0
let colorArr = ["primary", "secondary", "success", "danger", "warning", "info", "light"]

const generateComment = async () => {
    //name
    let aname = arr[Math.floor(Math.random() * arr.length)]
    //date
    var d = new Date()
    var month;
    if (d.getMonth) {
        month = d.getMonth() + 1
    }
    let date = d.getDate() + "/" + month + "/" + d.getFullYear()
    //time
    let time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()
    //content
    let content = document.getElementById('textarea').value
    //color
    let color = colorArr[Math.floor(Math.random() * colorArr.length - 1)]

    const res = await fetch('http://localhost:3000/post', ({
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: aname,
            date: date,
            time: time,
            content: content,
            color: color
        })
    }))



    document.getElementById("textarea").value = ""

}


btn.addEventListener("click", (e) => {
    e.preventDefault()
    generateComment()
})

document.getElementById("textarea").addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
        e.preventDefault()
        generateComment()
    }
})

clrbtn.addEventListener("click", (e) => {
    e.preventDefault()
    document.getElementById("textarea").value = ""
})

async function LoadInitial() {
    const res = await fetch('http://localhost:3000/post');
    const jsondata = await res.json()
    // console.log(jsondata)

    for (let i = 0; i < jsondata.length; i++){

            document.querySelector(".post").insertAdjacentHTML("afterbegin",
                `   <div class="card1">
        <div class="card bg-${jsondata[i].color}" style="width: 18rem;">
        <div class="card-body">
        <h5 class="card-title">${jsondata[i].name}</h5>
        <h7 class="card-subtitle mb-2 text-body-secondary">${jsondata[i].date}</h7><br>
        <h7 class="card-subtitle mb-2 text-body-secondary">${jsondata[i].time}</h7>
        <h5 class="card-text">${jsondata[i].content}</h5>
        </div>
        </div>
        </div>`)
    }

    }

LoadInitial()

