/**
 * @param {'Rendah'|'Sedang'|'Tinggi'} riskLevel
 * @returns {{ color: string, fillColor: string, weight: number, opacity: number, fillOpacity: number }}
 */

export function getZoneStyle(riskLevel) {
  const colorMap = {
    Rendah: '#4CAF50',
    Sedang: '#FFEB3B',
    Tinggi: '#F44336'
  }

  const color = colorMap[riskLevel] ?? '#9E9E9E'

  return {
    color,
    fillColor: color,
    weight: 2,
    opacity: 0.8,
    fillOpacity: 0.35
  }
}

/**
 * @param {{ properties: { name: string, riskLevel: string, description: string } }} feature
 * @returns {string}
 */

export function buildPopupContent(feature) {
  const { name, riskLevel, description } = feature.properties

  const badgeColorMap = {
    Rendah: '#4CAF50',
    Sedang: '#FFEB3B',
    Tinggi: '#F44336'
  }
  const badgeColor = badgeColorMap[riskLevel] ?? '#9E9E9E'
  const textColor = riskLevel === 'Sedang' ? '#333' : '#fff'

  return `
    <div style="min-width:180px;font-family:sans-serif;">
      <strong style="font-size:1em;">${name}</strong>
      <div style="margin:6px 0;">
        <span style="
          background:${badgeColor};
          color:${textColor};
          padding:2px 8px;
          border-radius:4px;
          font-size:0.85em;
          font-weight:600;
        ">Risiko: ${riskLevel}</span>
      </div>
      <p style="margin:4px 0;font-size:0.9em;color:#444;">${description}</p>
    </div>
  `.trim()
}

/**
 * @param {boolean} isMain - true for main route, false for alternative route
 * @returns {{ color: string, weight: number, opacity: number }}
 */

export function getRouteStyle(isMain) {
  if (isMain) {
    return { color: '#2196F3', weight: 5, opacity: 0.8 }
  }
  return { color: '#B0BEC5', weight: 3, opacity: 0.6 }
}
