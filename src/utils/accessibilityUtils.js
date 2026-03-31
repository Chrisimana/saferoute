/**
 * @param {number} c 
 * @returns {number} 
 */

function linearize(c) {
  const s = c / 255
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
}

/**
 * @param {string} hex 
 * @returns {number} 
 */

function getLuminance(hex) {
  const clean = hex.replace('#', '')
  const full = clean.length === 3
    ? clean.split('').map(c => c + c).join('')
    : clean

  const r = parseInt(full.slice(0, 2), 16)
  const g = parseInt(full.slice(2, 4), 16)
  const b = parseInt(full.slice(4, 6), 16)

  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b)
}

/**
 * @param {string} fg - foreground hex color (e.g. '#4CAF50')
 * @param {string} bg - background hex color (e.g. '#FFFFFF')
 * @returns {number} contrast ratio (e.g. 4.5 means 4.5:1)
 */

export function calculateContrastRatio(fg, bg) {
  const l1 = getLuminance(fg)
  const l2 = getLuminance(bg)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}
