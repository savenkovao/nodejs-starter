/// <reference types="vitest" />
import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";

defineConfig({
  test: {
    exclude: [...configDefaults.exclude],
  },
});
