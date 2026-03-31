<template>
  <footer class="app-footer" role="contentinfo">
    <p class="footer-copy">© {{ year }} SafeRoute. Dibuat untuk kesiapsiagaan bencana masyarakat Indonesia.</p>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped>
.app-footer {
  background: #1a202c;
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
  padding: 1rem 1.25rem;
}

.footer-copy {
  font-size: 0.8rem;
  margin: 0;
}
</style>
