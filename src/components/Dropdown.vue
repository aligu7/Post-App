<template>
  <div class="dropdown">
    <img
      @click="toggleDropdown(id)"
      class="dropbtn"
      src="@/assets/images/options.svg"
      alt=""
    />
    <div class="dropdown-content" :id="id">
      <router-link class="dropdownEl" :to="{ name: 'EditPost', params: { id } }"
        >Edit</router-link
      >
      <router-link
        v-if="
          $route.name == 'Home' ||
            $route.name == 'UserProfile' ||
            $route.name == 'MatchingPosts'
        "
        class="dropdownEl"
        :to="{ name: 'PostDetails', params: { id } }"
        >More</router-link
      >
      <div class="dropdownEl delete" @click="$emit('handleDelete')">Delete</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id'],
  setup() {
    const toggleDropdown = (id) => {
      document.getElementById(id).classList.toggle('show');
    };

    window.onclick = (event) => {
      if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.querySelectorAll('.dropdown-content');
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
    };

    return { toggleDropdown };
  },
};
</script>

<style scoped>
.dropbtn {
  cursor: pointer;
}

.dropdown .dropdown-content.show {
  display: block;
}

.dropdown {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
  z-index: 1;
}

.dropdown-content {
  text-align: center;
  display: none;
  position: absolute;
  top: 25px;
  right: 0;
  border-radius: 15px;
  background-color: white;
  overflow: hidden;
}

.dropdown-content .dropdownEl {
  color: black;
  padding: 19px 75px;
  text-decoration: none;
  display: block;
  cursor: pointer;
  transition: all 0.15s ease;
  border-bottom: 2px solid #0de6cb;
}

.dropdown-content .dropdownEl:hover {
  background-color: #0de6cb;
  color: white;
}

.dropdownEl.delete {
  color: red;
  border-bottom: 0;
}

.dropdownEl.delete:hover {
  background-color: red;
}
</style>
