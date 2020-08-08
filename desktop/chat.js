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

const connect = async () => {
    let header = document.querySelector(".chat__header");
    let loading = document.querySelector(".loading");
    let photo = document.createElement("div");
    let name = document.createElement("h5");
    let p = document.createElement("p");
    let container = document.createElement("div");
    let chat = document.querySelector(".chat__text");
    let input = document.querySelector(".chat__input");
    photo.className = "photo";
    name.className = "name";
    p.className = "position";
    container.className = "info";
    container.appendChild(name);
    container.appendChild(p);
    name.innerText = "Мария Носова";
    p.innerText = "Специалист Ассоциации социальной поддержки населения";
    await sleep(2000+getRandomInt(2000));
    loading.innerText = "Установка соединения...";
    await sleep(1000+getRandomInt(1000));
    loading.remove();
    clearNode(header);
    header.appendChild(photo);
    header.appendChild(container);

    chat.style.paddingLeft = "40%";

    const sendMsg = async (text) => {
        let msg = document.createElement("div");
        msg.innerText = text;
        msg.className = "message";
        await sleep(1900);
        p.innerText = "Печатает..."
        await sleep(50*text.length);
        p.innerText = "Специалист Ассоциации социальной поддержки населения";
        chat.appendChild(msg);
        chat.scrollTo(0, chat.scrollHeight);
    } 

    let yes = document.createElement("button");
    let no = document.createElement("button");
    yes.innerText = "ДА";
    no.innerText = "НЕТ";
    yes.classList.add("answer");
    yes.classList.add("answer_positive");
    no.className = "answer";

    await sendMsg("Здравствуйте, " + localStorage.getItem("fname") 
    + " " + localStorage.getItem("lname") + 
    ", мы получили вашу анкету, сейчас я проведу сверку данных…");
    await sendMsg("Все данные заполнены корректно, замечательно. Уточните, получали ли вы социальную выплату более 25 тысяч рублей ранее?");
    input.appendChild(yes);
    input.appendChild(no);

    const wait = async () => {
        await sendMsg("Я поняла, сейчас сверюсь с базой данных по вашей анкете… минуту пожалуйста.");
    };

    const nextStep = async () => {
        await sendMsg("В данный момент часть реестров, относящихся к вашему субъекту, недоступна и я не могу проверить: получали ли вы средства ранее, поэтому я не могу согласовать отправку средств по вашим реквизитам.");
        await sendMsg("У меня есть все ваши данные в зашифрованном виде и я могу подготовить заявление, где вы подтвердите, что выплату ранее не получали. Этого будет достаточно для того, чтобы я смогла согласовать отправку положенных вам средств. Сформировать заявление?");
        input.appendChild(yes);
        input.appendChild(no);
        yes.addEventListener("click", async () => {
                let letter = document.createElement("div");
                letter.className = "letter";
                let letterTitle = document.createElement("h2");
                let letterText = document.createElement("p");
                let additional = document.createElement("div");
                let date = Date.now().toLocaleString("ru", {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric'
                });
                let letterDate = document.createElement("label");
                let letterIp = document.createElement("label");
                let letterButton = document.createElement("button");
                letterButton.innerText = "ПОДТВЕРЖДАЮ";
                letterDate.innerText = "Текущая дата: " + date;
                letterIp.innerText = "Текущий IP-адрес: " + localStorage.getItem("ip");
                letter.appendChild(letterTitle);
                letter.appendChild(letterText);
                additional.appendChild(letterDate);
                additional.appendChild(letterIp);
                letter.appendChild(additional);
                letter.appendChild(letterButton);
                body.appendChild(letter);
        });
    }
    const foo = async () => {
        yes.remove();
        no.remove();
        yes.removeEventListener('click', foo);
        no.removeEventListener('click', foo);
        await wait();
        await nextStep();
    }
    [yes, no].forEach(el => {
        el.addEventListener("click", foo);
    });
};
