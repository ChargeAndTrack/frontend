<script setup lang="ts">
import { ref } from 'vue';
import ProfileField from '@/components/ProfileField.vue';
import PasswordVisibilityButton from '@/components/PasswordVisibilityButton.vue';
import type { User } from '@/types/user';
import ShowFieldsCard from './ShowFieldsCard.vue';

const showPassword = ref(false);
const props = defineProps<{ user: User }>();

const formatRole = (role: string): string => {
  return role.toLowerCase().replace('_', ' ');
}
</script>

<template>
  <ShowFieldsCard>
    <template #card-header>
      <h5 class="card-title text-center my-3">Profile</h5>
    </template>
    <template #card-body>
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
      <ProfileField label="Role" :inputValue="formatRole(props.user.role)" />
    </template>
  </ShowFieldsCard>
</template>
