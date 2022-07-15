<template>
  <router-view name="AppNavBar" v-slot="{ Component }">
    <transition name="route" mode="out-in">
      <div :key="Component">
        <component :is="Component" />
      </div>
    </transition>
  </router-view>
  <router-view v-slot="{ Component }">
    <transition name="route" mode="out-in">
      <div :key="Component">
        <component :is="Component" />
      </div>
    </transition>
  </router-view>
</template>

<style lang="scss">
#app {
  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
  margin-top: 60px;
}

html {
  scroll-behavior: smooth;
}

/* route transition */
.route-enter-from {
  opacity: 0;
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-to {
  opacity: 0;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

h1,
h2,
h3,
h4,
h5 {
  font-family: "Audiowide", cursive !important;
}

input {
  width: 30% !important;
  margin: 0 5px;
}

input:focus,
textarea:focus {
  outline: none !important;
  border: 1px solid #29f709 !important;
}

nav {
  margin-bottom: 7%;
}

a {
  color: #000000;
  margin: 0 1%;
}
</style>
