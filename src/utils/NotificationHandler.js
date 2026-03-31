const DUPLICATE_WINDOW_MS = 10 * 60 * 1000 // 10 minutes

const _lastSent = {}

async function requestPermission() {
  if (!('Notification' in window)) return 'denied'
  if (Notification.permission === 'granted') return 'granted'
  if (Notification.permission === 'denied') return 'denied'
  try {
    return await Notification.requestPermission()
  } catch {
    return 'denied'
  }
}

/**
 * @param {string} title
 * @param {string} message
 */
function send(title, message) {
  if (!('Notification' in window)) return
  if (Notification.permission !== 'granted') return

  const notification = new Notification(title, {
    body: message,
    icon: '/favicon.svg',
    data: { url: '/evacuation-route' },
  })

  notification.onclick = () => {
    window.focus()
    window.location.hash = '#/evacuation-route'
    notification.close()
  }
}

/**
 * @param {string} riskLevel
 * @returns {boolean}
 */
function isDuplicate(riskLevel) {
  const last = _lastSent[riskLevel]
  if (!last) return false
  return Date.now() - last < DUPLICATE_WINDOW_MS
}

/**
 * @param {string} riskLevel
 */
function _markSent(riskLevel) {
  _lastSent[riskLevel] = Date.now()
}

/**
 * @param {string} riskLevel
 * @param {string} title
 * @param {string} message
 */
function sendIfNotDuplicate(riskLevel, title, message) {
  if (isDuplicate(riskLevel)) return
  send(title, message)
  _markSent(riskLevel)
}

export const NotificationHandler = {
  requestPermission,
  send,
  isDuplicate,
  sendIfNotDuplicate,
  _markSent,
  _lastSent,
}
