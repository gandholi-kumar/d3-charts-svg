export interface GroupedStackedBarInfo extends StackedBarInformation {
  cumulative: number;
  total?: number;
}

export interface StackedBarInformation {
  value: number;
  label: string;
}

export interface StackedInputs {
  barInfo: StackedBarInformation[],
  total: number,
  configurations?: {[key: string]: any}
}