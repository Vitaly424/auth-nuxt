<template>
  <main class="main">
    <section class="hero">
      <div class="container">
        <div class="hero__inner">
          <h1 class="hero__title">СВАДЕБНЫЕ ФОТОГРАФЫ И ОПЕРАТОРЫ В МОСКВЕ</h1>
        </div>
      </div>
    </section>

    <section class="categories container">
      <h2 class="categories__title title">
        Выберите категорию
        <span>{{ categories.length }}</span>
      </h2>

      <div class="categories-list">
        <a
          class="categories-list__item"
          v-for="item in categories"
          :key="item.id"
          href="#"
        >
          <div class="categories-list__img" v-if="item.files">
            <img
              :src="`${item.files[0].server}/${item.files[0].path}`"
              alt=""
            />
          </div>

          <h3 class="categories-list__title">{{ item.title }}</h3>
          <p class="categories-list__description">150 000 исполнителей</p>
          <p class="categories-list__price">от 570 руб.</p>
        </a>
      </div>
    </section>

    <div :class="['modal', { 'm-popup-register': isRegisterPopup }]">
      <div class="modal__overlay">
        <div class="modal__wrapper">
          <form class="form" @submit.prevent="userRegister">
            <button
              class="form__close"
              type="button"
              @click="$store.commit('popups/closeRegisterPopup')"
            >
              Закрыть
            </button>

            <p class="form__title">Зарегистрироваться</p>
            <div
              :class="['form__group', { 'm-error': $v.register.email.$error }]"
            >
              <label class="form__field">
                <input
                  class="form__input m-email"
                  type="text"
                  placeholder="Адрес почты"
                  v-model="$v.register.email.$model"
                />
                <img src="@/static/icons/mail.svg" alt="" />
              </label>
              <span class="form__error" v-if="!$v.register.email.required"
                >Поле не должно быть пустым</span
              >
              <span class="form__error" v-if="!$v.register.email.email"
                >Некорректный адрес электронной почты</span
              >
            </div>

            <div
              :class="[
                'form__group',
                { 'm-error': $v.register.password.$error },
              ]"
            >
              <label class="form__field">
                <input
                  class="form__input m-password"
                  :type="typesPass.pass2"
                  placeholder="Придумайте пароль"
                  v-model.trim="$v.register.password.$model"
                />
                <button class="form__more" type="button" @click="showPass2">
                  {{ typesPass.pass2 === "password" ? "Показать" : "Скрыть" }}
                </button>
              </label>
              <span class="form__error" v-if="!$v.register.password.required"
                >Поле не должно быть пустым</span
              >
              <span class="form__error" v-if="!$v.register.password.minLength"
                >Длина пароля должна быть не меньше
                {{ $v.register.password.$params.minLength.min }}</span
              >
            </div>

            <span
              style="color: red; margin-bottom: 10px; display: inline-block"
              v-if="responseServerRegister"
              >{{ responseServerRegister }}</span
            >

            <button
              class="form__submit"
              :style="{ opacity: $v.register.$invalid ? 0.5 : 1 }"
              :disabled="$v.register.$invalid"
              type="submit"
            >
              Зарегистрироваться
            </button>
          </form>
        </div>
      </div>
    </div>

    <div :class="['modal', { 'm-popup-auth': isAuthPopup }]">
      <div class="modal__overlay">
        <div class="modal__wrapper">
          <form class="form" @submit.prevent="userAuth">
            <button
              class="form__close"
              type="button"
              @click="$store.commit('popups/closeAuthPopup')"
            >
              Закрыть
            </button>

            <p class="form__title">Войти</p>

            <div :class="['form__group', { 'm-error': $v.login.email.$error }]">
              <label class="form__field">
                <input
                  class="form__input m-email"
                  type="text"
                  placeholder="Адрес почты"
                  v-model.trim="$v.login.email.$model"
                />
                <img src="@/static/icons/mail.svg" alt="" />
              </label>
              <span class="form__error" v-if="!$v.login.email.required"
                >Поле не должно быть пустым</span
              >
              <span class="form__error" v-if="!$v.login.email.email"
                >Некорректный адрес электронной почты</span
              >
            </div>

            <div
              :class="['form__group', { 'm-error': $v.login.password.$error }]"
            >
              <label class="form__field">
                <input
                  class="form__input m-password"
                  :type="typesPass.pass1"
                  placeholder="пароль"
                  v-model.trim="$v.login.password.$model"
                />
                <button class="form__more" type="button" @click="showPass1">
                  {{ typesPass.pass1 === "password" ? "Показать" : "Скрыть" }}
                </button>
              </label>
              <span class="form__error" v-if="!$v.login.password.required"
                >Поле не должно быть пустым</span
              >
              <span v-if="!$v.login.password.minLength" class="form__error"
                >Длина пароля должна быть не меньше
                {{ $v.login.password.$params.minLength.min }} символов</span
              >
            </div>

            <span
              style="color: red; margin-bottom: 10px; display: inline-block"
              v-if="responseServerAuth"
              >{{ responseServerAuth }}</span
            >

            <button
               class="form__submit"
              :style="{ opacity: $v.login.$invalid ? 0.5 : 1 }"
              :disabled="$v.login.$invalid"
              type="submit"
            >
              Войти
            </button>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";

