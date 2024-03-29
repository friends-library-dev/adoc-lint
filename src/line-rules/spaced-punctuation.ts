import { LineRule, LintOptions, LintResult } from '../types';
import RegexLintRunner from '../RegexLintRunner';
import { isAsciidocBracketLine } from '../utils';

const runner = new RegexLintRunner(
  [
    {
      test: `[!?,:;.]`,
      search: / (!|\?|,|;|:|\.)/g,
      replace: `$1`,
    },
  ],
  {
    fixable: true,
    message: `unexpected space before punctuation should be removed`,
  },
);

const rule: LineRule = (
  line: string,
  lines: string[],
  lineNumber: number,
  lintOptions: LintOptions,
): LintResult[] => {
  if (isAsciidocBracketLine(line)) {
    return [];
  }
  return runner.getLineLintResults(line, lineNumber, lines, lintOptions);
};

rule.slug = `spaced-punctuation`;

runner.rule = rule.slug;

export default rule;
