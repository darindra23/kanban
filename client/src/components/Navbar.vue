<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="light">
      <img class="ml-auto" src="/src/images/logo.png" width="30px" style="margin-right:5px;" alt /> Kanban
      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>Hi,Welcome !</em>
            </template>
            <b-dropdown-item href @click.prevent="signOut">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
export default {
  methods: {
    signOut() {
      localStorage.clear();
      this.$emit("signOut", { value: 0 });
    }
  }
};
</script>