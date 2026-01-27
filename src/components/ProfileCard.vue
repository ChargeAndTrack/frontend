<script setup lang="ts">
import { ref } from 'vue';
import ProfileField from '@/components/ProfileField.vue';
import PasswordVisibilityButton from '@/components/PasswordVisibilityButton.vue';
import type { User } from '@/types/user';

const showPassword = ref(false);
const props = defineProps<{ user: User }>();
</script>

<template>
  <div class="container-fluid pb-2">
    <div class="row justify-content-center">
      <div class="card shadow col-12 col-md-6">
        <div class="card-body">
          <h5 class="card-title text-center mb-4">Profile</h5>

          <!-- Username -->
          <ProfileField label="Username" :inputValue="props.user.username" />

          <!-- Password -->
          <ProfileField
            label="Password"
            :inputValue="props.user.password"
            inputType="password"
            v-model:showPassword="showPassword"
          >
            <template #extra>
              <PasswordVisibilityButton v-model:showPassword="showPassword" />
            </template>
          </ProfileField>

          <!-- Role -->
          <ProfileField label="Role" :inputValue="props.user.role" />
        </div>
      </div>
    </div>
  </div>
</template>
