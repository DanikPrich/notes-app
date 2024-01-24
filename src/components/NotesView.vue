<template>
  <div 
    class="drop-zone"
    @drop="onDrop($event, 1)"
    @dragenter.prevent
    @dragover.prevent
  >
    <div 
      v-for="item in getList(1)" 
      :key="item.id" 
      class="drag-el"
      :draggable="true"
      @dragstart="startDrag($event, item)"
    >
      {{ item.title }}
    </div>
  </div>

  <div 
    class="drop-zone"
    @drop="onDrop($event, 2)"
    @dragenter.prevent
    @dragover.prevent
  >
    <div 
      v-for="item in getList(2)" 
      :key="item.id" 
      class="drag-el"
      :draggable="true"
      @dragstart="startDrag($event, item)"
    >
      {{ item.title }}
    </div>
  </div>
</template>

<script lang="ts">
  import { ref } from 'vue';
  import type { INote } from '@/types/notes'
  export default {
    setup () {
      const items = ref([
        {id: 0, title: 'Item A', list: 1},
        {id: 1, title: 'Item B', list: 1},
        {id: 2, title: 'Item C', list: 2},
      ] as Array<INote>)

      const getList = (list: number ) => {
        return items.value.filter((item) => item.list == list)
      }

      const startDrag = (event: DragEvent , item: INote) => {
        console.log(event)
        if(event.dataTransfer) {
          event.dataTransfer.dropEffect = 'move'  //visual effects 
          event.dataTransfer.effectAllowed = 'move' //not doing a copy
          event.dataTransfer.setData('itemID', item.id.toString())
        }
      }

      const onDrop = (event: DragEvent , list: number) => {
        if(event.dataTransfer) {
          const itemID = event.dataTransfer.getData('itemID')
          const item = items.value.find((item) => item.id == +itemID)
          item.list = list
        }
      }      

      return {
        getList,
        onDrop,
        startDrag
      }
    }
  }
</script>

<style scoped>
  .drop-zone {
    text-align: center;
    width: 50%;
    margin: 50px auto;
    background-color: #e9e9e9;
    padding: 10px;
    min-height: 10px;
  }
  
  .drag-el {
    background-color: #246d31;
    color: white;
    padding: 5px;
    margin-bottom: 10px;  
  }

  .drag-el:nth-last-of-type(1) {
    margin-bottom: 0;
  }
</style>