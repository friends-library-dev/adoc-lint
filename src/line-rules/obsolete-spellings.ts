import { LineRule, LintOptions, LintResult } from '../types';
import RegexLintRunner from '../RegexLintRunner';

const runner = new RegexLintRunner([
  {
    test: `much`,
    search: /\bin-(so|as)-much\b/g,
    replace: `in$1much`,
    fixable: true,
  },
  {
    test: `doings`,
    search: /\bLord`'s doings\b/g,
    replace: `Lord\`'s doing`,
    fixable: false,
    message: `Obsolete grammar from references to archaic KJV of Ps. 118:23 should be carefully updated`,
  },
  {
    test: `biass`,
    search: /\b(un)?(b)iass(es|ed|ing)\b/gi,
    replace: (_, un, b, end) => `${un !== undefined ? un : ``}${b}ias${end}`,
  },
  {
    test: `jun`,
    search: /\bjun\./g,
    replace: `Jr.`,
  },
  {
    test: `havock`,
    search: /\b(H|h)avock\b/g,
    replace: `$1avoc`,
  },
  {
    test: `mould`,
    search: /\b(M|m)ould\b/g,
    replace: `$1old`,
  },
  {
    test: `incumb`,
    search: /\b(I|i)ncumb(er|ered|ering|ers|rance)\b/g,
    replace: (_, i, end) => `${i === `I` ? `E` : `e`}ncumb${end}`,
  },
  {
    test: `potatoe`,
    search: /\b(P|p)otatoe\b/g,
    replace: `$1otato`,
  },
  {
    test: `leathern`,
    search: /\b(L|l)eathern\b/g,
    replace: `$1eather`,
  },
  {
    test: `inclose`,
    search: /\b(Un|un)?(I|i)nclose?/g,
    replace: (_, un, i) => {
      const str = `${i === `I` ? `E` : `e`}nclose`;
      if (un !== undefined) {
        return `${un}${str}`;
      }
      return str;
    },
  },
  {
    test: `intr`,
    search: /\b(I|i)ntr(eat|ust)/g,
    replace: (_, i, end) => `${i === `I` ? `E` : `e`}ntr${end}`,
  },
  {
    test: `stile`,
    search: /\b(S|s)tile\b/g,
    replace: `$1tyle`,
  },
  {
    test: `despatch`,
    search: /\b(D|d)espatch/g,
    replace: `$1ispatch`,
  },
  {
    test: `cotempor`,
    search: /\b(C|c)otempora/g,
    replace: `$1ontempora`,
    message: `"cotemporary" should be replaced with "contemporary" in all editions`,
  },
  {
    test: `catched`,
    search: /\b(C|c)atched\b/g,
    replace: `$1aught`,
  },
  {
    test: `staid`,
    search: /\b(S|s)taid\b/g,
    replace: `$1tayed`,
  },
  {
    replace: `Melchizedek`,
    search: /\bMelchi(sedec|zedeck|sedek)\b/g,
    test: `Melchi`,
  },
  {
    test: `connexion`,
    search: /\b(C|c)onnexion(s)?\b/g,
    replace: `$1onnection$2`,
  },
  {
    test: `behove`,
    search: /\b(B|b)ehove(s|d)?\b/g,
    replace: `$1ehoove$2`,
  },
  {
    test: `vail`,
    search: /\bvail(s|ed)?\b/g,
    replace: `veil$1`,
  },
  {
    test: `gaol`,
    search: /\b(G|g)aol(er)?\b/g,
    replace: (_, g, end) => `${g === `G` ? `J` : `j`}ail${end || ``}`,
  },
  {
    test: `burthen`,
    search: /\b(B|b)urthen(s|some|ed)?\b/g,
    replace: `$1urden$2`,
  },
  {
    test: `stopt`,
    search: /\b(S|s)topt\b/g,
    replace: `$1topped`,
  },
  {
    test: `slipt`,
    search: /\b(S|s)lipt\b/g,
    replace: `$1lipped`,
  },
  {
    test: `Corah`,
    search: /\bCorah\b/g,
    replace: `Korah`,
  },
  {
    test: `Barbadoes`,
    search: /\bBarbadoes\b/g,
    replace: `Barbados`,
  },
  {
    test: `ilful`,
    search: /\b(un)?(sk|w)ilful(ly|ness)\b/gi,
    replace: `$1$2illful$3`,
  },
  {
    test: `subtil`,
    search: /\b(S|s)ubtil(ty|e?ly|e)?\b/g,
    replace: (_, s, end) => {
      if (!end) return `${s}ubtle`;
      if (end === `ty`) return `${s}ubtlety`;
      if (end === `e`) return `${s}ubtle`;
      return `${s}ubtly`;
    },
  },
  {
    test: `fulfil`,
    search: /\b(F|f)ulfil\b/g,
    replace: `$1ulfill`,
  },
  {
    test: `hardheartedness`,
    search: /\b(H|h)ardheartedness\b/g,
    replace: `$1ard-heartedness`,
  },
  {
    test: `sion`,
    search: /\bSion(-?wards?)?\b/g,
    replace: (_, end) => `Zion${end ? end.replace(/^-/, ``) : ``}`,
  },
  {
    test: `\\bwo\\b`,
    search: /\b(W|w)o\b/g,
    replace: `$1oe`,
  },
  {
    test: `bishoprick`,
    search: /\b(B|b)ishoprick\b/g,
    replace: `$1ishopric`,
  },
]);

const rule: LineRule = (
  line: string,
  lines: string[],
  lineNumber: number,
  lintOptions: LintOptions,
): LintResult[] => {
  if (lintOptions.lang !== `en`) {
    return [];
  }
  return runner.getLineLintResults(line, lineNumber, lines, lintOptions);
};

rule.slug = `obsolete-spellings`;
runner.rule = rule.slug;

export default rule;
