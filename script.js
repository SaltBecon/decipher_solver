const inputTable = document.getElementById("input_table");
const colors = ["purple", "sky_blue", "yellow", "red", "purplish_red", "blue"];
const options = ["紫色(2重線)", "水色", "黄色", "赤色", "赤紫色(太い点線)", "青色(丸付きの線)"];
let ringCount = 0;

function addRing() {
    let tr = document.createElement("tr");
    let select = document.createElement("select");
    let number = document.createElement("input");
    let range = document.createElement("range");
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
    tr.appendChild(select);
    tr.appendChild(number);
    tr.appendChild(range);
    inputTable.appendChild(tr);
    ringCount++;
}

addRing();