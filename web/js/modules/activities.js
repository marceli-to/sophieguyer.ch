'use strict';

function Activities() {
	this._selectors = {
		filterItem: '.activities-select',
		filterItemToggle: '.filter-item-title',
		checkboxes: '.filter-item-entries input[type="checkbox"]',
		//search: '.filter-search input[type="search"]',
		date: '.activities-input input[type="text"]',
		//memberBoxesContainer: '.member-list'
		table: '#activities-table',
		hrefButtons: [
			'#pdf',
			'#print'
		],
		resetButton: '.button[type="reset"]'
	}
	this._filters = {};
	this._searchDebounce = null;
	this._constructor();
}

Activities.prototype._constructor = function () {
	this._populateFilterObject();
	this._UIActions();
}

Activities.prototype._populateFilterObject = function () {
	const _this = this;
	_this._filters = {};
	$(this._selectors.filterItem).each(function (index, element) {
		const filterItemId = $(element).data('id');
		_this._filters[filterItemId] = [];
	});
}

Activities.prototype._UIActions = function () {
	const _this = this;
	$(_this._selectors.checkboxes).on('change', function () {
		_this._onCheckboxChange(this);
		_this.loadDataWithFilter();
	});
	$(_this._selectors.date).on('change', function(){
		const elem = this;
		_this._filters.date = $(elem).val();
		_this.loadDataWithFilter();
	});
	$(_this._selectors.resetButton).on('click', function(){
		_this._populateFilterObject();
		_this.loadDataWithFilter();
	})
/*
	$(_this._selectors.search).on('keyup change search', function () {
		const elem = this;
		clearTimeout(_this._searchDebounce);
		_this._searchDebounce = setTimeout(function () {
			// do the request only if min 3 letters
			const value = $(elem).val();
			if (value.length >= 3) {
				_this._filters.fullname = value;
				_this.loadDataWithFilter();
			} else {
				_this._filters.fullname = '';
				_this.loadDataWithFilter();
			}
		}, 275);
	});
*/
	$(document).on('click', function () {
		$(_this._selectors.filterItemToggle).parent().removeClass('active');
	});

	$(_this._selectors.filterItem).on('click', function (e) {
		e.stopPropagation();
	})

	$(_this._selectors.filterItemToggle).on('click', function (e) {
		const isCurrentlyActive = $(this).parent().hasClass('active');

		$(_this._selectors.filterItemToggle).parent().removeClass('active');

		if (!isCurrentlyActive) {
			$(this).parent().addClass('active');
			e.stopPropagation();
		}
	});


}

Activities.prototype._onCheckboxChange = function (elem) {
	const _this = this;
	const $elem = $(elem);

	const checkboxValue = $elem.attr('value');
	const checkboxParentId = $elem.data('parent');

	// add value if checkbox is checked
	if ($elem.is(':checked')) {
		_this._filters[checkboxParentId].push(checkboxValue);
	} else {
		// remove value from filter Array
		const indexOfElement = _this._filters[checkboxParentId].indexOf(checkboxValue);
		_this._filters[checkboxParentId].splice(indexOfElement, 1);
	}
}

Activities.prototype.loadDataWithFilter = function () {
	const _this = this;
	const data = _this.getFilterHttpQuery();

	// update Buttons
	for (let i = 0; i < _this._selectors.hrefButtons.length; i++){
		const element = $(_this._selectors.hrefButtons[i]);
		const baseHref = element.data('href');

		// update getParam
		if(data.length){
			element.attr('href', baseHref + '?' + data);
		}else{
			element.attr('href', baseHref);
		}
	}

	$.ajax('/api/aktivitaeten', {
		method: 'get',
		data,
		success: function (response) {
			$(_this._selectors.table).html(response);
		}
	});
}

/**
 * @returns {string}
 */
Activities.prototype.getFilterHttpQuery = function () {
	const query = [];
	for (let property in this._filters) {
		if (this._filters[property].length > 0) {

			let value;
			// is value is array
			switch (typeof this._filters[property]) {
				case "object":
					value = encodeURIComponent(this._filters[property].join(','))
					break;
				case "string":
					value = encodeURIComponent(this._filters[property])
					break;
			}

			query.push(encodeURIComponent(property) + "=" + value);
		}
	}
	return query.join('&');
}

const activities = new Activities();

// Datepicker
let minDate = new Date();
minDate.setDate(minDate.getDate() - 1);

const picker = new Litepicker({
	element: document.getElementById('range'),
	plugins: ['mobilefriendly'],
	mobilefriendly: {
		breakpoint: 900,
	},
	format: 'DD\.MM\.YYYY',
	lang: 'de-CH',
	singleMode: false,
	numberOfColumns: 2,
	numberOfMonths: 2,
	minDate,
	autoRefresh: true,
	zIndex: 20,
	showTooltip: false,

	resetButton: function(){
		let btn = $(`<button class="reset-button" title="Zurücksetzen"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
				<path d="M0 0h24v24H0z" fill="none"></path>
			<path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"></path>
		</svg></button>`);
		btn.on('click', function(){
			picker.hide();
		});
		return btn[0];
	},
});
picker.on('hide', function(){
	$('#range').trigger('change');
});
