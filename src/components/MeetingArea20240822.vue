<template>
  <div class="dropdown-container" ref="dropdown">
    <button class="dropbtn" type="button" @click="toggleDropdown">{{ controlLabel }}</button>
    <div :class="['dropdown-content', { 'no-select-all': !showSelectAll }]" v-show="dropdownVisible">
      <div class="dropdown-category">
        <div class="dropdown-category-item">
          <template v-if="showSelectAll">
            <input type="checkbox" @change="toggleAllItems" :checked="isAllSelected" />
            <span>ทั้งหมด</span>
          </template>
        </div>
      </div>
      <div v-for="(category, categoryKey) in items" :key="categoryKey" class="dropdown-category">
        <div class="dropdown-category-item">
          <input type="checkbox" @change="toggleCategory(categoryKey)"
            :checked="isCategorySelected(categoryKey, category)" />
          <span @click.stop="toggleItems(categoryKey)" class="category-label">
            {{ categoryLabels[categoryKey]  }} 
            <span :class="{ 'arrow': true, 'expanded': expandedCategories.includes(categoryKey) }"></span>
          </span>
        </div>
        <div v-show="expandedCategories.includes(categoryKey)">
          <div v-for="item in category" :key="item.id" class="dropdown-item">
            <label>
              <input type="checkbox" v-model="item.selected" :checked="isSelected(item,'normal')"
                @change="updateSelectedItems(categoryKey, item)" />
              {{ item.name }} 
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, watch } from 'vue';

export default {
  name: 'MeetingArea',
  props: {
    items: {
      type: Object,
      required: true
    },
    categoryLabels: {
      type: Object,
      required: true
    },
    controlLabel: {
      type: String,
      required: true
    },
    showSelectAll: {
      type: Boolean,
      default: true
    },
    selectedItems: {
      type: Array,
      required: true
    }
  },
  setup(props, { emit }) {
    const dropdownVisible = ref(false);
    const expandedCategories = ref([]);
    const isAllSelected = ref(false);
    const dropdown = ref(null);
    // console.log('Available keys in props.items:', Object.keys(props.items)); // แสดงคีย์ทั้งหมดใน props.items
    // console.log('props.items:', props.items);
    const toggleDropdown = () => {
      dropdownVisible.value = !dropdownVisible.value;
    };

    const toggleCategory = (categoryKey) => {
      const isSelected = props.items[categoryKey].every(item => item.selected);
      props.items[categoryKey].forEach(item => {
        item.selected = !isSelected;
      });
      updateSelectedItems(categoryKey);
      checkAllSelected();
    };

    const toggleAllItems = () => {
      const isSelected = isAllSelected.value;
      for (let categoryKey in props.items) {
        props.items[categoryKey].forEach(item => {
          item.selected = !isSelected;
        });
      }
      updateSelectedItems();
      isAllSelected.value = !isSelected;
    };

    const checkAllSelected = () => {
      isAllSelected.value = Object.keys(props.items).every(categoryKey =>
        props.items[categoryKey].every(item => item.selected)
      );
    };
    const updateSelectedItems = (categoryKey, item = null) => {
      if (item && item.selected !== props.items[categoryKey].selected) {
        emit('update:selectedItems', item);
      } else {
        for (let key in props.items) {
          props.items[key].forEach(item => {
            emit('update:selectedItems', item);
          });
        }
      }
      checkAllSelected();
    };
    const isCategorySelected = (categoryKey, category) => {
      if (categoryKey !== "พื้นที่ทั่วไป") {
        return Array.isArray(props.selectedItems) && props.selectedItems.some(selectedItem => {
          if (removeWord(selectedItem.name, " ทั้งหมด") === categoryKey) {
            isSelected(categoryKey,'security')    
            return true;
          }
          // else {
          //    return false;            
          // }
        });
      }
      // else {
      //   return true;
      // }
    };
    const removeWord = (str, wordToRemove) => {
      const regex = new RegExp(`\\s*${wordToRemove}\\s*`, 'g');
      return str.replace(regex, '');
    };
    // const isCategorySelected = (categoryKey) => {
    //   return props.items[categoryKey].every(item => item.selected);
    // };
    const isSelected = (item,type) => { 
      
      if (type === 'normal') { 
        // console.log('isSelected  normal item: ',item) 
        return Array.isArray(props.selectedItems) && props.selectedItems.some(selectedItem => {
          return removeWord(selectedItem.name, " ทั้งหมด") === item.name;
        });
      }
      else { 
        // console.log('isSelected not normal item: ',item)
        // return props.items[item].forEach(item_ => {
        //   return true;
        // });
        return Array.isArray(props.items[item]) && props.items[item].some(selectedItem => { 
          // console.log('isSelected not normal selectedItems: ',selectedItem);
          return true;
        });
        // item.forEach(item_ => {
        //   return item_.selected;
        // });
        
        //return Array.isArray(props.selectedItems) && props.selectedItems.some(selectedItem => removeWord(selectedItem.name, " ทั้งหมด") === item.name);
      }
    };
    // const isSelected = (item) => {
    //   return Array.isArray(props.selectedItems) && props.selectedItems.some(selectedItem => selectedItem.name === item.name);
    // };
    const toggleItems = (categoryKey) => {
      if (expandedCategories.value.includes(categoryKey)) {
        expandedCategories.value = expandedCategories.value.filter(key => key !== categoryKey);
      } else {
        expandedCategories.value.push(categoryKey);
      }
    };
    const handleClickOutside = (event) => {
      if (dropdown.value && !dropdown.value.contains(event.target)) {
        dropdownVisible.value = false;
      }
    };
    const removeItem = (item) => {
      const categoryKey = Object.keys(props.items).find(key =>
        props.items[key].some(meetingAreaItem => meetingAreaItem.id === item.id)
      );
      if (categoryKey) {
        props.items[categoryKey].forEach(meetingAreaItem => {
          if (meetingAreaItem.id === item.id) {
            meetingAreaItem.selected = false;
          }
        });
        emit('remove:item', item);
      }
    };
    const setCheckedForCategorySelected = () => {
      const trimmedCategoryNames = props.selectedItems
        .filter(item => item.name.endsWith(" ทั้งหมด"))
        .map(item => removeWord(item.name, " ทั้งหมด"));
      // console.log('trimmedCategoryNames:',trimmedCategoryNames);

      trimmedCategoryNames.forEach(suKey => {
        const suCategory = props.items[suKey];

        if (suCategory) {
          suCategory.forEach(item => { 
            // console.log('suCategory:',suCategory);
            // console.log('item:',item);
            // if (!item.selected) {
              item.selected = true;
              // emit('update:selectedItems', item);
            // }
          });
        } else {
          console.log(`Key "${suKey}" not found in props.items.`);
        }
      });
    };
    onMounted(() => { 
      document.addEventListener('click', handleClickOutside);
    });
    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside);
    });
    watch(() => props.selectedItems, (newSelectedItems) => {
      if (newSelectedItems.length > 0) {
        setCheckedForCategorySelected(); 
      }
    }, { immediate: true });
    watch(() => props.items, (newItems) => {
      if (Object.keys(newItems).length > 0) {
        setCheckedForCategorySelected(); 
        checkAllSelected(); 
      }
    }, { deep: true });
    // watch(() => props.items, (newItems, oldItems) => {
    //     // if (Object.keys(newItems).length > 0) {
    //     //   console.log('Items loaded:', newItems);
    //     //   setCheckedForCategorySelected();                   
    //     // }
    //     checkAllSelected(); // เรียกฟังก์ชัน checkAllSelected
    //   }, { deep: true });
    return {
      dropdownVisible,
      dropdown,
      expandedCategories,
      toggleDropdown,
      toggleCategory,
      toggleAllItems,
      isCategorySelected,
      isAllSelected,
      toggleItems,
      updateSelectedItems,
      isSelected,
      removeItem
    };
  },
  emits: ['update:selectedItems', 'remove:item']
};
</script>

