import { LineRule, LintResult } from '../types';
import { isAsciidocBracketLine } from '../utils';

const rule: LineRule = (
  line: string,
  lines: string[],
  lineNumber: number,
): LintResult[] => {
  if (line === `` || !isAsciidocBracketLine(line)) {
    return [];
  }

  if (line.includes(`.postscript`) && lines[lineNumber] !== `====`) {
    return [
      {
        line: lineNumber,
        column: false,
        type: `error`,
        rule: rule.slug,
        message: `Postscripts must be wrapped in blocks with \`====\` delimiters`,
      },
    ];
  }

  return [];
};

rule.slug = `unwrapped-postscript`;

export default rule;
