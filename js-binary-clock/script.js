var clock = document.getElementById("clock");
var help = document.getElementById("help");
var hint_nr = localStorage.getItem("hint") || 0;

function tick() {
    var arr = [];
    var d = new Date().toTimeString().split(" ")[0].replace(/:/g, "").split("");
    if(hint_nr == 0) showHint([""]);
    if(hint_nr == 1) showHint();
    if(hint_nr == 2 || hint_nr == 3) showHint(d);
    if(hint_nr == 4) showHint([""]);
    showBlockNumbers()
    d.forEach(function(el, ind) {
        var num = dec2bin(el, 4).split("")
        arr.push(num)
    })
    updateClock(arr)
}

function dec2bin(nr, bits) {
    var bin = new Number(nr).toString(2)
    while(bin.length < bits) {
        bin = "0" + bin;
    }
    return bin;
}

function updateClock(num) {
    num.forEach(function(el, ind) {
        el.forEach(function(el2, ind2) {
            var el = document.getElementsByClassName("col")[ind].getElementsByClassName("item")[ind2]
            if(el2 == 1) {
                el.className = "item lit";
            } else {
                el.className = "item dim";
            }
        })
    })
}

function createBlocks() {
    var bin = 8
    for(i = 0; i < 6; i++) {
        var col = document.createElement("div");
        col.className = "col";
        clock.appendChild(col);
        for(j = 0; j < 4; j++) {
            var div = document.createElement("div");
            div.className = "item"
            div.innerHTML = "<p>" + bin + "</p>"
            bin = bin - bin / 2
            if(bin < 1) bin = 8;
            col.appendChild(div);
        }
    }
}

function showHint(arr) {
    help.innerHTML = ""
    var arr = arr || ["H", "H", "M", "M", "S", "S"]
    for(i = 0; i < arr.length; i++) {
        var div = document.createElement("div");
        div.className = "item"
        div.innerHTML = arr[i]
        help.appendChild(div);
    }
}
document.addEventListener("click", function() {
    hint_nr++
    if(hint_nr > 4) hint_nr = 0;
    console.log(hint_nr)
    localStorage.setItem("hint", hint_nr)
    tick()
})

function showBlockNumbers() {
    if(hint_nr == 3 || hint_nr == 4) {
        document.querySelectorAll(".item p").forEach(function(el) {
            el.style.display = "block"
        })
    } else {
        document.querySelectorAll(".item p").forEach(function(el) {
            el.style.display = "none"
        })
    }
}
createBlocks()
tick()
setInterval(tick, 1000)