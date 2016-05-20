/*global jQuery, todo */
/*jshint unused:false */

(function() {
	'use strict';

	jQuery.sap.declare('todo.TodoPersistency');

	todo.TodoPersistency = function(aName) {
		this.name = aName;
	};

	todo.TodoPersistency.prototype = (function() {
		var storage = window.localStorage;

		return {
			get: function() {
				var result = {};
				$.ajax({
					"url": "/storage",
					"async": false
				}).
				done(function(data) {
					result = JSON.parse(data);
				});
				return result;
			},
			set: function(data) {
				storage.setItem(this.name, JSON.stringify(data));
				return this; // for method chaining
			},
			remove: function() {
				storage.removeItem(this.name);
				return this; // for method chaining
			},
			isEmpty: function() {
				return !(this.get());
			}
		};
	}());
})();