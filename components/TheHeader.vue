<template>
  <header class="header container">
    <nuxt-link class="logo" to="/">TEST PROJECT</nuxt-link>

    <nav :class="['nav', 'mod-only-md', {'m-active': isMenu}]" v-if="!$auth.loggedIn">
      <button class="nav__auth" @click.prevent="showAuthPopup" type="button">
        Войти
      </button>
      <button
        class="nav__register"
        @click.prevent="showRegisterPopup"
        type="button"
      >
        Зарегестрироваться
      </button>
    </nav>

    <nav :class="['nav', 'mod-only-md', {'m-active': isMenu}]" v-else>
      <button class="nav__auth" @click.prevent="logout" type="button">
        ВЫЙТИ
      </button>
      <button
        class="nav__register"
        @click.prevent="$router.push('/user')"
        type="button"
      >
        ЛИЧНЫЙ КАБИНЕТ
      </button>
    </nav>

    <button
      :class="['burger-menu', 'mod-no-md ', { 'm-active': isMenu }]"
      @click="openMenu"
    >
      <span class="burger-menu__item"></span>
      <span class="burger-menu__item"></span>
      <span class="burger-menu__item"></span>
    </button>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isMenu: false,
    };
  },
  methods: {
    logout() {
      this.$auth.logout();
    },
    showRegisterPopup() {
      this.$store.commit("popups/showRegisterPopup");
    },
    showAuthPopup() {
      this.$store.commit("popups/showAuthPopup");
    },
    openMenu() {
      this.isMenu = !this.isMenu;
    },
  },
};
</script>
