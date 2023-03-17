import { browser } from "$app/environment";
export const isEmpty = (param: string | number | null | {}) => {
	return param === null || param === undefined;
};
export enum Theme {
	contrast = "contrastTheme",
	dark = "darkTheme",
	light = "lightTheme",
	system = "system",
}

export enum Action {
	remove = "remove",
	add = "add",
}
// Theming --- --- --- --- --- --- ---
const updateClass = (actionClass: string[][]) => {
	actionClass.forEach(([action, className]) => {
		document.documentElement.classList[action](className);
	});
};
export const addClass = (theme: Theme) => {
	if (theme === Theme.dark) {
		updateClass([
			[Action.remove, Theme.light],
			[Action.add, Theme.dark],
		]);
	} else if (theme === Theme.light) {
		updateClass([
			[Action.remove, Theme.dark],
			[Action.add, Theme.light],
		]);
	}
};
export const removeAllClasses = () => {
	updateClass([
		[Action.remove, Theme.light],
		[Action.remove, Theme.dark],
	]);
};

export const getConstrastStorage = (): string => {
	if (!browser) {
		return '';
	}
	return localStorage.getItem(Theme.contrast) || Theme.system;
};

export const setContrastStorage = (theme: string): void => {
	if (!browser) {
		return;
	}
	localStorage.setItem(Theme.contrast, theme);
};

export const removeContrastStorage = (): void => {
	if (!browser) {
		return;
	}
	localStorage.removeItem(Theme.contrast);
};

export const isContrastTheme = (theme: string): boolean => {
	if (!browser) {
		return false;
	}

	const contrastStorage = getConstrastStorage();
	if (isEmpty(contrastStorage)) {
		return false;
	}
	return contrastStorage === theme;
};
