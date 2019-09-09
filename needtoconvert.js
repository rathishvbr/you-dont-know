	var a = "DefaultMetaData [available=true, readOnly=false, required=true, allowedValues=[[value=AL, label=Alabama, legacyCode=null], [value=AK, label=Alaska, legacyCode=null], [value=AZ, label=Arizona, legacyCode=null], [value=AR, label=Arkansas, legacyCode=null], [value=CA, label=California, legacyCode=null], [value=CO, label=Colorado, legacyCode=null], [value=CT, label=Connecticut, legacyCode=null], [value=DE, label=Delaware, legacyCode=null], [value=DC, label=District of Columbia, legacyCode=null], [value=FL, label=Florida, legacyCode=null], [value=GA, label=Georgia, legacyCode=null], [value=HI, label=Hawaii, legacyCode=null], [value=ID, label=Idaho, legacyCode=null], [value=IL, label=Illinois, legacyCode=null], [value=IN, label=Indiana, legacyCode=null], [value=IA, label=Iowa, legacyCode=null], [value=KS, label=Kansas, legacyCode=null], [value=KY, label=Kentucky, legacyCode=null], [value=LA, label=Louisiana, legacyCode=null], [value=ME, label=Maine, legacyCode=null], [value=MD, label=Maryland, legacyCode=null], [value=MA, label=Massachusetts, legacyCode=null], [value=MI, label=Michigan, legacyCode=null], [value=MN, label=Minnesota, legacyCode=null], [value=MS, label=Mississippi, legacyCode=null], [value=MO, label=Missouri, legacyCode=null], [value=MT, label=Montana, legacyCode=null], [value=NE, label=Nebraska, legacyCode=null], [value=NV, label=Nevada, legacyCode=null], [value=NH, label=New Hampshire, legacyCode=null], [value=NJ, label=New Jersey, legacyCode=null], [value=NM, label=New Mexico, legacyCode=null], [value=NY, label=New York, legacyCode=null], [value=NC, label=North Carolina, legacyCode=null], [value=ND, label=North Dakota, legacyCode=null], [value=OH, label=Ohio, legacyCode=null], [value=OK, label=Oklahoma, legacyCode=null], [value=OR, label=Oregon, legacyCode=null], [value=PA, label=Pennsylvania, legacyCode=null], [value=RI, label=Rhode Island, legacyCode=null], [value=SC, label=South Carolina, legacyCode=null], [value=SD, label=South Dakota, legacyCode=null], [value=TN, label=Tennessee, legacyCode=null], [value=TX, label=Texas, legacyCode=null], [value=UT, label=Utah, legacyCode=null], [value=VT, label=Vermont, legacyCode=null], [value=VA, label=Virginia, legacyCode=null], [value=WA, label=Washington, legacyCode=null], [value=WV, label=West Virginia, legacyCode=null], [value=WI, label=Wisconsin, legacyCode=null], [value=WY, label=Wyoming, legacyCode=null]], suggestedValues=[], categories=[PREM_RLT], identifier=0, description=State code, label=State, format=, min=, max=2, dataType=STRING, dependencyEnabled=null, message=null, defaultValue=]"
let braceinserted = a.slice(16).replace(/=/g, ":").replace('[[', "[{").replace(']]', '}]').replace(/null]/g, 'null}').replace(/\[val/g, '{val');
let results = braceinserted.substring(1, braceinserted.length - 1);
let trimedResult = a.slice(16).replace(/=/g, ":").substring(1, braceinserted.length - 1);

let startArray = results.indexOf('[');
let endArray = results.indexOf(']');

let allowedValues = results.slice(startArray, endArray);
let removedBrace = allowedValues.substring(1);

function convertObj(obj){
  return obj.split(',')
		.map(keyVal => {
			return keyVal
        .replace(/{/g, ":")
				.split(':')
				.map(_ => _.trim());
		})
		.reduce((accumulator, currentValue) => {
			accumulator[currentValue[0]] = currentValue[1]
			return accumulator
		}, {});
}

let result = removedBrace.split('},').map(d => {
  return d.replace('{', '').replace('}','').trim().split(',').map(_ => _.trim());
});

let outputOne = [];
let objectSetter = (obj) => {
    let objHolder = {};
       obj.forEach(d => {
         let splited = d.split(':');
         objHolder[splited[0]] = splited[1];
       }) 
  return objHolder;
}

result.forEach(d => {
  outputOne.push(objectSetter(d));
})
console.log(outputOne);
startPoint = trimedResult.indexOf('[[');
endPoint = trimedResult.indexOf(']]') + 2;
let concateOne = trimedResult.substring(0, startPoint);
let concateTwo = trimedResult.substring(endPoint, braceinserted.length - 1);

let outputTwo = concateOne + concateTwo;

console.log(convertObj(outputTwo));
