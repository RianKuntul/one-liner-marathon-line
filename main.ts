// One-Liner Marathon — entry program (v2).
//
// Writes a single one-line comedy joke to /output/entry.txt:
// one line, 1-280 characters, a setup and a turn that lands, nothing else.
//
// Runner: Node 22 (`node main.ts`). Uses only erasable TypeScript syntax
// so Node's built-in type stripping runs it as-is.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The joke. Setup: the GPS says "recalculating" in a familiar tone.
// Turn: it's the exact tone of the ex when asked where the relationship
// was going — both of them already knew the driver was lost.
const ENTRY_LINE: string =
  "My GPS said 'recalculating' in the exact tone my ex used when I asked where this relationship was going — turns out both of them already knew I was lost.";

const MIN_CHARS = 1;
const MAX_CHARS = 280;

function main(): void {
  const outDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const outPath: string = join(outDir, "entry.txt");

  // Read-back gate: refuse anything outside 1-280 characters, or
  // anything that is only whitespace or spans more than one line.
  const length: number = [...ENTRY_LINE].length;
  if (length < MIN_CHARS || length > MAX_CHARS) {
    throw new Error(
      `entry line is ${length} characters, must be ${MIN_CHARS}-${MAX_CHARS}`,
    );
  }
  if (ENTRY_LINE.trim().length === 0) {
    throw new Error("entry line must not be only whitespace");
  }
  if (ENTRY_LINE.includes("\n")) {
    throw new Error("entry line must be a single line");
  }

  mkdirSync(outDir, { recursive: true });
  writeFileSync(outPath, ENTRY_LINE, "utf8");
  console.log(`wrote ${length} characters to ${outPath}`);
}

main();
