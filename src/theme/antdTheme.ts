import type { ThemeConfig } from "antd";

/**
 * Global Ant Design theme. All brand colors, radii, typography and shadows
 * live here as tokens so components never hardcode them. Applied once at the
 * root via <ConfigProvider theme={antdTheme} />.
 */

export const BRAND = {
  primary: "#1f9d57",
  primaryHover: "#1b8b4d",
  surface: "#ffffff",
  canvas: "#faf8f1",
  borderSubtle: "#ece8dc",
  textStrong: "#16201a",
  textBody: "#1c2620",
  textMuted: "#a3a094",
} as const;

export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: BRAND.primary,
    colorLink: BRAND.primary,
    colorText: BRAND.textBody,
    colorTextHeading: BRAND.textStrong,
    fontFamily: "Manrope, system-ui, -apple-system, sans-serif",
    borderRadius: 9,
    borderRadiusLG: 16,
    controlHeight: 40,
    boxShadowTertiary: "0 1px 3px rgba(20,40,28,.05)",
  },
  components: {
    Button: {
      primaryColor: "#ffffff",
      colorPrimaryHover: BRAND.primaryHover,
      colorPrimaryActive: BRAND.primaryHover,
      fontWeight: 700,
      contentFontSize: 13,
      paddingInline: 18,
    },
    Card: {
      colorBorderSecondary: BRAND.borderSubtle,
      borderRadiusLG: 18,
    },
    Progress: {
      defaultColor: BRAND.primary,
    },
  },
};
