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
      :class="selectedColor"
      v-on-click-outside="onSubmit"
      @keydown.esc="onSubmit"
      @submit.prevent="onSubmit" 
    >
      <textarea
        v-model="data.title"
        type="text"
        id="inputField"
        name="inputField"
        class="w-full focus:outline-none focus:shadow-outline h-auto px-5 py-4 text-gray-700 placeholder:font-medium font-bold resize-none bg-transparent"
        placeholder="Enter the title"
        ref="titleInputElement"
        @input="adjustTitleHeight"
        @keydown.enter.prevent="() => {if(textInputElement) textInputElement.focus()}"
        maxlength="200"
        :class="fontColor"
      />
      <textarea
        v-model="data.text"
        type="text"
        id="inputField"
        name="inputField"
        class="w-full focus:outline-none focus:shadow-outline h-auto px-5 py-4 text-gray-700 placeholder:font-medium resize-none bg-transparent"
        placeholder="Note..."
        ref="textInputElement"
        @input="adjustTextAreaHeight"
        @keydown.enter.prevent="onSubmit"
        :class="fontColor"
        maxlength="2000"
      />
      <div class="relative px-3 py-3 ">
        <button 
          class="bg-white p-3 hover:bg-gray-100 rounded-full inline-flex items-center"
          @click.prevent="() => isColorModalActive = true"
        >
          <PaletteOutline 
            :size="24"
          />
        </button>
        <ColorPickerModal
          class="absolute top-0 left-20"
          :isActive="isColorModalActive"
          @selectColor="selectColor"
          @close="onColorModalClose"
        />
      </div>
    </form>
  </header>
</template>

<script setup lang="ts">
import PaletteOutline from 'vue-material-design-icons/PaletteOutline.vue';
import ColorPickerModal from './ColorPickerModal.vue'
import { vOnClickOutside } from '@vueuse/components'
import { ref, nextTick, computed } from 'vue';
import type { INoteCreateDto } from '@/types/notes';

const emits = defineEmits(['create'])

const data = ref<INoteCreateDto>({
  title: '',
  text: '',
  color: '',
})

const titleInputElement = ref<HTMLInputElement | null>(null)
const textInputElement = ref<HTMLInputElement | null>(null)
const isFormActive = ref<boolean>(false)
const selectedColor = ref<string>('bg-white')
const isColorModalActive = ref<boolean>(true)

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
    const dete: INoteCreateDto = {
      ...data.value,
      color: selectedColor.value ? selectedColor.value : 'bc-white'
    } 
    emits('create', dete)
  }
  disableForm()
}

const disableForm = () => {
  isFormActive.value = false
  data.value.title = '';
  data.value.text = '';
  if (titleInputElement.value && textInputElement.value) {
    titleInputElement.value.style.height = 'auto'
    textInputElement.value.style.height = 'auto'
  }
  selectedColor.value = 'bg-white'
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

const selectColor = (color: string) => {
  selectedColor.value = color
  onColorModalClose()
}

const onColorModalClose = () => {
  isColorModalActive.value = false
}

const fontColor = computed(() => {
  return selectedColor.value === 'bg-white' ? 'placeholder:text-grey-700' : 'placeholder:text-black'
})

</script>

<style scoped>
</style>