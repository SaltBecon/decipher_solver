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
    select.id = "type" + String(ringCount);
    number.id = "group" + String(ringCount);
    number.setAttribute("type", "number");
    range.id = "rotation" + String(ringCount);
    range.setAttribute("type", "range");
    range.setAttribute("min", "0");
    range.setAttribute("max", "15");
    range.setAttribute("step", "1");
    for (let i = 0; i < colors.length; i++) {
        let option = document.createElement("option");
        option.setAttribute("value",colors[i]);
        option.innerHTML = options[i];
        select.appendChild(option);
    }
    tds[0].appendChild(select);
    tds[1].appendChild(number);
    tds[2].appendChild(range);
    tr.appendChild(tds[0]);
    tr.appendChild(tds[1]);
    tr.appendChild(tds[2]);
    inputTable.appendChild(tr);
    ringCount++;
}

addRing();