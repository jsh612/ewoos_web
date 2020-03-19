// as const
//  - 타입을 확정해 버린다.
const theme = {
  pinkColor: "#E48282",
  doorColor: "#564646",
  blueColor: "#3897f0",
  bgColor: "#EAEDED"
} as const;

export type TTheme = typeof theme;

export default theme;
