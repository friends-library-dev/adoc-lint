import { isAsciidocBracketLine } from '../utils';
import { LineRule, LintResult } from '../types';

const rule: LineRule = (
  line: string,
  lines: string[],
  lineNumber: number,
): LintResult[] => {
  if (
    line === `` ||
    line === `{footnote-paragraph-split}` ||
    isAsciidocBracketLine(line)
  ) {
    return [];
  }

  const expr = /[a-z][0-9&£$%*(={}°\\/[\]](?!hellip;)([a-zA-Z ]|\b)/g;
  let match: RegExpExecArray | null = null;
  const results: LintResult[] = [];
  while ((match = expr.exec(line))) {
    if (match[0].endsWith(`] `) || match[0].endsWith(`* `)) {
      continue;
    }

    results.push({
      line: lineNumber,
      column: match.index + 2,
      type: `error`,
      rule: rule.slug,
      message: `Unexpected mid-word non-letter (probably a scan error)`,
    });
  }

  return results;
};

rule.slug = `mid-word-non-letter`;
export default rule;
