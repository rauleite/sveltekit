// Dark Theme --- --- --- ---
// const theme = {
// storage: {
const isBrowser = !!document;

if (isBrowser) {
	enum Theme {
		contrast = "contrastTheme",
		dark = "darkTheme",
		light = "lightTheme",
	}
	enum Action {
		remove = "remove",
		add = "add",
	}
	const addClass = (theme: Theme) => {
		const updateClass = (action: string, name: string) => {
			document.documentElement.classList[action](name);
		};

		if (theme === Theme.dark) {
			updateClass(Action.remove, Theme.light);
			updateClass(Action.add, Theme.dark);
		} else if (theme === Theme.light) {
			updateClass(Action.remove, Theme.dark);
			updateClass(Action.add, Theme.light);
		}
	};
	const storageContrastTheme = localStorage.getItem(Theme.contrast);
	const isDarkStorage = storageContrastTheme === Theme.dark;
	const isLightStorage = storageContrastTheme === Theme.light;
	const isDarkScheme = window.matchMedia(
		"(prefers-color-scheme: dark)",
	).matches;
	const isLightScheme = window.matchMedia(
		"(prefers-color-scheme: light)",
	).matches;

	console.log("storageContrastTheme", storageContrastTheme);
	if (isDarkStorage) {
		console.log("isDarkStorage");
		addClass(Theme.dark);
	} else if (isLightStorage) {
		console.log("isLightStorage");
		addClass(Theme.light);
	} else if (isDarkScheme) {
		console.log("isDarkScheme");
		addClass(Theme.dark);
	} else if (isLightScheme) {
		console.log("isLightScheme");
		addClass(Theme.light);
	}
}
