const inputTable = document.getElementById("input_table");
const colors = ["purple", "sky_blue", "yellow", "red", "purplish_red", "blue", "green"];
const options = ["紫色(2重線)", "水色", "黄色", "赤色", "赤紫色(太い点線)", "青色(丸付きの線)", "緑色"];
let ringCount = 0;

function addRing() {
    let tr = document.createElement("tr");
    let tds = [
        document.createElement("td"),
        document.createElement("td"),
        document.createElement("td"),
        document.createElement("td")
    ];
    let index = document.createElement("p");
    let select = document.createElement("select");
    let number = document.createElement("input");
    let range = document.createElement("input");
    let rangeValue = document.createElement("p");
    index.innerHTML = ringCount + 1;
    number.setAttribute("type", "number");
    range.setAttribute("type", "range");
    range.setAttribute("value", "12/16");
    range.setAttribute("min", "0");
    range.setAttribute("max", "15");
    range.setAttribute("step", "1");
    rangeValue.innerHTML = "8/16";
    for (let i = 0; i < colors.length; i++) {
        let option = document.createElement("option");
        option.setAttribute("value",colors[i]);
        option.innerHTML = options[i];
        select.appendChild(option);
    }
    range.addEventListener("input", function () {
        this.nextElementSibling.innerHTML = this.value + "/16";
    });
    tds[0].appendChild(index);
    tds[1].appendChild(select);
    tds[2].appendChild(number);
    tds[3].appendChild(range);
    tds[3].appendChild(rangeValue);
    tr.appendChild(tds[0]);
    tr.appendChild(tds[1]);
    tr.appendChild(tds[2]);
    tr.appendChild(tds[3]);
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
        for (let j = 1; j < inputTable.rows[i].cells.length; j++) {
            input[i - 1].push(inputTable.rows[i].cells[j].firstElementChild.value);
        }
    }
    let matrix = [];
    for (let i = 0; i < ringCount; i++) {
        matrix.push([]);
        for (let j = 0; j < ringCount + 1; j++) {
            matrix[i].push(0);
        }
    }
    mainLoop: for (let h = 0; h < 2 ** ringCount; h++){
        log(h);
        input.forEach((ring, index) => {
            for (let i = 0; i < ringCount; i++) {
                switch (ring[0]) {
                    case colors[0]:
                        if (input[i][1] == ring[1]){
                            matrix[i][index] = 1;
                        }
                        break;
                    case colors[1]:
                        if (input[i][0] == ring[0]){
                            matrix[i][index] = 1;
                        }
                        break;
                    case colors[2]:
                        matrix[i][index] = 1;
                        break;
                    case colors[3]:
                        if (input[i][1] == ring[1]){
                            matrix[i][index] = -1;
                        }
                        break;
                    case colors[4]:
                        if (input[i][0] != ring[0] || i == index){
                            matrix[i][index] = 1;
                        }
                        break;
                    case colors[5]:
                        if (input[i][1] == ring[1]){
                            matrix[i][index] = 0.5;
                        }
                        break;
                    case colors[6]:
                        if (input[i][0] == ring[0]){
                            if (i == index){
                                matrix[i][index] = 1;
                            }else{
                                matrix[i][index] = -1;
                            }
                        
                        }
                        break;
                }
            }
            //log("0".repeat(ringCount) + h.toString(2)).slice(-ringCount));
            //if (("0".repeat(ringCount) + h.toString(2)).slice(-ringCount))[index] == 0) {
                matrix[index][ringCount] = ring[2];
            //}
                //matrix[index][ringCount] = ring[2] - 16;
        });
        for (let i = 0; i < ringCount; i++) {
            matrix = matrix.slice(0, i).concat(matrix.slice(i, ringCount).sort(function(a, b) {return Math.abs(b[i]) - Math.abs(a[i])}));
            if (matrix[i][i] == 0){continue;}
            matrix[i] = matrix[i].map((a) => a / matrix[i][i]);
            for (let j = 0; j < ringCount; j++) {
                if (j == i){continue;}
                matrix[j] = matrix[j].map((a, k) => a - matrix[i][k] * matrix[j][i]);
                log(matrix.toString());
            }
        }
        for (let i = 0; i < ringCount; i++) {
            /*
            if (matrix[i][ringCount] % 2 == 1) {
                if (h == 2 ** ringCount - 1){
                    log("failed");
                }
                continue mainLoop;
            }
            */
        }
        break;
    }
}

function log(a){
    let p = document.createElement("p");
    p.innerHTML = a;
    document.body.appendChild(p);
}
addRing();