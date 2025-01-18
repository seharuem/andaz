document.addEventListener('DOMContentLoaded', () => {
	menuEvent();
	headerEvent();
	visualSlide();
	roomSearchEvent();
	choiceDiscount();
	specialCode();
	roomPreview();
	roomTabEvent();
	diningEvent();
	summerHouse();
	contentsSlide();
	mapExView();
});

function menuEvent() {
	const header = document.querySelector('header');
	const mainMenu = document.querySelectorAll('#mainmenu-list > li');
	let headerHeight = header.offsetHeight;
	let activeMenu;
	let activeSub;
	let moveTimer;

	mainMenu.forEach((menu, index, array) => {
		const subMenu = menu.querySelector('.submenu');
		const lastMenu = subMenu.lastElementChild.children[0];

		menu.addEventListener('mouseenter', () => {
			showMenu(menu, subMenu);
		});

		menu.children[0].addEventListener('focus', () => {
			showMenu(menu, subMenu);
		});

		if (index === array.length - 1) {
			lastMenu.addEventListener('blur', headerInit);
		}
	});

	header.addEventListener('mouseleave', headerInit);

	window.addEventListener('resize', () => {
		headerHeight = header.offsetHeight;
		header.style.clipPath = '';
	});

	function showMenu(menu, subMenu) {
		header.style.clipPath = 'inset(0 0 0px 0)';

		if (moveTimer) {
			clearTimeout(moveTimer);
		}

		if (activeMenu) {
			activeMenu.classList.remove('active');
			activeSub.classList.remove('active');
		}

		menu.classList.add('active');
		subMenu.classList.add('active');
		activeMenu = menu;
		activeSub = subMenu;
	}

	function headerInit() {
		activeMenu.classList.remove('active');

		moveTimer = setTimeout(() => {
			activeSub.classList.remove('active');
		}, 400);

		if (headerHeight === 80) {
			header.style.clipPath = '';
		} else {
			header.style.clipPath = 'inset(0 0 40px 0)';
		}
	}
}

function headerEvent() {
	const header = document.querySelector('header');
	const shadow = document.createElement('div');
	shadow.id = 'header-shadow';
	document.body.append(shadow);

	window.addEventListener('wheel', (e) => {
		if (window.scrollY > window.innerHeight - 200) {
			headerMove(e);
		}
	});

	document.querySelectorAll('a[href="#"]').forEach((anchor) => {
		anchor.addEventListener('click', () => {
			gsap.set(header, { yPercent: 0 });
			gsap.set(shadow, { yPercent: 0 });
		});
	});

	function headerMove(e) {
		if (e.deltaY > 0) {
			gsap.to(header, { yPercent: -100 });
			gsap.to(shadow, { yPercent: -100 });
		} else {
			gsap.to(header, { yPercent: 0 });
			gsap.to(shadow, { yPercent: 0 });
		}
	}
}

function visualSlide() {
	const nextBtn = document.querySelector('#visual > button');
	const visualList = document.querySelector('#visual-list');
	const dotList = document.querySelector('#dot-list');
	const dotBtn = dotList.querySelectorAll('button');
	let xMove = visualList.children[0].offsetWidth;
	let activeDot = dotBtn[0];
	let activeIndex = 0;
	let isMove = false;
	let timer;

	autoSlide();

	window.addEventListener('resize', () => {
		xMove = visualList.children[0].offsetWidth;
	});

	nextBtn.addEventListener('click', slide);
	dotList.addEventListener('mouseenter', () => {
		clearInterval(timer);
	});
	dotList.addEventListener('mouseleave', () => {
		autoSlide();
	});

	dotBtn.forEach((btn, index) => {
		btn.addEventListener('click', () => {
			if (btn !== activeDot && !isMove) {
				dotActive(btn);
				dotSlide(index);
			}
		});
	});

	function autoSlide() {
		timer = setInterval(slide, 3000);
	}

	function slide() {
		if (!isMove) {
			activeIndex++;
			if (activeIndex === dotBtn.length) activeIndex = 0;

			dotActive(dotBtn[activeIndex]);
			slideNext(1);
		}
	}

	function dotActive(btn) {
		activeDot.classList.remove('active');
		activeDot = btn;
		activeDot.classList.add('active');
	}

	function dotSlide(index) {
		const indexGap = index - activeIndex;
		activeIndex = index;

		if (indexGap > 0) {
			if (indexGap === 3) {
				slidePrev(-1);
			} else {
				slideNext(indexGap);
			}
		} else if (indexGap < 0) {
			if (indexGap === -3) {
				slideNext(1);
			} else {
				slidePrev(indexGap);
			}
		}
	}

	function slideNext(gap) {
		isMove = true;
		gsap.to(visualList, {
			x: -xMove * Math.abs(gap),
			duration: 0.8,
			onComplete: () => {
				appendImg(gap);
				isMove = false;
				gsap.set(visualList, { x: 0 });
			}
		});
	}

	function slidePrev(gap) {
		prependImg(gap);

		isMove = true;
		gsap.from(visualList, {
			x: xMove * gap,
			duration: 0.8,
			onComplete: () => {
				isMove = false;
			}
		});
	}

	function appendImg(gap) {
		for (let i = 0; i < gap; i++) {
			const visualImg = visualList.firstElementChild;
			visualList.append(visualImg);
		}
	}

	function prependImg(gap) {
		for (let i = 0; i < Math.abs(gap); i++) {
			const visualImg = visualList.lastElementChild;
			visualList.prepend(visualImg);
		}
	}
}

