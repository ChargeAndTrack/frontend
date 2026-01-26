<template>
  <div class="container text-center py-5">
    <h1 class="display-1 text-danger">403</h1>
    <h2>Access Denied</h2>
    <p>You do not have the necessary permissions to view this page.</p>
    <RouterLink :to="{ name: 'Home' }" class="btn btn-primary">Back to Home</RouterLink>
  </div>
</template>
