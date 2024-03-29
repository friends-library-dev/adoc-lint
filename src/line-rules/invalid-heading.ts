import { LineRule, LintResult } from '../types';

const rule: LineRule = (
  line: string,
  lines: string[],
  lineNumber: number,
): LintResult[] => {
  if (line[0] !== `=`) {
    return [];
  }

  if (line.match(/^={2,4} [^\s\n]/)) {
    return [];
  }

  if (line === `====`) {
    return []; // example block delimiter (used by .numbered-group)
  }

  if (line === `=======`) {
    return []; // will be flagged by `git-conflict-markers`
  }

  const fixable = !!line.match(/^={2,4}  +/);

  return [
    {
      line: lineNumber,
      column: 1,
      type: `error`,
      rule: rule.slug,
      message: `Headings may only have 2-4 equal signs, and must be followed by a space and at least one character`,
      fixable,
      ...(fixable ? { recommendation: line.replace(/  +/, ` `) } : {}),
    },
  ];
};

rule.slug = `invalid-heading`;
export default rule;