function roomSearchEvent() {
	const roomSearch = document.querySelector('#room-search');
	const toggleBtn = roomSearch.querySelector('#search-hide-show');
	let isShow = true;

	toggleBtn.addEventListener('click', showToggle);

	function showToggle() {
		if (isShow) {
			gsap.to(roomSearch, {
				yPercent: 100,
				onComplete: () => {
					isShow = false;
					toggleBtn.classList.add('hide');
					toggleBtn.innerHTML = '펼치기';
				}
			});
		} else {
			gsap.to(roomSearch, {
				yPercent: 0,
				onComplete: () => {
					isShow = true;
					toggleBtn.classList.remove('hide');
					toggleBtn.innerHTML = '숨기기';
				}
			});
		}
	}
}

function choiceDiscount() {
	const choiceBtn = document.querySelector('#choice-btn');
	const choiceList = document.querySelector('#choice-list');
	const choiceItem = choiceList.querySelectorAll('li');
	const discountCode = document.querySelector('#discount-code');
	let isShow = false;
	let isMove = false;

	choiceBtn.addEventListener('click', moveList);
	discountCode.addEventListener('click', moveList);

	choiceItem.forEach((list, index) => {
		const btn = list.children[0];

		btn.addEventListener('click', inputText);

		function inputText() {
			const choiceText = btn.innerHTML;

			moveList();

			if (index !== 0) {
				discountCode.style.zIndex = 3;
				discountCode.placeholder = choiceText;
				discountCode.focus();
				discountCode.value = '';
			} else {
				discountCode.style.zIndex = '';
				choiceBtn.innerText = choiceText;
			}
		}
	});

	function moveList() {
		if (!isShow && !isMove) {
			isShow = true;
			isMove = true;

			gsap.set(choiceList, {
				y: 400,
				clipPath: 'inset(0 0 140% 0)',
				display: 'block'
			});

			gsap.to(choiceList, {
				y: 0,
				clipPath: 'inset(0 0 0% 0)',
				duration: 0.6,
				ease: 'power2.out',
				onComplete: () => {
					isMove = false;
					choiceBtn.classList.add('active');
				}
			});
		} else if (isShow && !isMove) {
			isMove = true;

			gsap.to(choiceList, {
				y: 400,
				clipPath: 'inset(0 0 140% 0)',
				duration: 0.6,
				ease: 'power2.out',
				onComplete: choiceInit
			});
		}
	}

	function choiceInit() {
		choiceList.style.display = 'none';
		isShow = false;
		isMove = false;
		choiceBtn.classList.remove('active');
	}
}

