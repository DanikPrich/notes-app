<template>
  <div class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full bg-black/50">
    <div class="relative top-40 my-0 mx-auto p-4 w-full max-w-2xl max-h-full">
      <slot/>
    </div>
  </div>
</template>

<script setup></script>
<style lang="scss" scoped></style>