var NumberTools = (function(){
	function precision(value, significantDigit){
		var multiplier = Math.pow(10, significantDigit);
		return Math.round(value * multiplier) / multiplier;
	}

	function round(value, radix){
		return Math.round(value / radix) * radix;
	}

	function isNumber (value) {
		return !isNaN(value-0) && value !== null && value !== "" && value !== false;
	}

	function parseIntOrDefault(value, defaultValue){
		var int = parseInt(value);
		return isNaN(int) ? (defaultValue || null) : value;
	}

	function clamp(value, low, high){
		low = low !== undefined ? low : Number.MIN_SAFE_INTEGER;
		high = high !== undefined ? high : Number.MAX_SAFE_INTEGER;
		if(value < low){
			value = low;
		}
		if(value > high){
			value = high;
		}
		return value;
	}

	return {
		precision : precision,
		round : round,
		isNumber : isNumber,
		parseIntOrDefault : parseIntOrDefault,
		clamp : clamp
	};

})();
