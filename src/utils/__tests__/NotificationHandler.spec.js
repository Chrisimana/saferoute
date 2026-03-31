import fc from 'fast-check'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { NotificationHandler } from '@/utils/NotificationHandler'

describe('NotificationHandler — Property 7: Notifikasi Darurat Dikirim Saat Risiko Tinggi', () => {
  beforeEach(() => {
    Object.keys(NotificationHandler._lastSent).forEach(k => delete NotificationHandler._lastSent[k])

    vi.stubGlobal('Notification', Object.assign(
      function MockNotification(title, options) {
        MockNotification.lastInstance = { title, options }
        this.onclick = null
        this.close = vi.fn()
      },
      { permission: 'granted' }
    ))
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('send() dipanggil tepat satu kali saat riskLevel menjadi Tinggi dan izin diberikan', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 50 }),  // judul notifikasi
        fc.string({ minLength: 1, maxLength: 200 }), // pesan notifikasi
        (title, message) => {
          const NotificationSpy = vi.fn().mockImplementation(function (t, opts) {
            this.onclick = null
            this.close = vi.fn()
          })
          NotificationSpy.permission = 'granted'
          vi.stubGlobal('Notification', NotificationSpy)

          NotificationHandler.send(title, message)

          return NotificationSpy.mock.calls.length === 1
        }
      ),
      { numRuns: 100 }
    )
  })

  it('send() tidak dipanggil ketika izin notifikasi belum diberikan', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 50 }),
        fc.string({ minLength: 1, maxLength: 200 }),
        fc.constantFrom('denied', 'default'),
        (title, message, permission) => {
          const NotificationSpy = vi.fn().mockImplementation(function (t, opts) {
            this.onclick = null
            this.close = vi.fn()
          })
          NotificationSpy.permission = permission
          vi.stubGlobal('Notification', NotificationSpy)

          NotificationHandler.send(title, message)

          return NotificationSpy.mock.calls.length === 0
        }
      ),
      { numRuns: 100 }
    )
  })
})

describe('NotificationHandler — Property 9: Pencegahan Notifikasi Duplikat', () => {
  beforeEach(() => {
    Object.keys(NotificationHandler._lastSent).forEach(k => delete NotificationHandler._lastSent[k])
  })

  it('isDuplicate returns true when same riskLevel notified within 10 minutes', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('Rendah', 'Sedang', 'Tinggi'),
        fc.integer({ min: 0, max: 599_999 }), 
        (riskLevel, offsetMs) => {
          Object.keys(NotificationHandler._lastSent).forEach(k => delete NotificationHandler._lastSent[k])
          NotificationHandler._lastSent[riskLevel] = Date.now() - offsetMs
          return NotificationHandler.isDuplicate(riskLevel) === true
        }
      ),
      { numRuns: 100 }
    )
  })

  it('isDuplicate returns false when riskLevel has never been notified', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('Rendah', 'Sedang', 'Tinggi'),
        (riskLevel) => {
          return NotificationHandler.isDuplicate(riskLevel) === false
        }
      ),
      { numRuns: 100 }
    )
  })

  it('isDuplicate returns false when last notification was >= 10 minutes ago', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('Rendah', 'Sedang', 'Tinggi'),
        fc.integer({ min: 600_000, max: 3_600_000 }), 
        (riskLevel, offsetMs) => {
          Object.keys(NotificationHandler._lastSent).forEach(k => delete NotificationHandler._lastSent[k])
          NotificationHandler._lastSent[riskLevel] = Date.now() - offsetMs
          return NotificationHandler.isDuplicate(riskLevel) === false
        }
      ),
      { numRuns: 100 }
    )
  })
})
