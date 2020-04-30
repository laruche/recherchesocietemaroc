const needle = require('needle');
var $ = require('cheerio')



var options = {
  headers: { 'X-Custom-Header': 'Bumbaway atuna' }
}

extract = (html) => {
  var parsedHTML = $.load(html)
  var company = {
    name: "",
    streetAddress: "",
    ice: "",
    if: "",
    rc: "",
    rc_city: ""
  }

  company.name = parsedHTML('#mCriteria[name="param[\'raisonSocialeNP\']"]').val();
  company.ice = parsedHTML('#mCriteria[name="param[\'numIce\']"]').val();
  company.if = parsedHTML('#mCriteria[name="param[\'ifu\']"]').val();
  company.rc = parsedHTML('#mCriteria[name="param[\'numRc\']"]').val();
  company.rc_city = parsedHTML('#mCriteria[name="param[\'libelleRc\']"]').val();
  company.streetAddress = parsedHTML('#mCriteria[name="param[\'adresseVille\']"]').text();

  return(company);
};

makePost = async (type, param) => {
  var postParam = ''
  switch (type) {
    case 'IF':
      postParam = "param['type']=IF&param['criteria']=" + param + "&param['codeRC']=Test&param['btnType']=Rechercher"
      break;
    case 'ICE':
      postParam = "param['type']=ICE&param['criteria']=" + param + "&param['codeRC']=Test&param['btnType']=Rechercher"
      break;
  }
  const restp = await needle('post', 'https://simpl-recherche.tax.gov.ma/RechercheEntreprise/result', postParam, options);
  const extractData = extract(restp.body);
  return(extractData);
    
};

exports.getInfoFromIF = async (IF) => {
  var societeInfo = await makePost('IF', IF);
  return(societeInfo);
}

exports.getInfoFromICE = async (ICE) => {
  var societeInfo = await makePost('ICE', ICE);
  return(societeInfo);
}





