import readline from "readline";
import { getCommands } from "./commands.js";

export function cleanInput(input: string): string[] {
  return input.trim().toLowerCase().split(/\s+/);
}

export function startREPL() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  rl.prompt();
  rl.on("line", (line) => {
    const words = cleanInput(line);
    if (words.length === 0) {
      rl.prompt();
      return;
    }

    const commandName = words[0];
    const commands = getCommands();
    if (!(commandName in commands)) {
      console.log("Unkown command");
      rl.prompt();
      return;
    }

    try {
      commands[commandName].callback(commands);
    } catch (e) {
      console.log(e);
    }
    rl.prompt();
  });
}
