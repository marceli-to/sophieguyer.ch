'use strict';

function LoadMore(){
	this._constructor();
}

LoadMore.prototype.variables = {
	offset: 0,
	count: 0,
	hasMore: true,
}

LoadMore.prototype._properties = {
	trigger: $('#load-more'),
	fetchUrl: $('#load-more').data('url'),
	container: $('#load-more-container')
}


LoadMore.prototype._constructor = function(){
	if(this._properties.trigger.length){
		this._prepareVariables();
		this._UIActions();
	}
}

LoadMore.prototype._prepareVariables = function(){
	// set the count
	this.variables.count = this._properties.trigger.data('count');
	this.variables.offset = this._properties.container.children().length;
	//this.variables.count = this._properties.container.children().length;
	//this.variables.offset = this.variables.count;
}

LoadMore.prototype._UIActions = function(){
	const _this = this;
	_this._properties.trigger.on('click', function(){
		if(_this.variables.hasMore){
			const $button = $(this)
			$button.attr('disabled', true);
			$.ajax({
				method: 'get',
				data: {
					count: _this.variables.count,
					offset: _this.variables.offset
				},
				url: _this._properties.fetchUrl,
				success: function(response){
					const $response = $(response);

					// check if has more entries
					_this.variables.hasMore = $response.data('hasmore')
					_this.variables.offset += $response.children().length;

					// append children to container
					_this._properties.container.append($response.children());
					$button.attr('disabled', false);
					if(!_this.variables.hasMore){
						$button.parent().remove();
					}
				},
				error: function(){
					$button.parent().remove();
				}
			})
		}
	});
}


const loadMore = new LoadMore();
