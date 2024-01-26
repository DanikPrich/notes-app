<template>
  <form 
    class="max-w-4xl shadow-md appearance-none border rounded-lg w-full leading-tight overflow-hidden" 
    :class="[selectedColor === 'white' ? 'bg-white' : `bg-${selectedColor}-300`]"
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
      maxlength="200"
      :class="fontColor"
      @input="adjustTitleHeight"
      @keydown.enter.prevent="() => { if(textInputElement) textInputElement.focus() }"
    />
    <textarea
      v-model="data.text"
      type="text"
      id="inputField"
      name="inputField"
      class="w-full focus:outline-none max-h-96 focus:shadow-outline h-auto px-5 py-4 text-gray-700 placeholder:font-medium resize-none bg-transparent"
      placeholder="Note..."
      ref="textInputElement"
      :class="fontColor"
      maxlength="2000"
      @input="adjustTextAreaHeight"
      @keydown.enter.prevent="onSubmit"
    />
    <div class="relative px-3 py-3 flex justify-between">
      <ColorPickerPopup
        class="absolute top-0 left-20"
        :isActive="isColorModalActive"
        @selectColor="selectColor"
        @close="onColorModalClose"
      />
      <button 
        class=" p-3 hover:bg-gray-100 rounded-full inline-flex items-center bg-transparrent"
        @click.prevent="() => isColorModalActive = true"
      >
        <PaletteOutline 
          :size="24"
        />
      </button>
      <button 
        v-if="props.activeNote"
        class=" p-3 hover:bg-gray-100 rounded-full inline-flex items-center bg-transparrent"
        @click.prevent="emits('remove', props.activeNote.id)"
      >
        <TrashCanOutline 
          :size="24"
        />
      </button>
    </div>
  </form>   
</template>

<script setup lang="ts">
  // @ts-ignore 
  import PaletteOutline from 'vue-material-design-icons/PaletteOutline.vue'; 
  // @ts-ignore 
  import TrashCanOutline from 'vue-material-design-icons/TrashCanOutline.vue'; 
  import { vOnClickOutside } from '@vueuse/components'
  import ColorPickerPopup from '@/components/UI/ColorPickerPopup.vue'
  import type { INote, INoteCreateDto } from '@/types/notes';
  import { ref, computed, onMounted, nextTick, type PropType } from 'vue';

  const emits = defineEmits(['submit', 'disable', 'remove'])

  const props = defineProps({
    activeNote: {
      type: Object as PropType<INote | null> ,
      default: () => {}
    }
  })
  
  const titleInputElement = ref<HTMLInputElement | null>(null)
  const textInputElement = ref<HTMLInputElement | null>(null)
  const selectedColor = ref<string>('white')
  const isColorModalActive = ref<boolean>(false)
  const data = ref<INoteCreateDto>({
    title: '',
    text: '',
    color: '',
  })

  const onSubmit = () => {
    if(data.value.title || data.value.text) {
      const transformedData: INoteCreateDto = {
        ...data.value,
        color: selectedColor.value
      } 
      emits('submit', transformedData)
    }
    emits('disable')
  }

  const adjustTitleHeight = () => {
    if (titleInputElement.value) {
      const target = titleInputElement.value
      target.style.height = 'auto';
      target.style.height = titleInputElement.value.scrollHeight + 'px';
    }
  };

  const adjustTextAreaHeight = () => {
    if (textInputElement.value) {
      const target = textInputElement.value
      target.style.height = 'auto';
      target.style.height = textInputElement.value.scrollHeight + 'px';
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
    return selectedColor.value === 'white' ? 'placeholder:text-grey-700' : 'placeholder:text-black'
  })

  onMounted(() => {
    if(props.activeNote) {
      data.value = {...props.activeNote}
      selectedColor.value = data.value.color
      nextTick(() => {
        adjustTitleHeight()
        adjustTextAreaHeight()
      })
    }
    if(textInputElement.value) {
      textInputElement.value.focus();
    }
  })
</script>

<style lang="scss" scoped>

</style>