function specialCode() {
	const codeBtn = document.querySelectorAll('#offer-list button');
	const copyUrl = 'url(/andaz/images/copy.svg)';
	const checkUrl = 'url(/andaz/images/check.svg)';
	let toast;
	let toastTimer;
	let fadeTimer;
	let copyImg;

	codeBtn.forEach((btn, index) => {
		const code = btn.innerText;

		btn.addEventListener('click', async () => {
			codeInit();
			toastCreate();
			copyImg = codeBtn[index];
			await codeCopy(code, btn);
			toastMotion();
		});
	});

	function codeInit() {
		if (toast) toast.remove();
		if (toastTimer) clearTimeout(toastTimer);
		if (fadeTimer) clearTimeout(fadeTimer);
		if (copyImg) copyImg.style.backgroundImage = copyUrl;
	}

	function toastCreate() {
		toast = document.createElement('div');
		toast.id = 'toast';
		document.body.appendChild(toast);
	}

	async function codeCopy(code, btn) {
		try {
			await navigator.clipboard.writeText(code);
			btn.style.backgroundImage = checkUrl;
			toast.innerText = '복사되었습니다!';
		} catch (err) {
			toast.innerText = '복사 실패하였습니다.';
		}
	}

	function toastMotion() {
		requestAnimationFrame(() => {
			toast.style.opacity = 1;
		});

		toastTimer = setTimeout(() => {
			toast.style.opacity = 0;
			fadeTimer = setTimeout(toastRemove, 400);
		}, 1000);
	}

	function toastRemove() {
		if (toast) toast.remove();
		toastTimer = null;
		fadeTimer = null;
		if (copyImg) copyImg.style.backgroundImage = copyUrl;
	}
}

function roomPreview() {
	const roomListBtn = document.querySelectorAll('#room-info-wrap button');
	const roomImgBtn = document.querySelector('#room-img');
	const roomImg = roomImgBtn.children[0];
	const roomEx = document.createElement('div');

	let isMotion = false;
	let activeBtn = roomListBtn[0];

	roomImgBtn.addEventListener('click', roomExImg);

	roomListBtn.forEach((btn) => {
		btn.addEventListener('click', () => {
			imgChange(btn);
		});
	});

	function roomExImg() {
		if (!isMotion) {
			isMotion = true;

			createModal();
			activeModal();

			gsap.from(roomEx, {
				opacity: 0.7,
				onComplete: () => (isMotion = false)
			});

			roomEx.children[0].focus();

			roomEx.children[0].addEventListener('click', () => {
				removeModal();
			});

			roomEx.addEventListener('keydown', (e) => {
				if (e.key === 'Escape') {
					removeModal();
				}
			});
		}

		function createModal() {
			roomEx.id = 'room-ex';
			roomEx.innerHTML = '<button type="button"><img></button>';
			roomEx.setAttribute('role', 'dialog');
			roomEx.setAttribute('aria-modal', 'true');
			roomEx.setAttribute('aria-label', '이미지 크게 보기');
			roomEx.setAttribute('tabindex', '-1');
			roomEx.children[0].children[0].src = roomImg.src;
		}

		function activeModal() {
			document.body.append(roomEx);
			document.body.parentElement.classList.add('stable');
			document.body.setAttribute('aria-hidden', 'true');
		}

		function removeModal() {
			roomEx.remove();
			document.body.parentElement.classList.remove('stable');
			document.body.removeAttribute('aria-hidden');
			roomImgBtn.focus();
		}
	}

	function imgChange(btn) {
		if (btn !== activeBtn) {
			activeBtn.classList.remove('active');
			btn.classList.add('active');
			activeBtn = btn;

			roomImg.src = activeBtn.children[0].src;
			gsap.from(roomImgBtn, { opacity: 0.7 });
		}
	}
}

function roomTabEvent() {
	const roomInfo = document.querySelector('#room-visual-wrap');
	const roomTabBtn = document.querySelectorAll('#room-type-menu button');
	let activeBtn = roomTabBtn[0];

	roomTabBtn.forEach((btn, index) => {
		btn.addEventListener('click', () => {
			if (btn !== activeBtn) {
				tabChange(btn);
				roomChange(index);
			}
		});
	});

	function tabChange(btn) {
		activeBtn.classList.remove('active');
		btn.classList.add('active');
		activeBtn = btn;
	}

	function roomChange(index) {
		axios.get(`/andaz/ajax/room/room${index}.html`).then((res) => {
			roomInfo.innerHTML = res.data;
			roomPreview();
			gsap.from(roomInfo, { opacity: 0.7 });
		});
	}
}

