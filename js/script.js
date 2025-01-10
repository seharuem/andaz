document.addEventListener('DOMContentLoaded', () => {
	roomSearchShowHide();
	roomPreview();
	roomTabEvent();
	diningEvent();
	summerHouse();
	wedding();
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

function wedding() {
	const contentsWrap = document.querySelectorAll('.contents-wrap');
	let isMove = false;

	contentsWrap.forEach((item) => {
		const contentsList = item.querySelector('.contents-list');
		const nextBtn = item.querySelector('.next');

		nextBtn.addEventListener('click', () => {
			nextImg(contentsList);
		});
	});

	// const weddingList = document.querySelector('#wedding-list');
	// const nextBtn = document.querySelector('#wedding-wrap .next');
	// let isMove = false;

	// nextBtn.addEventListener('click', nextImg);

	function nextImg(target) {
		if (!isMove) {
			isMove = true;

			gsap.to(target, {
				x: -1120,
				duration: 0.4,
				ease: 'power1.out',
				onStart: () => {
					start(target);
				},
				onComplete: () => {
					complete(target);
				}
			});
		}
	}

	function start(target) {
		gsap.to(target.children[1], {
			width: 1100,
			filter: 'brightness(1)',
			duration: 0.4,
			ease: 'power1.out'
		});
	}

	function complete(target) {
		if (isMove) {
			isMove = false;

			target.append(target.firstElementChild);
			gsap.set(target, { x: 0 });
			gsap.set(target.children[1], { width: 400 });
			gsap.set(target.lastElementChild, {
				width: 400,
				filter: 'brightness(0.5)'
			});
		}
	}
}
