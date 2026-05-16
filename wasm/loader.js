import { WASI, OpenFile, File, ConsoleStdout } from "https://cdn.jsdelivr.net/npm/@bjorn3/browser_wasi_shim/+esm";

let wasmModule = null;

export async function initWasm() {
  wasmModule = await WebAssembly.compileStreaming(fetch("/wasm/theorem-prover.wasm"));
  console.log("WASM module compiled and cached");
}

export async function parseToCNF(input) {
  const inputBytes = new TextEncoder().encode(input + "\n");
  let outputLines = [];

  const wasi = new WASI([], [], [
    new OpenFile(new File(inputBytes)),                               // fd 0: stdin
    ConsoleStdout.lineBuffered(line => outputLines.push(line)),       // fd 1: stdout
    ConsoleStdout.lineBuffered(line => console.warn("[stderr]", line)), // fd 2: stderr
  ]);

  const instance = await WebAssembly.instantiate(wasmModule, {
    wasi_snapshot_preview1: wasi.wasiImport
  });

  try {
    wasi.start(instance);
  } catch (e) {
    // GHC calls proc_exit(0) on clean exit which throws — ignore exit code 0
    if (!e.message?.includes("exit code 0")) throw e;
  }

  return outputLines.join("\n");
}
