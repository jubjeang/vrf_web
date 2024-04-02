export const formatDate = (dateString) => {
    const date = new Date(dateString);
  
    // ระบุโซนเวลาที่คุณต้องการใช้ในการแสดงผล (หากต้องการใช้ UTC ให้ใส่ 'UTC')
    const options = { 
      timeZone: "UTC", 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: false 
    };  
    return date.toLocaleString('en-GB', options).replace(',', '');
  };
  