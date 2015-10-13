var Dispatcher = (function(){
	
	function create(){
		var dispatcher = {};
		bind(dispatcher);
		dispatcher.init();
		return dispatcher;
	}

	function bind(dispatcher){
		dispatcher.init = init.bind(dispatcher);
		dispatcher.addListener = addListener.bind(dispatcher);
		dispatcher.trigger = trigger.bind(dispatcher);
		dispatcher.removeListener = removeListener.bind(dispatcher);
	}

	function addListener(event, callback){
		var id = this.modal.id++;

		if(this.model.listeners[event]){
			this.model.listeners[event].push({
				id : id,
				callback : callback
			});
			return id;
		}else{
			this.model.listeners[event] = [{
				id : id,
				callback : callback
			}];
		}
	}

	function trigger(event, details){
		if(this.model.listeners[event]){
			for(var i = 0; i < this.model.listeners[event].length; i++){
				this.model.listeners[event][i].callback(details);
			}
		}
	}

	function removeListener(id){
		for(var key in this.model.listeners){
			ArrayHelper.arrayRemoveWhere(this.model.listeners[key], x => x.id == id);
		}
	}

	function pipe(dispatcher){
		
	}

	function init(){
		this.model = {
			listeners : {},
			currentId : 0
		};
	}

	return {
		create : create,
	};

})();