function diningEvent() {
	const diningInfo = document.querySelectorAll('.dining-info-wrap');

	diningInfo.forEach((info) => {
		const link = info.querySelectorAll('a');
		link[0].addEventListener('focus', () => {
			info.style.opacity = 1;
		});

		if (link[1]) {
			link[1].addEventListener('blur', () => {
				info.style.opacity = 0;
			});
		} else {
			link[0].addEventListener('blur', () => {
				info.style.opacity = 0;
			});
		}
	});
}

function summerHouse() {
	const houseInfo = document.querySelector('#house-info');
	const summerList = document.querySelectorAll('#summer-img-list button');
	let activeList = summerList[0];
	let houseClass = 0;

	summerList.forEach((list, index) => {
		list.addEventListener('click', () => {
			listChange(list);
			textChange(index);
			classChange(index);
		});
	});

	function listChange(list) {
		if (list !== activeList) {
			activeList.parentElement.classList.remove('active');
			list.parentElement.classList.add('active');
			activeList = list;
		}
	}

	function textChange(index) {
		axios.get(`/andaz/ajax/house/house${index}.html`).then((res) => {
			houseInfo.innerHTML = res.data;
		});
	}

	function classChange(index) {
		if (index !== houseClass) {
			houseInfo.classList.remove(`house-${houseClass}`);
			houseClass = index;
			houseInfo.classList.add(`house-${houseClass}`);
		}
	}
}

function contentsSlide() {
	const contentsWrap = document.querySelectorAll('.contents-wrap');
	let isMove = false;
	let contentsIndex = 0;

	contentsWrap.forEach((item) => {
		const contentsList = item.querySelector('.contents-list');
		const nextBtn = item.querySelector('.next');

		nextBtn.addEventListener('click', () => {
			if (!isMove) {
				nextText(item);
				nextImg(contentsList);
			}
		});
	});

	function nextText(item) {
		const itemLength = item.querySelectorAll('li').length;
		const itemClass = item.classList[0];
		const itemText = item.querySelector('.contents-text-wrap');

		contentsIndex++;

		if (contentsIndex === itemLength) {
			contentsIndex = 0;
		}

		axios
			.get(`/andaz/ajax/${itemClass}/${itemClass}${contentsIndex}.html`)
			.then((res) => {
				itemText.innerHTML = res.data;
			});
	}

	function nextImg(target) {
		isMove = true;

		gsap.fromTo(
			target,
			{ xPercent: 0 },
			{
				xPercent: -81.2,
				duration: 0.4,
				ease: 'power1.out',
				onStart: () => {
					start(target);
				},
				onComplete: () => {
					complete(target);
				}
			}
		);
	}

	function start(target) {
		gsap.to(target.children[1], {
			width: '80%',
			filter: 'brightness(1)',
			duration: 0.4,
			ease: 'power1.out'
		});
	}

	function complete(target) {
		if (isMove) {
			isMove = false;

			target.append(target.firstElementChild);
			gsap.set(target, { xPercent: 0 });
			gsap.set(target.lastElementChild, {
				width: '20%',
				filter: 'brightness(0.5)'
			});
		}
	}
}

function mapExView() {
	const mapBtn = document.querySelector('#map-img');
	const mapEx = document.createElement('div');
	mapEx.id = 'map-ex';
	mapEx.innerHTML = `<button type="button"><img></button>`;
	mapEx.setAttribute('role', 'dialog');
	mapEx.setAttribute('aria-modal', 'true');
	mapEx.setAttribute('aria-label', '지도 크게 보기');
	mapEx.setAttribute('tabindex', '-1');
	mapEx.children[0].children[0].src = `/andaz/images/map-ex.jpg`;

	mapBtn.addEventListener('click', exView);
	mapEx.addEventListener('click', hide);
	mapEx.addEventListener('keydown', (e) => {
		if (e.key === 'Escape') {
			hide();
		}
	});

	function exView() {
		document.body.append(mapEx);
		document.body.parentElement.classList.add('stable');
		document.body.setAttribute('aria-hidden', 'true');
		mapEx.children[0].focus();
	}

	function hide() {
		mapEx.remove();
		document.body.parentElement.classList.remove('stable');
		document.body.removeAttribute('aria-hidden');
		mapBtn.focus();
	}
}
