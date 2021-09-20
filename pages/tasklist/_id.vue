<template>
  <div class="default-container">
    <Tasks :loading="loading" />
  </div>
</template>

<script>
import { Tasks } from '@/components/tasks'
export default {
  components: {
    Tasks,
  },
  data() {
    return {
      loading: true,
    }
  },
  mounted() {},
  methods: {},
}
</script>
