

// Localization component
var Localization = {
	template: '<div/>',
	data: function() {
		return {
			l10n: null,
			eventReceived: false
		}
	},
	mounted: function() {
		var vm = this;
		if (vm.l10n == null) {
			require(["sugar-web/env", "webL10n"], function (env, webL10n) {
				env.getEnvironment(function(err, environment) {
					vm.l10n = webL10n;
					var defaultLanguage = (typeof chrome != 'undefined' && chrome.app && chrome.app.runtime) ? chrome.i18n.getUILanguage() : navigator.language;
					var language = environment.user ? environment.user.language : defaultLanguage;
					webL10n.language.code = language;
					window.addEventListener("localized", function() {
						if (!vm.eventReceived) {
							vm.$emit("localized");
							vm.eventReceived = true;
						}
					});
				});
			});
		}
	},
	methods: {
		get: function(str) {
			return this.l10n.get(str);
		}
	}
}