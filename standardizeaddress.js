/*
 * Copyright (c) 2015 State Farm Automobile Insurance Company. All rights reserved.
 */
// $( document ).ready(function() {
// 	var x = document.getElementById("selectState");
// 	console.log(JSON.stringify(x.getAttribute("metadata")));
// });


function metaDataBuilderFromId(selector) {
	var x = document.getElementById(selector);
	metaData = x.getAttribute("metadata");
	var res = metaData.slice(16).replace(/=/g, ":")
	var split = res.substring(1, res.length - 1);
	var result = split.split(',')
		.map(keyVal => {
			return keyVal
				.split(':')
				.map(_ => _.trim())
		})
		.reduce((accumulator, currentValue) => {
			accumulator[currentValue[0]] = currentValue[1]
			return accumulator
		}, {});
	return result;
}

function validatorsDataBuilderFromId(selector) {
	return document.getElementById(selector).getAttribute("validators");
}

function valueDataBuilderFromId(selector) {
	return document.getElementById(selector).getAttribute("value");
}

function buildAll(point, selector) {
	console.log(point);
	let metaData = metaDataBuilderFromId(selector);
	let validation = validatorsDataBuilderFromId(selector);
	let value = valueDataBuilderFromId(selector);
	// console.log(JSON.stringify(metaData));
	let label = buildLabel(point, metaData);
	// console.log(label);
	let input = buildInput(point, metaData, validation, value);
	// console.log(input);
	let alertDiv = buildAlert(point);
	// console.log(alert);

	return `<div id="${point}_row" class="row-fluid control-group ">` + label + input + alertDiv + `</div>`
}

function buildAllForSelector(point, selector) {
	let metaData = metaDataBuilderFromIdForSelector(selector);
	// let value = valueDataBuilderFromId(selector);
	let label = buildLabel(point, metaData.outputTwo);
	let input = buildInputSelector(point, metaData.outputOne, metaData.outputTwo);
	let alertDiv = buildAlert(point);
	return `<div id="${point}_row" class="row-fluid control-group ">` + label + input + alertDiv + `</div>`;
}

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

function metaDataBuilderFromIdForSelector(selector) {
	var a = document.getElementById(selector).getAttribute("metadata");
	let braceinserted = a.slice(16).replace(/=/g, ":").replace('[[', "[{").replace(']]', '}]').replace(/null]/g, 'null}').replace(/\[val/g, '{val');
	let results = braceinserted.substring(1, braceinserted.length - 1);
	let trimedResult = a.slice(16).replace(/=/g, ":").substring(1, braceinserted.length - 1);
	
	let startArray = results.indexOf('[');
	let endArray = results.indexOf(']');
	
	let allowedValues = results.slice(startArray, endArray);
	let removedBrace = allowedValues.substring(1);
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
	  
	  let outputTwo = convertObj(concateOne + concateTwo);
	  
	  return {outputOne, outputTwo};
}

function buildLabel(point, metaData) {
	let name = point.replace('sfx_','');
	return `<div class="span7"> <label id="${point}_lbl" data-identifier="${metaData.identifier}" for="${point}_input"
	class="label-edit" data-name="${name}"> ${metaData.label} </label> </div>`;
}

function buildInputSelector(point, selector, metaData) {
	let name = point.replace('sfx_','');
	let selector = selector.map(d => `<option data-identifier="0" value="${d.value}">${d.label}</option>`);
	return `<div class="span5"> <select id="${point}_input" name="${name}"
	data-identifier="${metaData.identifier}" class="default input-edit " data-required="${metaData.required}" aria-required="${metaData.required}"
	data-validators="required;" data-suffix=" ">
	<option class="isHint" value="" disabled="disabled"> </option>
`+selector.join("")
+`</select> </div>`;
}

function buildInput(point, metaData, validation, value) {
	let name = point.replace('sfx_','');
	return `<div class="span5"> <input id="${point}_input" name="${name}" data-identifier="${metaData.identifier}"
	type="text" value="${value}" class="default input-edit validate input-large" data-required="${metaData.required}" aria-required="true"
	data-dataType="${metaData.dataType.toLowerCase()}" data-max="${metaData.max}" maxlength="${metaData.max}" data-validators="required;${validation}" />
</div>`;
}

function buildAlert(point) {
	let name = point.replace('sfx_','');
	return `<p id="${point}_alert" data-name="${name}" class="flag   hide"><span id="${point}_alertSeverity"
	class="alertSeverity icon"></span><span id="${point}_alertMessage" class="alertMessage"></span></p>`;
}


document.getElementById("street1_row").innerHTML = buildAll(
	'sfx_allAddresses' +
	`[${document.getElementById('street1_row').getAttribute("index")}].` +
	'street1', 'street1_row');

	document.getElementById("street2_row").innerHTML = buildAll(
		'sfx_allAddresses' +
		`[${document.getElementById('street2_row').getAttribute("index")}].` +
		'street2', 'street2_row');

		document.getElementById("city_row").innerHTML = buildAll(
			'sfx_allAddresses' +
			`[${document.getElementById('city_row').getAttribute("index")}].` +
			'city', 'city_row');
		    document.getElementById("selectState").innerHTML = buildAllForSelector(
			  	'sfx_allAddresses' +
			  	`[${document.getElementById('selectState').getAttribute("index")}].` +
				'selectState', 'selectState');
			
			
			
			// <span id="selectState"  id=${loop.index} metadata="${mdp['addressMetadataPrototype']['stateProvince']}" disabled="${readOnlyView}"> </span>
	
			
			
			
			
			
			
			
			
			
			