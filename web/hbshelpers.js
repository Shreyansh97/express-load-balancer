const hbs = require('hbs');

hbs.registerHelper('gettype',(val)=>{
  let ret = 'Round Robin';
  if(val == '2')
    ret = 'Least Connections';
  if(val == '3')
    ret = 'IP Hash';
  return ret;
});

hbs.registerHelper('binToBool', val => {
  if(val == '0')
    return 'NO';
  return 'YES';
})