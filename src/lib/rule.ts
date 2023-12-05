import { VariableType, type Variable } from "./variable";

export enum ConditionType {
  Equal,
  NotEqual,
  Greater,
  Less,
  GreaterOrEqual,
  LessOrEqual,
}

export enum RuleItemType {
  If,
  And,
  Or,
  Then,
  Not,
}

export class RuleItem {
  type: RuleItemType;
  variable: Variable;
  condition: ConditionType;
  comparisonValue: number | string;

  constructor(
    type: RuleItemType,
    variable: Variable,
    condition: ConditionType,
    comparisonValue: number | string
  ) {
    this.type = type;
    this.variable = variable;
    this.condition = condition;
    this.comparisonValue = comparisonValue;
  }

  result() {
    if (this.variable.type === VariableType.Numeric) {
      switch (this.condition) {
        case ConditionType.Equal:
          return (
            (this.variable.value as number) === (this.comparisonValue as number)
          );
        case ConditionType.NotEqual:
          return (
            (this.variable.value as number) !== (this.comparisonValue as number)
          );
        case ConditionType.Greater:
          return (
            (this.variable.value as number) > (this.comparisonValue as number)
          );
        case ConditionType.Less:
          return (
            (this.variable.value as number) < (this.comparisonValue as number)
          );
        case ConditionType.GreaterOrEqual:
          return (
            (this.variable.value as number) >= (this.comparisonValue as number)
          );
        case ConditionType.LessOrEqual:
          return (
            (this.variable.value as number) <= (this.comparisonValue as number)
          );
      }
    }

    if (this.variable.type === VariableType.Univalued) {
      switch (this.condition) {
        case ConditionType.Equal:
          return (
            (this.variable.value as string) === (this.comparisonValue as string)
          );
        case ConditionType.NotEqual:
          return (
            (this.variable.value as string) !== (this.comparisonValue as string)
          );
      }
    }

    if (this.variable.type === VariableType.Multivalued) {
      switch (this.condition) {
        case ConditionType.Equal:
          return (this.variable.value as string).includes(
            this.comparisonValue as string
          );
        case ConditionType.NotEqual:
          return !(this.variable.value as string).includes(
            this.comparisonValue as string
          );
      }
    }

    return false;
  }
}

export class Rule {
  name: string;
  items: RuleItem[];

  constructor(name: string) {
    this.name = name;
    this.items = [];
  }

  addItem(item: RuleItem) {
    this.items.push(item);
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
  }

  result() {
    for (const item of this.items) {
      if (!item.result()) {
        return false;
      }
    }

    return true;
  }
}
