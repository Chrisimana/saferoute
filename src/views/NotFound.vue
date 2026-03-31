<template>
  <div class="not-found">
    <div class="not-found__content">
      <span class="not-found__icon" aria-hidden="true">🗺️</span>
      <h1 class="not-found__code">404</h1>
      <p class="not-found__message">Halaman tidak ditemukan.</p>
      <p class="not-found__sub">Sepertinya rute yang kamu cari tidak ada.</p>
      <RouterLink to="/" class="not-found__link">← Kembali ke Beranda</RouterLink>
    </div>
  </div>
</template>

<script setup>
// NotFound page 
</script>

<style scoped>
.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  padding: 2rem;
}

.not-found__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.not-found__icon {
  font-size: 4rem;
}

.not-found__code {
  font-size: 5rem;
  font-weight: 700;
  color: #1565c0;
  line-height: 1;
}

.not-found__message {
  font-size: 1.25rem;
  font-weight: 600;
  color: #212121;
}

.not-found__sub {
  color: #616161;
  font-size: 0.95rem;
}

.not-found__link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  min-width: 44px;
  padding: 0.5rem 1.25rem;
  margin-top: 0.5rem;
  background-color: #1565c0;
  color: #fff;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
  transition: background-color 0.2s;
}

.not-found__link:hover {
  background-color: #0d47a1;
}
</style>
