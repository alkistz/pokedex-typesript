import readline from "readline";

export function cleanInput(input: string): string[] {
  return input.trim().toLowerCase().split(/\s+/);
}

export function startREPL() {
  const rl = readline.createInterface({
    input: process.stdin, // where user types
    output: process.stdout, // where you print
    prompt: "Pokedex > ", // what the user sees as the prompt
  });

  rl.prompt();
  rl.on("line", (line) => {
    const words = cleanInput(line)
    if (words.length === 0) {
        rl.prompt()
        return
    } 

    console.log(`Your command was: ${words[0]}`)
    rl.prompt()
  });
}
