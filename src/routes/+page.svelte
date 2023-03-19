<script lang="ts">
  import { onMount } from "svelte";
  import {
    setClass,
    Theme,
    getConstrastStorage,
    isDarkScheme,
    addContrastStorage,
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
  /*
   * if clicked on dark or light: will be only that theme class
   * but if clicked on system, then it will be additional to the
   * anothers (dark or light).
   * E.g. class="darkTheme"; class="lightTheme"; class="darkTheme systemTheme"
   * class="lightTheme systemTheme"
   */
  const setTheme = (theme: Theme) => {
    if (theme === Theme.system) {
      if (isDarkScheme) {
        theme = Theme.dark;
      } else {
        theme = Theme.light;
      }
    }
    // else {
    //   removeClass(Theme.system);
    // }

    // theme is dark or light, but not system
    setClass(theme);
    addContrastStorage(theme);
    disableButton(theme);
  };
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
      const setClass = (theme: Theme) => {
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
      // Ever has a theme storage
      if (isDarkStorage) {
        setClass(Theme.dark);
      } else if (isLightStorage) {
        setClass(Theme.light);
        // here is the first access
      } else if (isDarkScheme) {
        setClass(Theme.dark);
        localStorage.setItem(Theme.contrast, Theme.dark);
      } else if (isLightScheme) {
        setClass(Theme.light);
        localStorage.setItem(Theme.contrast, Theme.light);
      }
    }
  </script>
</svelte:head>

<button
  disabled={isDisabled || disableButtons[Theme.dark]}
  on:click={() => setTheme(Theme.dark)}
  >Dark
</button>
<button
  disabled={isDisabled || disableButtons[Theme.light]}
  on:click={() => setTheme(Theme.light)}
>
  Light
</button>
<button
  disabled={isDisabled || disableButtons[Theme.system]}
  on:click={() => setTheme(Theme.system)}
  >System
</button>

<header>
  <!-- <label for="theme-switch" class="switch-label" /> -->
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

<style lang="postcss">
  @import "./light.css";
  @import "./dark.css";
  :global(:root) {
  }
  :global(.darkTheme) {
  }
  :global(.lightTheme) {
  }
  :global(body) {
    --text-color: var(--color-primary-400);
    background: var(--bg-color);
    color: var(--text-color);
    font-family: var(--font-family);
    min-height: 100%;
    transition: color 0.2s, background-color 0.2s;
  }
  a {
    color: var(--theme-color);
  }
</style>
