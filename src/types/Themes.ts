export enum Themes {
  dark = "Dark",
  light = "Light",
}

export const themeOptions: { value: Themes; label: string }[] = [
  { value: Themes.dark, label: "Dark" },
  { value: Themes.light, label: "Light" },
];
