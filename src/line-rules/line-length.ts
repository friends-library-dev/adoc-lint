import * as hilkiah from '@friends-library/hilkiah';

import { makeSplitLines } from '@friends-library/adoc-utils';
import { LineRule, LintResult } from '../types';
import { isTableLine } from '../utils';

const split = makeSplitLines(90, 45);

const rule: LineRule = (
  line: string,
  lines: string[],
  lineNumber: number,
): LintResult[] => {
  if (lengthOk(line)) {
    return [];
  }

  const recommendation = getRecommendation(line);

  return [
    {
      line: lineNumber,
      column: false,
      rule: rule.slug,
      type: `error`,
      message: `Non-heading and non-list lines should not exceed 100 characters`,
      ...(recommendation ? { recommendation } : {}),
    },
  ];
};

function lengthOk(line: string): boolean {
  if (line.length < 100) {
    return true;
  }

  if ([`//`, `==`, `* `].includes(line.substring(0, 2))) {
    return true;
  }

  if (line.match(/^\[.+\]$/)) {
    return true;
  }

  if (line.includes(`[.book-title]#`)) {
    return true;
  }

  if (isTableLine(line)) {
    return true;
  }

  return false;
}

function getRecommendation(line: string): string | false {
  // hilkiah will be undefined in the browser, for bundle-size management
  const refs: ReturnType<typeof hilkiah.find> =
    hilkiah && typeof hilkiah.find === `function` ? hilkiah.find(line) : [];

  // pull out scripture refs for splitting
  const withoutRefs = refs.reduce((ln, ref, index) => {
    return ln.replace(ref.match, `•${index}`);
  }, line);

  const block = split(withoutRefs);

  // now restore the scripture refs
  const reco = refs.reduce((adoc, ref, index) => {
    return adoc.replace(`•${index}`, ref.match);
  }, block);

  if (reco.trim() === line.trim() || reco.split(`\n`).length > 2) {
    return false;
  }

  return reco;
}

rule.slug = `line-length`;
export default rule;
