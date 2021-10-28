import {
  GroupedStackedBarInfo,
  StackedBarInformation,
} from '../models/stacked-data.model';

export function groupData(
  data: StackedBarInformation[],
  total?: number
): GroupedStackedBarInfo[] {
  let cumulative = 0;
  const _data = data.map((d: StackedBarInformation) => {
    cumulative += d.value ?? 0;
    return {
      value: d.value ?? 0,
      cumulative: cumulative - d.value, // want the cumulative to prior value (start of rect)
      label: d.label,
      total: total,
    };
  });
  return _data;
}
