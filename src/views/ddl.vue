<template>
  <br />
  <div class="MeetingArea-container">
    <MeetingArea :items="MeetingArea_items" :categoryLabels="categoryAreas"
    @update:selectedItems="updateSelectedItems" class="p-0 m-0" style="width: auto" />
    <div class="selected-items">
      <h3>พื้นที่ที่เลือก:</h3>
      <ul class="selected-items-list w-100">
        <li v-for="item in uniqueSelectedItems" :key="item.id + '-' + item.name" class="selected-item ">
          {{ item.name }}
          <button @click="removeSelectedItem(item)" class="remove-button">&times;</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import MeetingArea from '../components/MeetingArea.vue';
import axios from 'axios';

export default {
  components: {
    MeetingArea
  },
  setup() {
    const selectedItems = ref([]);

    const MeetingArea_items = ref({});
    const categoryAreas = ref({});
    const params = {
        user_id: localStorage.getItem('user_id'),
        department_id: localStorage.getItem('user_department_id'),
        position_id: localStorage.getItem('position_id'),
        employee_id: localStorage.getItem('user_employee_id'),
        division_id: localStorage.getItem('user_division_id'),
        branch_id: localStorage.getItem('user_branch_id'),
        work_flow_id: localStorage.getItem('user_work_flow_id'),
        role_id: localStorage.getItem('user_role_id')
    }
    const fetchMeetingAreas = async () => {
      try {
        const response = await axios.get(process.env.VUE_APP_API_URL + '/get_Group_MeetingAreas', { params });
        const data = response.data;
        const items = {};

        data.forEach(item => {
          const group = item.group_meeting_area;
          const meetingArea = {
            id: item.ma_id,
            name: item.meeting_area,
            selected: false
          };

          if (!items[group]) {
            items[group] = [];
          }

          items[group].push(meetingArea);
        });

        MeetingArea_items.value = items;
      } catch (error) {
        console.log(error);
      }
    };

    onMounted(async() => {
      fetchMeetingAreas();
      await axios.get(process.env.VUE_APP_API_URL + '/get_categoryAreas', { params })
        .then((res) => {
          JSON.parse(JSON.stringify(res.data)).forEach(item => {
            const key = item.group_meeting_area;
            categoryAreas.value[key] = key;
          });
        }, (res) => {
          console.log(res.data);
        });
    });

    const updateSelectedItems = (item) => {
      const categoryKey = Object.keys(MeetingArea_items.value).find(key => 
        MeetingArea_items.value[key].some(meetingAreaItem => meetingAreaItem.id === item.id)
      );

      if (item.selected) {
        if (categoryKey && MeetingArea_items.value[categoryKey].every(meetingAreaItem => meetingAreaItem.selected)) {
          selectedItems.value = selectedItems.value.filter(selectedItem => 
            !MeetingArea_items.value[categoryKey].some(meetingAreaItem => meetingAreaItem.id === selectedItem.id)
          );
          if (!selectedItems.value.some(selectedItem => selectedItem.id === categoryKey)) {
            selectedItems.value.push({
              id: categoryKey,
              name: `${categoryAreas.value[categoryKey]} ทั้งหมด`,
              isCategory: true
            });
          }
        } else {
          if (!selectedItems.value.some(selectedItem => selectedItem.id === item.id)) {
            selectedItems.value.push(item);
          }
        }
      } else {
        selectedItems.value = selectedItems.value.filter(selectedItem => selectedItem.id !== item.id);
        if (categoryKey) {
          selectedItems.value = selectedItems.value.filter(selectedItem => selectedItem.id !== categoryKey);
          MeetingArea_items.value[categoryKey].forEach(meetingAreaItem => {
            if (meetingAreaItem.selected) {
              selectedItems.value.push(meetingAreaItem);
            }
          });
        }
      }
    };

    const removeSelectedItem = (item) => {
      if (item.isCategory) {
        const categoryKey = item.id;
        MeetingArea_items.value[categoryKey].forEach(meetingAreaItem => {
          meetingAreaItem.selected = false;
        });
        selectedItems.value = selectedItems.value.filter(selectedItem => selectedItem.id !== categoryKey);
      } else {
        item.selected = false;
        selectedItems.value = selectedItems.value.filter(selectedItem => selectedItem.id !== item.id);
        const categoryKey = Object.keys(MeetingArea_items.value).find(key => 
          MeetingArea_items.value[key].some(meetingAreaItem => meetingAreaItem.id === item.id)
        );
        if (categoryKey && !MeetingArea_items.value[categoryKey].every(meetingAreaItem => !meetingAreaItem.selected)) {
          selectedItems.value = selectedItems.value.filter(selectedItem => selectedItem.id !== categoryKey);
          MeetingArea_items.value[categoryKey].forEach(meetingAreaItem => {
            if (meetingAreaItem.selected) {
              selectedItems.value.push(meetingAreaItem);
            }
          });
        }
      }
    };

    const uniqueSelectedItems = computed(() => {
      return selectedItems.value.reduce((uniqueItems, item) => {
        if (!uniqueItems.some(uniqueItem => uniqueItem.id === item.id)) {
          uniqueItems.push(item);
        }
        return uniqueItems;
      }, []);
    });

    return {
      selectedItems,
      MeetingArea_items,
      categoryAreas,
      updateSelectedItems,
      removeSelectedItem,
      uniqueSelectedItems
    };
  }
};
</script>

<style scoped>
.MeetingArea-container {
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: auto;
}
.selected-items {
  margin-top: 20px;
  background-color: #ecf0f1;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.selected-items h3 {
  margin-top: 0;
  margin-bottom: 15px;
}
.selected-items-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
}
.selected-item {
  display: flex;
  align-items: center;
  margin: 5px;
  background-color: #fff;
  padding: 3px 8px;
  border-radius: 3px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
.selected-item button {
  background-color: #e74c3c;
  color: white;
  border: none;
  cursor: pointer;
  margin-left: 5px;
  padding: 0;
  border-radius: 3px;
  font-size: 14px;
  width: 20px; /* ทำให้เป็นสี่เหลี่ยมจตุรัส */
  height: 20px; /* ทำให้เป็นสี่เหลี่ยมจตุรัส */
  display: flex;
  align-items: center;
  justify-content: center;
}
.selected-item button:hover {
  background-color: #c0392b;
}
/* Responsive styles */
@media (max-width: 768px) {
  .main-container {
    padding: 0 10px;
  }

  .selected-items-list {
    flex-direction: column;
  }

  .selected-item {
    margin: 5px 0;
  }
}
</style>
