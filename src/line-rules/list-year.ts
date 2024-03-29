import { LineRule, LintResult } from '../types';

const rule: LineRule = (
  line: string,
  lines: string[],
  lineNumber: number,
): LintResult[] => {
  const match = line.match(/^\* \d+\. /);
  if (!match) {
    return [];
  }

  return [
    {
      line: lineNumber,
      column: line.indexOf(`.`) + 1,
      rule: rule.slug,
      type: `error`,
      message: `The period after a year that comes first on a _list-item line_ (begins with \`*\`) must be escaped.`,
      recommendation: line.replace(`.`, `+++.+++`),
    },
  ];
};

rule.slug = `list-year`;
export default rule;
