<template>
	<v-card
    tile
		class="pt-16 pa-6 black"
		height="100vh"
    dark
		>
		<v-overlay v-show="this.$store.getters.isLoading">Loading...</v-overlay>
		<v-list-item three-line>
			<v-list-item-content>
				<v-form>
					<v-alert 
						v-if="errorMessage"
						border="right"
						colored-border
						type="error"
						elevation="0"
						>
						{{errorMessage}}
					</v-alert>
					<v-text-field
						v-model="name"
						label="Name"
						required
						@focus="errorMessage=''"
					></v-text-field>
					<v-text-field
						v-model="password"
						label="Passwort"
						type="password"
						required
						@keypress.enter="login"
					></v-text-field>
					<v-card-actions>
						<v-btn 
							block
							:disabled="disabled"
							@click="login"
							color="primary"
							class="mt-4">
							Anmelden
						</v-btn>
					</v-card-actions>
				</v-form>
			</v-list-item-content>
		</v-list-item>
	</v-card>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      password: '',
      error: false,
      errorMessage: ''
    }
  },
  computed: {
    disabled() {
			return this.name.length == 0 || this.password.length < 4
		},
	},
  methods: {
    async login() {
      this.$store.commit('toggleLoading')
      this.error = false
      const payload = { name: this.name, password: this.password }
      const status = await this.$store.dispatch('verifyLogin', payload)
      if (status === 200) {
        this.$router.replace('/')
      } else {
        this.error = true,
        this.errorMessage = 'Benutzername oder Passwort falsch'
        this.name = '',
        this.password = ''
      }
      this.$store.commit('toggleLoading')
    }
  }
}
</script>