<script setup>
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import { getUserService } from "@services/user.service"
import moment from "moment"

const route = useRoute()

onMounted(async () => {
  const response = await getUserService(route.params.id)
  user.value = response
})

const user = ref("")
</script>

<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img class="image" id="avatar" src="/avatar.svg" alt="avatar" />
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-5 has-text-left mt-3">@{{ user.username }}</p>
        </div>
      </div>

      <div class="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
        <br />
        <p>Joined {{ moment(new Date(user.createdAt)).format("YYYY MM Do") }}</p>
      </div>
    </div>
  </div>
</template>
