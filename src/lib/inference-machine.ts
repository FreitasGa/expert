import type { Rule } from "./rule";

export class InferenceMachine {
  rules: Rule[];

  constructor(rules: Rule[]) {
    this.rules = rules;
  }

  run() {
    for (const rule of this.rules) {
      if (!rule.result()) {
        return false;
      }
    }

    return true;
  }
}
