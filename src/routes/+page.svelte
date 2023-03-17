<script lang="ts">
  import { onMount } from "svelte";
  import {
    addClass,
    Theme,
    removeAllClasses,
    setContrastStorage,
    removeContrastStorage,
    isContrastTheme,
    getConstrastStorage,
  } from "./page";

  let isDisabled = true;
  type Disable = {
    [Theme.dark]: boolean;
    [Theme.light]: boolean;
    [Theme.system]: boolean;
  };
  let disableButtons: Disable = {
    [Theme.dark]: false,
    [Theme.light]: false,
    [Theme.system]: false,
  };
  let disableButton = (theme: string): void => {
    Object.entries(disableButtons).map(([t]) => {
      disableButtons[t as keyof Disable] = theme === t;
    });
  };

  disableButton(getConstrastStorage());

  onMount(() => {
    isDisabled = false;
  });

  const dark = () => {
    addClass(Theme.dark);
    setContrastStorage(Theme.dark);
    disableButton(Theme.dark);
  };
  const light = () => {
    addClass(Theme.light);
    setContrastStorage(Theme.light);
    disableButton(Theme.light);
  };
  const system = () => {
    removeAllClasses();
    removeContrastStorage();
    disableButton(Theme.system);
  };
  console.log("isContrastTheme(Theme.dark)", isContrastTheme(Theme.dark));
  console.log("isDisabled", isDisabled);
</script>

<svelte:head>
  <script lang="ts">
    if (!!document) {
      enum Theme {
        contrast = "contrastTheme",
        dark = "darkTheme",
        light = "lightTheme",
      }
      enum Action {
        remove = "remove",
        add = "add",
      }
      const updateClass = (actionClass: string[][]) => {
        actionClass.forEach(([action, className]) => {
          document.documentElement.classList[action](className);
        });
      };
      const addClass = (theme: Theme) => {
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
      const storageContrastTheme = localStorage.getItem(Theme.contrast);
      const isDarkStorage = storageContrastTheme === Theme.dark;
      const isLightStorage = storageContrastTheme === Theme.light;
      const isDarkScheme = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const isLightScheme = window.matchMedia(
        "(prefers-color-scheme: light)"
      ).matches;

      console.log("storageContrastTheme", storageContrastTheme);

      if (isDarkStorage) {
        addClass(Theme.dark);
      } else if (isLightStorage) {
        addClass(Theme.light);
      } else if (isDarkScheme) {
        addClass(Theme.dark);
      } else if (isLightScheme) {
        // addClass(Theme.light);
      }
    }
  </script>
</svelte:head>

<button disabled={isDisabled || disableButtons[Theme.dark]} on:click={dark}
  >Dark</button
>
<button disabled={isDisabled || disableButtons[Theme.light]} on:click={light}>
  Light
</button>
<button disabled={isDisabled || disableButtons[Theme.system]} on:click={system}
  >System</button
>

<header>
  <label for="theme-switch" class="switch-label" />
</header>
<main>
  <h1>CSS Only Theme Switcher</h1>
  <p>
    This is a website theme switcher made using CSS only<i>*</i>. Click the moon
    above to try it out! You can also reach it by using your keyboard (<code
      >Tab</code
    >
    to focus, and <code>Space</code> to activate).
  </p>
  <p><a href="unlimited.html">Unlimited themes-version</a></p>
  <small
    >* The solution uses a tiny bit of optional JavaScript to store an item in
    localStorage, which allows the browser to remember which theme was selected
    when reloading the page.</small
  >
  <p>
    I wrote
    <a href="https://alexandersandberg.com/theme-switcher/"
      >an article on my website</a
    >
    explaining the functionality behind this.
  </p>
  <footer>
    <small
      >A tiny project by
      <a href="https://github.com/alexandersandberg">Alexander Sandberg</a>
      🐨 /
      <a href="https://github.com/alexandersandberg/theme-switcher"
        >GitHub repo</a
      ></small
    >
  </footer>
</main>

<style lang="scss">
  @use "sass:color";

  :global(:root) {
    /* Light mode */
    --light-text: #222430;
    /* --light-bg: #f7f7f7; */
    --light-bg-level: 0%;
    --light-bg-h: 0;
    --light-bg-s: 0%;
    --light-bg-l: 97%;

    --light-theme: #d34a97;
    /* --light-theme-lighten: 1; */
    --light-h-level: 0%;
    --light-h: 326;
    --light-s: 61%;
    --light-l: 56%;

    --light-theme-contrast: hsl(
      var(--light-h),
      var(--light-s),
      calc(var(--light-l) + var(--light-h-level))
    );
    // --light-theme: hsl(var(--light-h), var(--light-s), var(--light-l));
    --light-bg: hsl(var(--light-bg-h), var(--light-bg-s), var(--light-bg-l));

    /* Dark mode */
    --dark-text: #f7f7f7;
    --dark-bg: #222430;
    --dark-theme: #bd93f9;

    /* Default mode */
    --text-color: var(--light-text);
    --bg-color: var(--light-bg);
    --theme-color: var(--light-theme);
  }

  /* Switched mode */
  :global(.darkTheme) {
    --text-color: var(--dark-text);
    --bg-color: var(--dark-bg);
    --theme-color: var(--dark-theme);
  }
  :global(.lightTheme) {
    --text-color: var(--light-text);
    --bg-color: var(--light-bg);
    --theme-color: var(--light-theme);
  }

  /* Styling */
  :global(:root) {
    background: var(--bg-color);
    color: var(--text-color);
    font: normal 125%/1.4 Georgia, "Times New Roman", Times, serif;
    min-height: 100%;
    transition: color 0.2s, background-color 0.2s;
  }

  // :global(body) {
  body {
    // color: color.adjust(var(--light-theme), $red: 15);
    @debug color.blackness(var(--light-theme));
    // color: color.blackness(var(--light-theme));
    // color: var(--light-theme);
  }
  a {
    color: var(--theme-color);
    /* filter: brightness(var(--light-theme-lighten)) contrast(1.5) saturate(1.5); */
    /* filter: brightness(1.75); */
  }
  /* --light-theme: { */
  /*   text-color: #d34a97 */
  /*   filter: brightness(1.75) */
  /* } */
</style>
