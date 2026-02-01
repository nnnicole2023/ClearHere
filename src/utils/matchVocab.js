// src/utils/matchVocab.js

export function normalizeText(s) {
  return (s || "")
    .toLowerCase()
    .trim()
    .replace(/[.,!?:;(){}\[\]"'“”‘’]/g, " ")
    .replace(/\s+/g, " ");
}

/**
 * 预处理 + 预排序：只做一次
 * - 给每个 entry 计算 termNorm（normalize 后的 term）
 * - 按 termNorm 长度从长到短排序（更精准）
 */
export function prepareVocab(vocab) {
  return [...vocab]
    .map((entry) => ({
      ...entry,
      termNorm: normalizeText(entry.term),
      termNormLen: normalizeText(entry.term).length,
      aliasesNorm: Array.isArray(entry.aliases)
        ? entry.aliases.map((a) => normalizeText(a))
        : [],
    }))
    .sort((a, b) => b.termNormLen - a.termNormLen);
}

/**
 * includes 匹配：传入 “已预处理的词库” 就不会每次 sort
 */
export function findBestVocabMatch(rawText, preparedVocab) {
  const text = normalizeText(rawText);
  if (!text) return null;

  for (const entry of preparedVocab) {
    if (entry.termNorm && text.includes(entry.termNorm)) return entry;

    for (const aliasNorm of entry.aliasesNorm) {
      if (aliasNorm && text.includes(aliasNorm)) return entry;
    }
  }

  return null;
}
