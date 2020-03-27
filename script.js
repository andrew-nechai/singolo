document.addEventListener('scroll', onScroll);

//Шапка

let mass = [];
let links = document.querySelectorAll(".navigation a");

mass.push(document.getElementById("topi"));
mass.push(document.getElementById("our-services"));
mass.push(document.getElementById("portfolio"));
mass.push(document.getElementById("about-us"));
mass.push(document.getElementById("contact"));

function onScroll(event){
	const curPos = window.scrollY;

	mass.forEach(x => {	
		if (x.parentNode.offsetTop <= curPos+97.5 && (x.parentNode.offsetTop + x.parentNode.offsetHeight) > curPos+97.5) {
			links.forEach(a => {
				a.classList.remove('a-active');
				a.classList.remove('a-unactive');
				if (x.getAttribute('id') === a.getAttribute('href').substring(1)) {
					a.classList.add('a-active');
				}
				a.classList.add('a-unactive');
			});
		}
	});
}

//

//Слайдер

let items = document.querySelectorAll('.slide');
console.log(items)
let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n) {
	currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
	isEnabled = false;
	items[currentItem].classList.add(direction);
	items[currentItem].addEventListener('animationend', function() {
		this.classList.remove('active', direction);
	});
}

function showItem(direction) {
	items[currentItem].classList.add('next', direction);
	items[currentItem].addEventListener('animationend', function() {
		this.classList.remove('next', direction);
		this.classList.add('active');
		isEnabled = true;
	});
}

function nextItem(n) {
	hideItem('to-left');
	changeCurrentItem(n + 1);
	showItem('from-right');
}

function previousItem(n) {
	hideItem('to-right');
	changeCurrentItem(n - 1);
	showItem('from-left');
}



document.getElementById('slider-left-btn').addEventListener('click', function() {
	if (isEnabled) {
		previousItem(currentItem);
	}
});

document.getElementById('slider-right-btn').addEventListener('click', function() {
	if (isEnabled) {
		nextItem(currentItem);
	}
});

//Черные экраны

function changeClass (clas) {
	if (this.classList.contains("vertical-iphone") || this.classList.contains("black-screen-vert")){
		document.querySelector(".black-screen-vert").classList.toggle("screen-disp-block");	
	} else {
		document.querySelector(".black-screen-horis").classList.toggle("screen-disp-block");	
	}
}

document.querySelector(".vertical-iphone").addEventListener("click", changeClass);

document.querySelector(".black-screen-vert").addEventListener("click", changeClass);
document.querySelector(".horisontal-iphone").addEventListener("click", changeClass);

document.querySelector(".black-screen-horis").addEventListener("click", changeClass);

//


//Portfolio

let portfolio_mass_buttons = document.querySelectorAll(".portfolio__buttons > li input");
let portfolio_mass_imgs = document.querySelectorAll(".portfolio__img");
let portfolio_mass_imgs_querry = document.querySelectorAll(".portfolio__img");

let portfolio_mass_imgs_srcs = [];

for (i in portfolio_mass_imgs) {
	if (portfolio_mass_imgs[i].src)
		portfolio_mass_imgs_srcs.push(portfolio_mass_imgs[i].src);
}

document.querySelector(".portfolio__categories").addEventListener("click", (event) => {
	portfolio_mass_buttons.forEach(i => {
    	i.classList.remove("portfolio__buttons-selected");
	});


	portfolio_mass_imgs_srcs = portfolio_mass_imgs_srcs.splice(-1).concat(portfolio_mass_imgs_srcs);

	for (i in portfolio_mass_imgs){
		portfolio_mass_imgs[i].src = portfolio_mass_imgs_srcs[i];
	}

	event.toElement.classList.add("portfolio__buttons-selected");
});

document.querySelector(".portfolio__imgsblocks").addEventListener("click", event => {
	portfolio_mass_imgs_querry.forEach(i => {
		i.classList.remove("portfolio__imgsblocks-selected");
	});
	console.log(event.toElement)
	event.toElement.classList.add("portfolio__imgsblocks-selected");
});


//Модальное окно


document.querySelector('form').setAttribute('onsubmit', 'return false');

function createModal() {
    const modal = document.createElement('div');
    modal.classList.add('amodal');
    modal.insertAdjacentHTML('afterbegin', `
        <div class="modal-overlay">
            <div class="modal-window">
                <div class="modal-header">
                    <span class="modal-title">Внимание</span>
                    <span class="modal-close">&times;</span>
                </div>
                <div class="modal-body">
                    <p>Письмо отправлено </p>
                    <p></p>
                    <p></p>
                </div>
                <div class="modal-footer">
                    <button class="close-window">Ok</button>
                </div>
            </div>
        </div>
    `);

    document.body.appendChild(modal);
    document.querySelector(".close-window").addEventListener("click", a => {
    	document.querySelector(".amodal").classList.remove("open");
    });

    document.querySelector(".modal-close").addEventListener("click", a => {
    	document.querySelector(".amodal").classList.remove("open");
    });
}

function showModal() {
	let tem = document.querySelector(".get-a-quote__form input:nth-child(3)").value;
	let desc = document.querySelector(".get-a-quote__form textarea").value;
	if (tem != '') {
		document.querySelector(".modal-body p:nth-child(2)").innerText = "Тема: " + tem;
	}
	else {
		document.querySelector(".modal-body p:nth-child(2)").innerText = "Тема: Singolo";
	}
	
	if (desc != '') {
		document.querySelector(".modal-body p:nth-child(3)").innerText =  "Описание: " + desc;
	}
	else {
		document.querySelector(".modal-body p:nth-child(3)").innerText = "Без описания";
	}

	document.querySelector(".amodal").classList.add("open");
}

createModal();

document.querySelector(".submit-btn").addEventListener("click", showModal);
