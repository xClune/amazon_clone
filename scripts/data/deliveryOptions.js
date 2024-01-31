import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions = [{
   id: '1', 
   deliveryDays: 7,
   priceCents: 0
},
{
    id: '2',
    deliveryDays: 3,
    priceCents: 499
},
{
    id: '3',
    deliveryDays: 1,
    priceCents: 999
}];

export function getDeliveryOption(deliveryOptionId) {
    let deliveryOption;
  
    deliveryOptions.forEach((option) => {
      if (option.id === deliveryOptionId) {
        deliveryOption = option;
      }
    });
  
    return deliveryOption; 
}

export function calculateDeliveryDate(deliveryOption) {
  let deliveryDate = dayjs();
  let remainingDays = deliveryOption.deliveryDays;

  console.log(deliveryDate.format('dddd'));
  console.log(deliveryDate.add(deliveryOption.deliveryDays, 'days'));

  let i = 0;
  while (i < remainingDays) {
    if (deliveryDate.format('dddd') === 'Saturday' || deliveryDate.format('dddd') === 'Sunday') {
    deliveryDate = deliveryDate.add(1, 'days');
    } else {
      deliveryDate = deliveryDate.add(1, 'days');
      remainingDays = (remainingDays - 1);
    }
    };
  
  return deliveryDate.format(
      'dddd, MMMM D'
  );
}; 