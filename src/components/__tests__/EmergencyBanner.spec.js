import fc from 'fast-check'
import { describe, test, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { useRiskStore } from '@/stores/riskStore'
import EmergencyBanner from '@/components/EmergencyBanner.vue'

const RouterLinkStub = {
  name: 'RouterLink',
  template: '<a><slot /></a>',
  props: ['to'],
}

describe('Property 8: Banner In-App Tampil Saat Risiko Tinggi', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('EmergencyBanner visible ketika riskLevel === "Tinggi", terlepas dari status izin notifikasi', () => {
    const notificationPermissions = fc.constantFrom('granted', 'denied', 'default')

    fc.assert(
      fc.property(notificationPermissions, (permission) => {
        const riskStore = useRiskStore()
        riskStore.setRisk('Tinggi')

        Object.defineProperty(globalThis, 'Notification', {
          value: { permission },
          writable: true,
          configurable: true,
        })

        const wrapper = mount(EmergencyBanner, {
          global: {
            stubs: { RouterLink: RouterLinkStub },
          },
        })

        const banner = wrapper.find('.emergency-banner')
        return banner.exists()
      }),
      { numRuns: 100 }
    )
  })

  test('EmergencyBanner tidak visible ketika riskLevel bukan "Tinggi"', () => {
    const nonHighRiskLevels = fc.constantFrom('Rendah', 'Sedang')

    fc.assert(
      fc.property(nonHighRiskLevels, (riskLevel) => {
        const riskStore = useRiskStore()
        riskStore.setRisk(riskLevel)

        const wrapper = mount(EmergencyBanner, {
          global: {
            stubs: { RouterLink: RouterLinkStub },
          },
        })

        const banner = wrapper.find('.emergency-banner')
        return !banner.exists()
      }),
      { numRuns: 100 }
    )
  })
})
