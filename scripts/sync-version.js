import { readFileSync, writeFileSync } from "node:fs";
import { versionNumber } from "../src/lib/version_number.js";

// Update package.json
const pkg = JSON.parse(readFileSync("./package.json", "utf8"));
pkg.version = versionNumber;
writeFileSync("./package.json", JSON.stringify(pkg, null, 4));

console.log(`Version synced to ${versionNumber}`);
