import { useRouter } from 'vue-router';

export const formatDate = (dateString) => {
  const date = new Date(dateString);
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

export const navigateToTemplateVRFList = (router, surl, button_modal) => { 
  document.getElementById(button_modal).click();
  // console.log('Router instance:', router);
  router.push(surl)
    .then(() => {
      // console.log('Navigation successful');
    })
    .catch(err => {
      // console.error('Failed to navigate:', err);
    });
};
