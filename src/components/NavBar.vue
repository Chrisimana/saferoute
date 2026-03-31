<template>
  <nav class="navbar" role="navigation" aria-label="Navigasi utama">
    <div class="navbar-inner">
      <RouterLink to="/" class="navbar-brand" aria-label="SafeRoute - Beranda">
        <span class="navbar-brand-icon" aria-hidden="true">🛡️</span>
        <span class="navbar-brand-text">SafeRoute</span>
      </RouterLink>

      <!-- Desktop nav -->
      <ul class="navbar-links" role="list">
        <li v-for="link in navLinks" :key="link.to">
          <RouterLink
            :to="link.to"
            class="nav-link"
            :active-class="link.exact ? '' : 'nav-link--active'"
            :exact-active-class="'nav-link--active'"
          >
            <span class="nav-link-icon" aria-hidden="true">{{ link.icon }}</span>
            <span class="nav-link-label">{{ link.label }}</span>
          </RouterLink>
        </li>
      </ul>

      <!-- Mobile hamburger -->
      <button
        class="navbar-toggle"
        :aria-expanded="mobileOpen"
        aria-controls="mobile-menu"
        aria-label="Buka menu navigasi"
        @click="mobileOpen = !mobileOpen"
      >
        <span class="hamburger" :class="{ open: mobileOpen }">
          <span></span><span></span><span></span>
        </span>
      </button>
    </div>

    <!-- Mobile menu -->
    <div v-if="mobileOpen" id="mobile-menu" class="mobile-menu" role="menu">
      <RouterLink
        v-for="link in navLinks"
        :key="link.to"
        :to="link.to"
        class="mobile-nav-link"
        :exact-active-class="'mobile-nav-link--active'"
        role="menuitem"
        @click="mobileOpen = false"
      >
        <span aria-hidden="true">{{ link.icon }}</span>
        {{ link.label }}
      </RouterLink>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const mobileOpen = ref(false)

const navLinks = [
  { to: '/', label: 'Beranda', icon: '🏠', exact: true },
  { to: '/map', label: 'Peta', icon: '🗺️' },
  { to: '/weather', label: 'Cuaca', icon: '🌤️' },
  { to: '/analytics', label: 'Analitik', icon: '📊' },
  { to: '/safety', label: 'Keselamatan', icon: '🛟' },
  { to: '/about', label: 'Tentang', icon: 'ℹ️' },
]
</script>

<style scoped>
.navbar {
  background: linear-gradient(135deg, #0d47a1 0%, #1565c0 60%, #1976d2 100%);
  box-shadow: 0 2px 12px rgba(13, 71, 161, 0.4);
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
}

.navbar-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.25rem;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #fff;
  font-weight: 800;
  font-size: 1.2rem;
  letter-spacing: -0.02em;
  min-height: 44px;
  min-width: 44px;
  padding: 0 0.25rem;
  border-radius: 8px;
  transition: opacity 0.15s;
}

.navbar-brand:hover { opacity: 0.85; }

.navbar-brand-icon { font-size: 1.4rem; }

.navbar-links {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.85rem;
  border-radius: 8px;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.9rem;
  font-weight: 500;
  min-height: 44px;
  transition: background 0.15s, color 0.15s;
  white-space: nowrap;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
}

.nav-link--active {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  font-weight: 700;
}

.nav-link-icon { font-size: 1rem; }

/* Hamburger */
.navbar-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  min-height: 44px;
  min-width: 44px;
  border-radius: 8px;
  color: #fff;
  align-items: center;
  justify-content: center;
}

.navbar-toggle:hover { background: rgba(255,255,255,0.15); }

.hamburger {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 22px;
}

.hamburger span {
  display: block;
  height: 2px;
  background: #fff;
  border-radius: 2px;
  transition: transform 0.2s, opacity 0.2s;
}

.hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.hamburger.open span:nth-child(2) { opacity: 0; }
.hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

/* Mobile menu */
.mobile-menu {
  display: flex;
  flex-direction: column;
  background: #0d47a1;
  border-top: 1px solid rgba(255,255,255,0.1);
  padding: 0.5rem;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  text-decoration: none;
  color: rgba(255,255,255,0.85);
  font-size: 0.95rem;
  font-weight: 500;
  min-height: 44px;
  transition: background 0.15s;
}

.mobile-nav-link:hover,
.mobile-nav-link--active {
  background: rgba(255,255,255,0.15);
  color: #fff;
}

@media (max-width: 768px) {
  .navbar-links { display: none; }
  .navbar-toggle { display: flex; }
  .nav-link-label { display: none; }
}

@media (max-width: 480px) {
  .navbar-brand-text { display: none; }
}
</style>
