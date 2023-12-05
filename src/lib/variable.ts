export enum VariableType {
  Numeric,
  Univalued,
  Multivalued,
}

export class Variable {
  name: string;
  type: VariableType;
  value: number | string | string[];
  possibleValues: string[];

  constructor(
    name: string,
    type: VariableType,
    value: number | string | string[]
  ) {
    this.name = name;
    this.type = type;
    this.value = value;
    this.possibleValues = [];
  }

  addPossibleValue(value: string) {
    this.possibleValues.push(value);
  }

  removePossibleValue(index: number) {
    this.possibleValues.splice(index, 1);
  }
}
