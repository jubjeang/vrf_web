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
          <input type="checkbox" @change="toggleCategory(categoryKey)" :checked="isCategorySelected(categoryKey)" />
          <span @click.stop="toggleItems(categoryKey)" class="category-label">
            {{ categoryLabels[categoryKey] }}
            <span :class="{ 'arrow': true, 'expanded': expandedCategories.includes(categoryKey) }"></span>
          </span>
        </div>
        <div v-show="expandedCategories.includes(categoryKey)">
          <div v-for="item in category" :key="item.id" class="dropdown-item">
            <label>
              <input type="checkbox" :checked="item.selected" @change="toggleItemSelection(categoryKey, item)" />
              {{ item.name }}
            </label>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue';

export default {
  name: 'MeetingArea',
  props: {
    items: {
      type: Object,
      required: true
    },
    controlItems: {
      type: Object,
      required: false
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
    },
    selectedControlItems: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update:selectedItems', 'update:selectedControlItems'],
  setup(props, { emit }) {
    const dropdownVisible = ref(false);
    const expandedCategories = ref([]);
    const isAllSelected = ref(false);
    const dropdown = ref(null);
    // ทำให้ props.items เป็น reactive
    //const items = ref(JSON.parse(JSON.stringify(props.items))); // clone เพื่อทำให้ reactive
    const items = computed(() => props.items); // ใช้ computed แทน clone

    const toggleDropdown = () => {
      dropdownVisible.value = !dropdownVisible.value;
    };

    const toggleCategory = (categoryKey) => {
      const categoryItems = items.value[categoryKey];
      const isSelected = categoryItems.every(item => item.selected);
      categoryItems.forEach(item => {
        item.selected = !isSelected;
      });

      updateSelectedItems();
      checkAllSelected();
    };

    const toggleItemSelection = (categoryKey, item) => { 
      // console.log('toggleItemSelection categoryKey: ', categoryKey,'toggleItemSelection item: ', item);
      // console.log('toggleItemSelection props.selectedItems: ', props.selectedItems);  
      item.selected = !item.selected;
      updateSelectedItems();
    };

    // const updateSelectedItems = () => {
    //   const updatedSelectedItems = [];
    //   // const itemsCopy = JSON.parse(JSON.stringify(items.value)); // ใช้ deep copy

    //   for (let key in items.value) {
    //     const categoryItems = items.value[key];
    //     const categorySelectedItems = [];
    //     let allSelected = true;

    //     categoryItems.forEach(categoryItem => {
    //       if (categoryItem.selected) {
    //         categorySelectedItems.push(categoryItem);
    //       } else {
    //         allSelected = false;
    //       }
    //     });

    //     if (allSelected && categoryItems.length > 0) {
    //       updatedSelectedItems.push({
    //         name: `${key} ทั้งหมด`,
    //         is_area_group: true
    //       });
    //     } else {
    //       updatedSelectedItems.push(...categorySelectedItems);
    //     }
    //     if(categorySelectedItems.length > 0){
    //       console.log('categorySelectedItems: ', categorySelectedItems);
    //     }
          
    //   }
        

    //   emit('update:selectedItems', updatedSelectedItems);
    //   checkAllSelected();
    // };
    const updateSelectedItems = () => {
    forceUpdateItems(); // ✅ บังคับ Vue ให้ตรวจจับการเปลี่ยนแปลง

    const updatedSelectedItems = [];
    console.log("🔍 Checking items.value before update:", JSON.parse(JSON.stringify(items.value)));

    for (let key in items.value) {
        const categoryItems = items.value[key];
        const categorySelectedItems = categoryItems.filter(item => item.selected);

        if (categorySelectedItems.length === categoryItems.length && categoryItems.length > 0) {
            updatedSelectedItems.push({ name: `${key} ทั้งหมด`, is_area_group: true });
        } else {
            updatedSelectedItems.push(...categorySelectedItems);
        }

        // ✅ Debug ดูว่า categorySelectedItems ยังมีค่าอยู่หรือไม่
        //console.log(`🔎 Category: ${key} | Selected Items:`, categorySelectedItems);
    }

    //console.log("🔍 Updated selected items:", updatedSelectedItems);
    
    // 🔥 แก้ปัญหา Vue ไม่ detect ด้วยการสร้าง reference ใหม่
    emit('update:selectedItems', JSON.parse(JSON.stringify(updatedSelectedItems))); 

    checkIfAllUnselected();
};
const forceUpdateItems = () => {
    //console.log("⚡ Forcing Vue to update items...");
    
    // ✅ ใช้ spread operator เพื่อสร้าง object ใหม่ใน array
    for (let key in items.value) {
        items.value[key] = items.value[key].map(item => ({
            ...item,
            selected: !!item.selected  // ✅ บังคับให้ Vue ตรวจจับการเปลี่ยนแปลงของ selected
        }));
    }
    
    //console.log("✅ After forceUpdateItems:", JSON.parse(JSON.stringify(items.value)));
};
const checkIfAllUnselected = () => {
    const allUnselected = Object.values(items.value).every(category =>
        category.every(item => !item.selected)
    );
    
    console.log("✅ Are all items unselected?", allUnselected);
    
    if (allUnselected) {
        resetSelectedItems(); // ✅ ถ้าทุกอย่างถูก uncheck ให้ล้างค่า selectedItems
    }
};
const resetSelectedItems = () => {
    //console.log("🔄 Resetting selected items...");
    emit('update:selectedItems', []); // ✅ รีเซ็ต selectedItems เป็นว่างเปล่า
};




    const updateSelectedControlItems = () => {
      const updatedSelectedControlItems = [];
      for (let key in props.controlItems) {
        props.controlItems[key].forEach(item => {
          if (item.selected) {
            updatedSelectedControlItems.push(item);
          }
        });
      }

      emit('update:selectedControlItems', updatedSelectedControlItems);
      checkAllControlSelected();
    };

    const isCategorySelected = (categoryKey) => {
      const categoryItems = items.value[categoryKey];
      return categoryItems.every(item => item.selected);
    };

    const toggleAllItems = () => {
      const isSelected = isAllSelected.value;
      for (let categoryKey in items.value) {
        items.value[categoryKey].forEach(item => {
          item.selected = !isSelected; // เปลี่ยนสถานะของ item ทุกตัว
        });
      }

      updateSelectedItems(); // อัปเดตรายการที่ถูกเลือก
      checkAllSelected(); // ตรวจสอบสถานะการเลือกทั้งหมดใหม่
      isAllSelected.value = !isSelected; // เปลี่ยนสถานะของ "เลือกทั้งหมด"
    };


    const toggleAllControlItems = () => {
      const isSelected = isAllSelected.value;
      for (let categoryKey in props.controlItems) {
        props.controlItems[categoryKey].forEach(item => {
          item.selected = !isSelected;
        });
      }
      updateSelectedControlItems();
      isAllSelected.value = !isSelected;
    };

    const checkAllSelected = () => {
      isAllSelected.value = Object.keys(items.value).every(categoryKey =>
        items.value[categoryKey].every(item => item.selected)
      );
      emit('update:isAllSelected', isAllSelected.value);
    };

    const checkAllControlSelected = () => {
      isAllSelected.value = Object.keys(props.controlItems).every(categoryKey =>
        props.controlItems[categoryKey].every(item => item.selected)
      );
    };

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

    const setCheckedForCategorySelected = () => {
      // console.log('selectedItems: ', props.selectedItems); // เพิ่มบรรทัดนี้เพื่อดูข้อมูล selectedItems
      let needsUpdate = false;
      props.selectedItems.forEach(selectedItem => {
        if (selectedItem.is_area_group) {
          const categoryName = selectedItem.name.replace(" ทั้งหมด", "");
          if (props.items[categoryName]) {
            props.items[categoryName].forEach(item => {
              if (!item.selected) needsUpdate = true;
              item.selected = true;
            });
          }
        } else {
          for (let key in props.items) {
            const item = props.items[key].find(i => i.name === selectedItem.name);
            if (item && !item.selected) {
              needsUpdate = true;
              item.selected = true;
            }
          }
        }
      });

      if (needsUpdate) {
        checkAllSelected();
      }
    };
    onMounted(() => {
      document.addEventListener('click', handleClickOutside);
      setCheckedForCategorySelected();
    });

    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside);
    });

    // อัปเดตค่า item ภายใน props.items โดยไม่เปลี่ยนแปลง reference หลัก
    watch(() => props.items, (newItems) => {
      for (const key in newItems) {
        // ลูป category เพื่ออัปเดตค่าภายใน category
        if (items.value[key]) {
          newItems[key].forEach((newItem, index) => {
            items.value[key][index].selected = newItem.selected;
          });
        }
      }
    }, { immediate: true, deep: true });
    // watch(() => props.items, (newItems) => {
    //   items.value = JSON.parse(JSON.stringify(newItems)); // เมื่อ props เปลี่ยน, ทำให้ reactive ใหม่
    // }, { immediate: true, deep: true });
    watch(() => props.selectedItems, (newSelectedItems) => {
      setCheckedForCategorySelected();
    }, { immediate: true, deep: true });

    return {
      items, // เพิ่ม items เพื่อให้ reactive
      dropdownVisible,
      dropdown,
      expandedCategories,
      toggleDropdown,
      toggleCategory,
      toggleAllItems,
      toggleAllControlItems,
      isCategorySelected,
      isAllSelected,
      toggleItems,
      toggleItemSelection,
      updateSelectedItems,
      updateSelectedControlItems
    };
  }
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

.dropdown-category-item input[type='checkbox'] {
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

.dropdown-item input[type='checkbox'] {
  margin-right: 8px;
}
</style>