<style scoped>
.dropdown-container {
  position: relative;
  display: inline-block;
}

.dropbtn {
  background-color: #3498db;
  color: white;
  padding: 5px 10px;
  /* ปรับขนาดให้พอดีกับคำ */
  font-size: small;
  border: none;
  cursor: pointer;
  text-align: left;
  box-sizing: border-box;
  border-radius: 5px;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 250px;
  max-width: 300px;
  width: auto;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  padding: 0 16px;
  /* ปรับ padding เมื่อ showSelectAll เป็น false */
  border: 1px solid #ddd;
  box-sizing: border-box;
  left: 100%;
  /* ขยับมาให้ด้านขวาชนปุ่ม */
  top: 0;
  max-height: 400px;
  /* เพิ่มส่วนนี้ */
  overflow-y: auto;
  /* เพิ่มส่วนนี้ */
  border-radius: 5px;
}

.dropdown-content.no-select-all {
  padding-top: 0;
  /* ปรับ padding เมื่อ showSelectAll เป็น false */
}

.dropdown-container:hover .dropdown-content {
  display: block;
}

.dropdown-category {
  margin-bottom: 10px;
}

.dropdown-category-item {
  display: flex;
  align-items: center;
  padding: 5px 0;
  font-size: 0.875rem;
  /* ปรับขนาดฟอนต์ให้เล็กลง */
}

.dropdown-category-item input[type="checkbox"] {
  margin-right: 8px;
}

.category-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
  font-size: 0.875rem;
  /* ปรับขนาดฟอนต์ให้เล็กลง */
}

.arrow::after {
  content: '';
  display: inline-block;
  margin-left: 5px;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid black;
  transition: transform 0.3s ease;
}

.arrow.expanded::after {
  transform: rotate(180deg);
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 5px 0;
  padding-left: 20px;
  font-size: 0.875rem;
  /* ปรับขนาดฟอนต์ให้เล็กลง */
}

.dropdown-item label {
  display: flex;
  align-items: center;
}

.dropdown-item input[type="checkbox"] {
  margin-right: 8px;
}
</style>
