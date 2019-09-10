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







////////////////////////////////////////////////

					<br>
					<div class="-oneX-col-lg-5 -oneX-col-md-5 -oneX-col-sm-5">
							<select id="retryStrategy" name="retryStrategy" class="-oneX-dropdown" style="width: 30%; max-width: 215px!important;" aria-invalid="true" aria-describedby="retryStrategy-err">
							<option value=""></option>
							<c:forEach items="${retryStrategies}" var="item">
							<option value="${item.value}">${item.label}</option>
							</c:forEach></select>
							<div id="retryStrategy-err" class="-oneX-widget__err-text" style="display:none" aria-live="assertive">You must select a retry strategy for your service.</div>
					</div>
				<!-- sfx-->


				<span id="selectState" index=${loop.index} metadata="${mdp['addressMetadataPrototype']['stateProvince']}" disabled="${readOnlyView}"> </span>
					
					<br>
					<c:choose> 
						<c:when test="${enteredAddress.residentialAddress}">
							<sfx:selectRow name="allAddresses[${loop.index}].stateProvince" metadata="${mdp['addressMetadataPrototype']['stateProvince']}" disabled="${readOnlyView}"/>
							<c:set var="disableZipcode" value="true"/>
						</c:when>
						<c:otherwise>
							<sfx:selectRow name="allAddresses[${loop.index}].stateProvince" metadata="${mdp['mailingAddressMetadataPrototype']['stateProvince']}" disabled="${readOnlyView}"/>
							<c:set var="disableZipcode" value="${readOnlyView}"/>
						</c:otherwise>
					</c:choose>


<div id="sfx_allAddresses[0].stateProvince_row" class="row-fluid control-group "><div class="span7">  <label id="sfx_allAddresses[0].stateProvince_lbl" data-identifier="0" for="sfx_allAddresses[0].stateProvince_input" class="label-edit" data-name="allAddresses[0].stateProvince"> State    </label>  </div><div class="span5">      <select id="sfx_allAddresses[0].stateProvince_input" name="allAddresses[0].stateProvince" data-identifier="0" class="default input-edit " data-required="true" aria-required="true" data-validators="required;" data-suffix=" "> <option class="isHint" value="" disabled="disabled"> </option>  <option data-identifier="0" value="AL">Alabama</option> <option data-identifier="0" value="AK">Alaska</option> <option data-identifier="0" value="AZ">Arizona</option> <option data-identifier="0" value="AR">Arkansas</option> <option data-identifier="0" value="CA">California</option> <option data-identifier="0" value="CO">Colorado</option> <option data-identifier="0" value="CT">Connecticut</option> <option data-identifier="0" value="DE">Delaware</option> <option data-identifier="0" value="DC">District of Columbia</option> <option data-identifier="0" value="FL">Florida</option> <option data-identifier="0" value="GA">Georgia</option> <option data-identifier="0" value="HI">Hawaii</option> <option data-identifier="0" value="ID">Idaho</option> <option data-identifier="0" value="IL">Illinois</option> <option data-identifier="0" value="IN">Indiana</option> <option data-identifier="0" value="IA" selected="selected">Iowa</option> <option data-identifier="0" value="KS">Kansas</option> <option data-identifier="0" value="KY">Kentucky</option> <option data-identifier="0" value="LA">Louisiana</option> <option data-identifier="0" value="ME">Maine</option> <option data-identifier="0" value="MD">Maryland</option> <option data-identifier="0" value="MA">Massachusetts</option> <option data-identifier="0" value="MI">Michigan</option> <option data-identifier="0" value="MN">Minnesota</option> <option data-identifier="0" value="MS">Mississippi</option> <option data-identifier="0" value="MO">Missouri</option> <option data-identifier="0" value="MT">Montana</option> <option data-identifier="0" value="NE">Nebraska</option> <option data-identifier="0" value="NV">Nevada</option> <option data-identifier="0" value="NH">New Hampshire</option> <option data-identifier="0" value="NJ">New Jersey</option> <option data-identifier="0" value="NM">New Mexico</option> <option data-identifier="0" value="NY">New York</option> <option data-identifier="0" value="NC">North Carolina</option> <option data-identifier="0" value="ND">North Dakota</option> <option data-identifier="0" value="OH">Ohio</option> <option data-identifier="0" value="OK">Oklahoma</option> <option data-identifier="0" value="OR">Oregon</option> <option data-identifier="0" value="PA">Pennsylvania</option> <option data-identifier="0" value="RI">Rhode Island</option> <option data-identifier="0" value="SC">South Carolina</option> <option data-identifier="0" value="SD">South Dakota</option> <option data-identifier="0" value="TN">Tennessee</option> <option data-identifier="0" value="TX">Texas</option> <option data-identifier="0" value="UT">Utah</option> <option data-identifier="0" value="VT">Vermont</option> <option data-identifier="0" value="VA">Virginia</option> <option data-identifier="0" value="WA">Washington</option> <option data-identifier="0" value="WV">West Virginia</option> <option data-identifier="0" value="WI">Wisconsin</option> <option data-identifier="0" value="WY">Wyoming</option></select>    </div>  <p id="sfx_allAddresses[0].stateProvince_alert" data-name="allAddresses[0].stateProvince" class="flag   hide"><span id="sfx_allAddresses[0].stateProvince_alertSeverity" class="alertSeverity icon"></span><span id="sfx_allAddresses[0].stateProvince_alertMessage" class="alertMessage"></span></p> </div>
