import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Merge Next.js defaults (like core-web-vitals) with custom rules
const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals"], // more strict than "next"
    rules: {
      "react/no-unescaped-entities": "off",
      "@next/next/no-page-custom-font": "off",
      "@next/next/no-img-element": "off", // optional: suppress <img /> warning too
    },
  }),
];

export default eslintConfig;
