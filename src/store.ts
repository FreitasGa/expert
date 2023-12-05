import { writable } from "svelte/store";

import type { Rule } from "./lib/rule";
import type { Variable } from "./lib/variable";

export const rules = writable<Rule[]>([]);
export const variables = writable<Variable[]>([]);
