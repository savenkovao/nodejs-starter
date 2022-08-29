/// <reference types="vitest" />
import path from "path";
import { defineConfig } from "vite";
import {configDefaults} from "vitest/config";

defineConfig({
    test: {
        // exclude: [...configDefaults.exclude],
    }
});