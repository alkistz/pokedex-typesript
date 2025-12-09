import readline from "readline";
import { getCommands } from "./commands.js";
import { initState, State } from "./state.js";

export function cleanInput(input: string): string[] {
  return input.trim().toLowerCase().split(/\s+/);
}

export function startREPL(state: State) {
  state.rl.prompt();
  state.rl.on("line", (line) => {
    const words = cleanInput(line);
    if (words.length === 0) {
      state.rl.prompt();
      return;
    }

    const commandName = words[0];
    if (!(commandName in state.commands)) {
      console.log("Unkown command");
      state.rl.prompt();
      return;
    }

    try {
      state.commands[commandName].callback(state);
    } catch (e) {
      console.log(e);
    }
    state.rl.prompt();
  });
}
