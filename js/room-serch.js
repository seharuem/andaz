document.addEventListener('DOMContentLoaded', () => {
	datePicker();
	countEvent();
});

function datePicker() {
	new AirDatepicker('#datepicker', {
		locale: {
			days: [
				'일요일',
				'월요일',
				'화요일',
				'수요일',
				'목요일',
				'금요일',
				'토요일'
			],
			daysShort: ['일', '월', '화', '수', '목', '금', '토'],
			daysMin: ['일', '월', '화', '수', '목', '금', '토'],
			months: [
				'1월',
				'2월',
				'3월',
				'4월',
				'5월',
				'6월',
				'7월',
				'8월',
				'9월',
				'10월',
				'11월',
				'12월'
			],
			monthsShort: [
				'1월',
				'2월',
				'3월',
				'4월',
				'5월',
				'6월',
				'7월',
				'8월',
				'9월',
				'10월',
				'11월',
				'12월'
			],
			today: '오늘',
			clear: '초기화',
			dateFormat: 'yyyy. MM. dd.',
			timeFormat: 'hh:mm aa',
			firstDay: 0
		},
		selectedDates: [
			new Date(),
			new Date(new Date().setDate(new Date().getDate() + 1))
		],
		onSelect({ date, datepicker }) {
			// 첫 번째 날짜 선택 후에도 구분자 유지
			if (datepicker.selectedDates.length === 1) {
				datepicker.$el.value =
					datepicker.$el.value + '\u00A0\u00A0\u00A0\u00A0체크아웃\u00A0\u00A0';
			}
		},
		container: '#room-search',
		range: true,
		multipleDatesSeparator: '\u00A0\u00A0\u00A0\u00A0체크아웃\u00A0\u00A0',
		autoClose: true,
		minDate: new Date(),
		maxDate: new Date(2026, 11, 31),
		position: 'top left'
	});
}

function countEvent() {
	const countList = document.querySelectorAll('.room-search-form.count');

	countList.forEach((form) => {
		count(form);
	});
}

function count(form) {
	const minusBtn = form.querySelector('.minus');
	const number = form.querySelector('input');
	const plusBtn = form.querySelector('.plus');

	minusBtn.addEventListener('click', decrease);
	plusBtn.addEventListener('click', increase);

	function decrease() {
		if (number.value > number.min) {
			number.value = parseInt(number.value) - 1;
		}
	}

	function increase() {
		if (number.value < number.max) {
			number.value = parseInt(number.value) + 1;
		}
	}
}
