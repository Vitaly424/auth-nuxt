export const state = () => ({
   registerPopup: false,
   authPopup: false,
});

export const getters = {
   registerPopup(state) {
      return state.registerPopup;
   },
   authPopup(state) {
      return state.authPopup
   }
}

export const mutations = {
   showRegisterPopup(state) {
      state.registerPopup = true;
   },
   closeRegisterPopup(state) {
      state.registerPopup = false;
   },
   showAuthPopup(state) {
      state.authPopup = true;
   },
   closeAuthPopup(state) {
      state.authPopup = false;
   },
}