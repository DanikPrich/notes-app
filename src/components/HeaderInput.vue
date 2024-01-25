<template>
  <header class="my-16 container mx-auto px-10 flex flex-col items-center ">
    <form 
      v-show="!isFormActive" 
      class="max-w-4xl h-14 shadow-md appearance-none border rounded-lg w-full leading-tight overflow-hidden" 
      @click="activateForm"
    >
      <input
        type="text"
        id="inputField"
        name="inputField"
        class="w-full h-full focus:outline-none focus:shadow-outline px-8 text-gray-700 "
        placeholder="Note..."
      />
    </form>

    <form 
      v-show="isFormActive" 
      class="max-w-4xl shadow-md appearance-none border rounded-lg w-full leading-tight overflow-hidden" 
      @submit.prevent="onSubmit" 
      v-on-click-outside="disableForm"
      @keydown.esc="disableForm"
    >
      <textarea
        v-model="data.title"
        type="text"
        id="inputField"
        name="inputField"
        class="w-full focus:outline-none focus:shadow-outline h-auto px-5 py-4 text-gray-700 placeholder:font-medium font-bold resize-none"
        placeholder="Введите заголовок"
        ref="titleInputElement"
        @input="adjustTitleHeight"
        @keydown.enter.prevent="() => {if(textInputElement) textInputElement.focus()}"
        maxlength="200"
      />
      <textarea
        v-model="data.text"
        type="text"
        id="inputField"
        name="inputField"
        class="w-full focus:outline-none focus:shadow-outline h-auto px-5 py-4 text-gray-700 placeholder:font-medium resize-none"
        placeholder="Заметка"
        ref="textInputElement"
        @input="adjustTextAreaHeight"
        @keydown.enter.prevent="onSubmit"
        maxlength="2000"
      />
      <div class="px-3 py-3">
        <button class="bg-white p-3 hover:bg-gray-100 rounded-full inline-flex items-center">
          <PaletteOutline :size="24"/>
        </button>
      </div>
    </form>
  </header>
</template>

<script setup lang="ts">
import PaletteOutline from 'vue-material-design-icons/PaletteOutline.vue';
import { vOnClickOutside } from '@vueuse/components'
import { ref, nextTick } from 'vue';

const emits = defineEmits(['create'])

const data = ref({
  title: '',
  text: ''
})

const titleInputElement = ref<HTMLInputElement | null>(null)
const textInputElement = ref<HTMLInputElement | null>(null)
const isFormActive = ref<Boolean>(false)

const activateForm = () => {
  isFormActive.value = true

  nextTick(() => {
    if(textInputElement.value) {
      textInputElement.value.focus();
    }
  })
}

const onSubmit = () => {
  if(Object.values(data.value).some(value => !!value !== false)) {
    emits('create', data.value)
    disableForm()
  }
}

const disableForm = () => {
  isFormActive.value = false
  data.value.title = '';
  data.value.text = '';
  if (titleInputElement.value && textInputElement.value) {
    titleInputElement.value.style.height = 'auto'
    textInputElement.value.style.height = 'auto'
  }
}

const adjustTitleHeight = () => {
  if (titleInputElement.value) {
    titleInputElement.value.style.height = titleInputElement.value.scrollHeight + 'px';
  }
};

const adjustTextAreaHeight = () => {
  if (textInputElement.value) {
    textInputElement.value.style.height = textInputElement.value.scrollHeight + 'px';
  }
};

</script>

<style scoped>
</style>