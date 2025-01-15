document.addEventListener('DOMContentLoaded', () => {
	roomSearchShowHide();
	choiceDiscount();
	specialCode();
	roomPreview();
	roomTabEvent();
	diningEvent();
	summerHouse();
	contentsSlide();
});

function roomSearchShowHide() {
	const roomSearch = document.querySelector('#room-search');
	const toggleBtn = roomSearch.querySelector('#search-hide-show');
	let isShow = true;

	toggleBtn.addEventListener('click', showToggle);

	function showToggle() {
		if (isShow) {
			gsap.to(roomSearch, {
				y: 80,
				onComplete: () => {
					isShow = false;
					toggleBtn.classList.add('hide');
					toggleBtn.innerHTML = '펼치기';
				}
			});
		} else {
			gsap.to(roomSearch, {
				y: 0,
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

	choiceItem.forEach((list) => {
		const btn = list.children[0];

		btn.addEventListener('click', inputText);

		function inputText() {
			const choiceText = btn.innerHTML;

			moveList();

			if (list !== choiceItem[0]) {
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
	}
}

function specialCode() {
	const codeBtn = document.querySelectorAll('#offer-list button');
	const copyUrl = 'url(/andaz/images/copy.svg)';
	const checkUrl = 'url(/andaz/images/check.svg)';
	let toastTimer;
	let copyImg;
	let toast;
	let isActive = false;

	codeBtn.forEach((btn, index) => {
		const code = btn.innerText;

		btn.addEventListener('click', async () => {
			
			if (isActive) {
				clearTimeout(toastTimer);
				codeInit(copyImg);
			}
			
			isActive = true;
			toastCreate();
			copyImg = codeBtn[index];
			
			await codeCopy(code, btn);
			
			toastMotion();
		});
	});

	function codeInit(img) {
		if (!img) return;
		img.style.backgroundImage = copyUrl;
		if (toast) toast.remove();
		isActive = false;
	}

	function toastCreate() {
		toast = document.createElement('div');
		toast.id = 'toast';
		document.body.appendChild(toast);
	}

	function toastMotion() {
		requestAnimationFrame(() => {
			toast.style.opacity = 1;
		});

		toastTimer = setTimeout(() => {
			toast.style.opacity = 0;
			setTimeout(() => {
				codeInit(copyImg);
			}, 400);
		}, 1000);
	}

	async function codeCopy(code, btn) {
		try {
			await navigator.clipboard.writeText(code);
			btn.style.backgroundImage = checkUrl;
			// toastCreate();
			toast.innerText = '복사되었습니다!';
		} catch (err) {
			toast.innerText = '복사 실패하였습니다.';
		}
	}
}

function roomPreview() {
	const roomListBtn = document.querySelectorAll('#room-info-wrap button');
	const roomImgBtn = document.querySelector('#room-img');
	const roomImg = roomImgBtn.children[0];
	const roomEx = document.createElement('div');

	let activeBtn = roomListBtn[0];
	let isActive = false;

	roomImgBtn.addEventListener('click', roomExImg);

	roomEx.addEventListener('click', () => {
		roomEx.remove();
	});

	roomListBtn.forEach((btn) => {
		btn.addEventListener('click', () => {
			imgChange(btn);
		});
	});

	function roomExImg() {
		if (!isActive) {
			isActive = true;

			roomEx.id = 'room-ex';
			roomEx.innerHTML = '<img>';
			roomEx.children[0].src = roomImg.src;

			document.body.append(roomEx);

			gsap.from(roomEx, {
				opacity: 0.7,
				onComplete: () => (isActive = false)
			});
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
	const roomTabBtn = document.querySelectorAll('#room-type-menu button');
	let activeBtn = roomTabBtn[0];

	roomTabBtn.forEach((btn) => {
		btn.addEventListener('click', () => {
			tabChange(btn);
		});
	});

	function tabChange(btn) {
		if (btn !== activeBtn) {
			activeBtn.classList.remove('active');
			btn.classList.add('active');
			activeBtn = btn;
		}
	}
}

function diningEvent() {
	const diningInfo = document.querySelectorAll('.dining-info-wrap');
	let showInfo;

	diningInfo.forEach((info) => {
		info.addEventListener('mouseenter', () => {
			hoverInfo(info);
		});

		info.addEventListener('mouseleave', () => {
			info.style.opacity = 0;
			showInfo = null;
		});
	});

	function hoverInfo(info) {
		if (!showInfo) {
			info.style.opacity = 1;
			showInfo = info;
		}
	}
}

function summerHouse() {
	const summerList = document.querySelectorAll('#summer-img-list button');
	let activeList = summerList[0];

	summerList.forEach((list) => {
		list.addEventListener('click', () => {
			listChange(list);
		});
	});

	function listChange(list) {
		if (list !== activeList) {
			activeList.parentElement.classList.remove('active');
			list.parentElement.classList.add('active');
			activeList = list;
		}
	}
}

function contentsSlide() {
	const contentsWrap = document.querySelectorAll('.contents-wrap');
	let isMove = false;

	contentsWrap.forEach((item) => {
		const contentsList = item.querySelector('.contents-list');
		const nextBtn = item.querySelector('.next');

		nextBtn.addEventListener('click', () => {
			nextImg(contentsList);
		});
	});

	function nextImg(target) {
		if (!isMove) {
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
			// gsap.set(target.children[1], { width: '20%' });
			gsap.set(target.lastElementChild, {
				width: '20%',
				filter: 'brightness(0.5)'
			});
		}
	}
}
