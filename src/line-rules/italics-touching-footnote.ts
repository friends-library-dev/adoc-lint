import { LineRule, LintResult } from '../types';

const rule: LineRule = (
  line: string,
  lines: string[],
  lineNumber: number,
): LintResult[] => {
  if (line === `` || !line.includes(`_`)) {
    return [];
  }

  const match = line.match(/[^_]_(\^|footnote:\[)/);
  if (!match) {
    return [];
  }

  return [
    {
      line: lineNumber,
      column: (match.index || 0) + 2,
      type: `error`,
      fixable: false,
      rule: rule.slug,
      recommendation: line.replace(/_/g, `__`),
      message: `Italics touching footnote markers must use double underscores`,
    },
  ];
};

rule.slug = `italics-touching-footnote`;
export default rule;
