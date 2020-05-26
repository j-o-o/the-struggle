<template>
  <div class="player">
    <p>{{ name }}</p>
  </div>
</template>

<script>
export default {
  validate ({ params }) {
    return !isNaN(+params.id)
  },
  asyncData ({ params, env, error }) {
    const user = env.users.find(user => String(user.id) === params.id)
    if (!user) {
      return error({ message: 'User not found', statusCode: 404 })
    }
    return user
  },
  head () {
    return {
      title: this.name
    }
  }
}
</script>

<style scoped>
.player {
    position: fixed;
    margin: 16px;
    z-index: 2;
}
</style>
