import { LineRule, LintResult } from '../types';

const rule: LineRule = (
  line: string,
  lines: string[],
  lineNumber: number,
): LintResult[] => {
  if (line === `` || !line.includes(`*`)) {
    return [];
  }

  if (
    line.startsWith(`|`) ||
    line.match(/^\* .+/) ||
    line.includes(`+++*`) ||
    line.match(/( |^)\*\*\w.*(\w|,|\.)\*\*( |-|$)/)
  ) {
    return [];
  }

  return [
    {
      line: lineNumber,
      column: line.indexOf(`*`) + 1,
      type: `error`,
      rule: rule.slug,
      message: `unexpected asterisk`,
      fixable: false,
      recommendation: line.replace(/\*/g, ``),
    },
  ];
};

rule.slug = `unexpected-asterisk`;

export default rule;
