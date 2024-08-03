const inputTable = document.getElementById("input_table");
const colors = ["purple", "sky_blue", "yellow", "red", "purplish_red", "blue"];
const options = ["紫色(2重線)", "水色", "黄色", "赤色", "赤紫色(太い点線)", "青色(丸付きの線)"];
let ringCount = 0;

function addRing() {
    let tr = document.createElement("tr");
    let tds = [
        document.createElement("td"),
        document.createElement("td"),
        document.createElement("td")
    ];
    let select = document.createElement("select");
    let number = document.createElement("input");
    let range = document.createElement("input");
    let p = document.createElement("p");
    select.id = "type" + String(ringCount);
    number.id = "group" + String(ringCount);
    number.setAttribute("type", "number");
    range.id = "rotation" + String(ringCount);
    range.setAttribute("type", "range");
    range.setAttribute("value", "12/16");
    range.setAttribute("min", "0");
    range.setAttribute("max", "15");
    range.setAttribute("step", "1");
    p.innerHTML = "8/16";
    for (let i = 0; i < colors.length; i++) {
        let option = document.createElement("option");
        option.setAttribute("value",colors[i]);
        option.innerHTML = options[i];
        select.appendChild(option);
    }
    range.addEventListener("input", function () {
        this.nextElementSibling.innerHTML = this.value + "/16";
    });
    tds[0].appendChild(select);
    tds[1].appendChild(number);
    tds[2].appendChild(range);
    tds[2].appendChild(p);
    tr.appendChild(tds[0]);
    tr.appendChild(tds[1]);
    tr.appendChild(tds[2]);
    inputTable.appendChild(tr);
    ringCount++;
}

function removeRing() {
    if (ringCount >= 2) {
        inputTable.deleteRow(inputTable.rows.length - 1);
        ringCount--;
    }
}

function solve() {
    let input = [];
    for (let i = 1; i < inputTable.rows.length; i++) {
        input.push([]);
        for (const cell of inputTable.rows[i].cells) {
            input[i - 1].push(cell.firstElementChild.value);
        }
    }
    document.getElementById("console").innerHTML=input.toString();
    let matrix = [];
    for (let i = 0; i > ringCount; i++) {
        matrix.push([]);
        for (let j = 0; j > ringCount + 1; j++) {
            matrix[i].push(0);
        }
    }
    
}
addRing();