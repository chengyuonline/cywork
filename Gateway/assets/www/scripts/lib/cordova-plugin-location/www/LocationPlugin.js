cordova.define("cordova-plugin-location.location", function(require, exports,
				module) {

			var exec = require('cordova/exec');
			module.exports = {
				getLocationInfo : function(win, fail) {
					exec(win, fail, "Location", "phoneLocationInfo", []);
				}
			}
		});
