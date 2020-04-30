const recherchesociete = require('./index');

executeAsyncTask = async () => {
  var societe = await recherchesociete.getInfoFromIF('40419345');
  console.log(societe);
  var societe = await recherchesociete.getInfoFromICE('000223840000002');
  console.log(societe);
}

executeAsyncTask();