export default {
  name: "IndexPage",
  data() {
    return {
      responseServerAuth: "",
      responseServerRegister: "",
      login: {
        email: "",
        password: "",
      },
      register: {
        email: "",
        password: "",
        role: ""
      },
      typesPass: {
        pass1: "password",
        pass2: "password",
      },
    };
  },
  async asyncData({ $axios }) {
    const {
      data: { data: categories },
    } = await $axios.get("https://api.brillday.com/front/main/cats");
    return { categories };
  },
  computed: {
    isRegisterPopup() {
      return this.$store.getters["popups/registerPopup"];
    },
    isAuthPopup() {
      return this.$store.getters["popups/authPopup"];
    },
  },
  methods: {
    async userAuth() {
      this.$v.login.$touch();

      if (this.$v.login.$invalid) {
        alert("Ошибка");
      } else {
        try {
          const {
            data: { user },
          } = await this.$auth.loginWith("local", {
            data: this.login,
          });

          this.$auth.setUser(user);
          this.$auth.$storage.setUniversal("user", user);
          this.$router.push("/user");
          this.$v.login.touch();
          this.$store.commit("popups/closeAuthPopup");
          this.responseServerAuth = "";
        } catch (e) {
          this.responseServerAuth = e.response.data.errors.email;
          setTimeout(() => {
            this.responseServerAuth = "";
          }, 2000);
        }
      }
    },
    async userRegister() {
      this.$v.register.$touch();

      if (this.$v.register.$invalid) {
        console.log("Ошибкаа");
      } else {
        try {
          const data = await this.$axios.post(
            "https://api.brillday.com/auth/register",
            this.register
          );

          this.$store.commit('popups/closeRegisterPopup');
          this.$store.commit('popups/showAuthPopup');
        } catch (e) {
          this.responseServerRegister = e.response.data.errors.email;
          setTimeout(() => {
            this.responseServerRegister = "";
          }, 2000);
        }
      }
    },
    showPass1() {
      if (this.typesPass.pass1 === "password") {
        this.typesPass.pass1 = "text";
      } else {
        this.typesPass.pass1 = "password";
      }
    },
    showPass2() {
      if (this.typesPass.pass2 === "password") {
        this.typesPass.pass2 = "text";
      } else {
        this.typesPass.pass2 = "password";
      }
    },
  },
  validations: {
    login: {
      email: { required, email },
      password: {
        required,
        minLength: minLength(8),
      },
    },
    register: {
      email: { required, email },
      password: {
        required,
        minLength: minLength(8),
      },
    },
  },
};
</script>
