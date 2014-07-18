var $ = function( id ) { return document.getElementById( id ); };

function sanitycheck(prefix){
	var $ = function( id ) { return document.getElementById( prefix + id ); };
	var flag = true;

	$('iStr').style['background-color'] = '';
	if (+$('iStr').value > 32500 || +$('iStr').value < 0){
		$('iStr').style['background-color'] = 'red';
		flag = false;
	}
	
	$('iAgi').style['background-color'] = '';
	if (+$('iAgi').value > 32500 || +$('iAgi').value < 0){
		$('iAgi').style['background-color'] = 'red';
		flag = false;
	}

	$('iVit').style['background-color'] = '';
	if (+$('iVit').value > 32500 || +$('iVit').value < 0){
		$('iVit').style['background-color'] = 'red';
		flag = false;
	}

	$('iEne').style['background-color'] = '';
	if (+$('iEne').value > 32500 || +$('iEne').value < 0){
		$('iEne').style['background-color'] = 'red';
		flag = false;
	}

	$('iLevel').style['background-color'] = '';
	if (+$('iLevel').value > 400 || +$('iLevel').value < 1){
		$('iLevel').style['background-color'] = 'red';
		flag = false;
	}

	$('iResets').style['background-color'] = '';
	if (+$('iResets').value > 500 || +$('iResets').value < 0){
		$('iResets').style['background-color'] = 'red';
		flag = false;
	}

	return flag;
}

function addTab(){
	var newTabID = $('tabs').getElementsByTagName('section').length - 1;
	newTabID = 'tab' + (newTabID+1);
	var tabs = $("tabs");
	var newTab = document.createElement("section");
	newTab.id = newTabID;
	var aux = "";
	switch(+$('classes').options[$('classes').selectedIndex].value){
		case 2:
		aux = $('modelSM').innerHTML;
		break;
		case 3:
		aux = $('modelME').innerHTML;
		break;
		case 4:
		aux = $('modelMG').innerHTML;
		break;
		default:
		alert('Classe não implementada');
		return;
	}
	newTab.innerHTML = aux;
	tabs.appendChild(newTab);
	switch(+$('classes').options[$('classes').selectedIndex].value){
		case 2:
		$(newTabID).classList.add('sm');
		break;
		case 3:
		$(newTabID).classList.add('me');
		break;
		case 4:
		$(newTabID).classList.add('mg');
		break;
		default:
		alert('Classe não implementada');
		return;
	}
	
	$(newTabID).getElementsByTagName('a')[0].href = '#'+ newTabID; 

	var matches = [];
	var elements = $(newTabID).getElementsByTagName('input');
	for(var i = 0; i < elements.length; i++) {
		if(elements[i].id != 'undefined') {
			elements[i].id = newTabID + '_' + elements[i].id;
		}
	}

	var elements = $(newTabID).getElementsByTagName('select');
	for(var i = 0; i < elements.length; i++) {
		if(elements[i].id != 'undefined') {
			elements[i].id = newTabID + '_' + elements[i].id;
		}
	}
	window.location.href = '#'+ newTabID;
}

function calcSample(sample, def, absasa, pdimi, pddi){
	sample -= def;
	sample = sample * (1-absasa);

	for (var i = 0; i < pdimi; i++) {
		sample = (sample*0.96);
	}
	for (var i = 0; i < pddi; i++) {
		sample = (sample*0.93);
	}
	if(sample < 0) sample = 0;
	return (sample | 0);
}

function calcPontos (c, reset, lvl, str, agi, vit, ene) {

	var exreset = 0;
	if (reset > 250){
		exreset = reset - 250;
		reset = 250;
	}

	var pontos = 0;
	if (c != 'mg')
		pontos = (100 + (280 * reset) + (exreset * 12) + (6 * (lvl-1)) - (str+agi+vit+ene));
	else
		pontos = (100 + (340 * reset) + (exreset * 12) + (7 * (lvl-1)) - (str+agi+vit+ene));

	return pontos;
}

function calcAsa(objAsa){
	var speed = 0;
	switch(objAsa.tasa){
		case 1:
		objAsa.Tiatasa = 2;
		objAsa.Tidfasa = 3;
		objAsa.Tabsasa = 2;
		objAsa.iatasa = 12;
		objAsa.idfasa = 10;
		objAsa.absasa = 12;
		speed = 15;
		break;

		case 2:
		objAsa.Tiatasa = 1;
		objAsa.Tidfasa = 2;
		objAsa.Tabsasa = 1;
		objAsa.iatasa = 32;
		objAsa.idfasa = 45;
		objAsa.absasa = 25;
		speed = 16;
		break;
	}

	if(objAsa.tasa > 0){

		objAsa.iatasa += (objAsa.Tiatasa * objAsa.lasa);
		objAsa.iatasa /= 100;

		objAsa.absasa += (objAsa.Tabsasa * objAsa.lasa);
		objAsa.absasa /= 100;
	}

	return speed;
}

function calcDef (c, agi, defbuff, objAsa) {
	var def = 0;
	switch(c){
		case 'bk':
		break;
		case 'sm':
		def = agi/4;
		break;
		case 'me':
		def = agi/10;
		break;
		case 'mg':
		def = agi/5;
		break;
		case 'dl':
		break;
	}
	
	def += defbuff;
	def += (objAsa.Tidfasa * objAsa.lasa);

	return (def | 0);
}

function calcHP (c, lvl, vit, pvida) {
	var hp = 0;
	switch(c){
		case 'bk':
		break;
		case 'sm':
		hp = 30+(lvl-1)+(vit*2);
		break;
		case 'me':
		hp = 40+(lvl-1)+(vit*2);
		break;
		case 'mg':
		hp = 58+(lvl-1)+(vit*2);
		break;
		case 'dl':
		break;
	}

	for (var i = 0; i < pvida; i++) {
		hp = (hp*1.05) | 0;
	}

	return hp;
}

function calcMP (c, lvl, ene) {
	var mp = 0;
	switch(c){
		case 'bk':
		break;
		case 'sm':
		mp = (lvl-1)*2+(ene*2);
		break;
		case 'me':
		mp = 6+(lvl*1.5)+(ene*1.5);
		break;
		case 'mg':
		mp = 8+(lvl-1)+(ene*2);
		break;
		case 'dl':
		break;
	}

	return mp;
}

function calcAG(c, ene,vit,agi,str){
	var ag = 0;
	switch(c){
		case 'bk':
		break;
		case 'sm':
		ag = (ene*0.2)+(vit*0.3)+(agi*0.4)+(str*0.2);
		break;
		case 'me':
		ag = (ene*0.2)+(vit*0.3)+(agi*0.2)+(str*0.3);
		break;
		case 'mg':
		ag = (ene*0.15)+(vit*0.3)+(agi*0.25)+(str*0.2);
		break;
		case 'dl':
		break;
	}	
	return (ag | 0);
}

function calcSpeed (c, agi) {
	var speed = 0;
	switch(c){
		case 'bk':
		break;
		case 'sm':
		speed = agi / 10;
		break;
		case 'me':
		speed = agi / 50;
		break;
		case 'mg':
		speed = agi / 15;
		break;
		case 'dl':
		break;
	}	
	return (speed | 0);
}

function calcSD (str, agi, vit, ene, cmd, def, lvl) {
	var sd = (str+agi+vit+ene+cmd) * 1.2 + def / 2 + lvl*lvl/ 30;
	return (sd | 0);
}

function calcWDmg(objDmg, objOpt, ene){
	objDmg.wmindmg = (ene / 9) * (1+(objOpt.pen*0.02)) * (1+(objOpt.stf*0.02)) * (1+objOpt.stfp);
	objDmg.wmindmg += objOpt.dmgbuff;
	objDmg.wmindmg *= (1+objOpt.iatasa) * (1+(objOpt.imp*0.3));
	objDmg.wmindmg |= 0;

	objDmg.wmaxdmg = (ene / 4) * (1+(objOpt.pen*0.02)) * (1+(objOpt.stf*0.02)) * (1+objOpt.stfp);
	objDmg.wmaxdmg += objOpt.dmgbuff;
	objDmg.wmaxdmg *= (1+objOpt.iatasa) * (1+(objOpt.imp*0.3));
	objDmg.wmaxdmg |= 0;
}

function calcPDmg(c, objDmg, objOpt, str, ene, agi){

	switch(c){
		case 'me':
		objDmg.pmindmg = (str/14)+(agi/7);
		objDmg.pmaxdmg = (str/8)+(agi/4);
		break;
		case 'mg':
		objDmg.pmindmg = (str/6)+(ene/12);
		objDmg.pmaxdmg = (str/4)+(ene/8);
		break;
	}

	objDmg.pmindmg += objOpt.wpmin;
	objDmg.pmindmg *= (1+(objOpt.pen*0.02)) * (1+(objOpt.stf*0.02));
	objDmg.pmindmg += objOpt.dmgbuff;
	objDmg.pmindmg *= (1+objOpt.iatasa) * (1+(objOpt.imp*0.3));

	objDmg.pmaxdmg += objOpt.wpmax;
	objDmg.pmaxdmg *= (1+(objOpt.pen*0.02)) * (1+(objOpt.stf*0.02));
	objDmg.pmaxdmg += objOpt.dmgbuff;
	objDmg.pmaxdmg *= (1+objOpt.iatasa) * (1+(objOpt.imp*0.3));

	switch(c){
		case 'me':
		t = 100;
		break;
		case 'mg':
		t = 200;
		break;
	}

	t /= 100;
	objDmg.pmindmg *= t;
	objDmg.pmaxdmg *= t;
	objDmg.pmindmg |= 0;
	objDmg.pmaxdmg |= 0;

}

function calcDmg (c, objDmg, objOpt, str, agi, ene, cmd) {

	switch(c){
		case 'sm':
		calcWDmg(objDmg, objOpt, ene);
		break;
		case 'me':
		calcPDmg(c, objDmg, objOpt, str, ene, agi);
		break;
		case 'mg':
		calcWDmg(objDmg, objOpt, ene);
		calcPDmg(c, objDmg, objOpt, str, ene, agi);
		break;
	}

	objDmg.wexcdmg = objDmg.wmaxdmg * 1.20;
	objDmg.wexcdmg |= 0;
	objDmg.pexcdmg = objDmg.pmaxdmg * 1.20;
	objDmg.pexcdmg |= 0;
	
}

function calcRate(c, objRate, lvl, agi, str){
	switch(c){
		case 'sm':
		objRate.pvmdr = agi/3;
		objRate.pvmar = (lvl*5+(agi*3)/2+str/4) | 0;
		objRate.pvpdr = (lvl*2+agi*0.25) | 0;
		objRate.pvpar = (lvl*3+agi*4) | 0;
		break;
		case 'me':
		objRate.pvmdr = agi/4;
		objRate.pvmar = (lvl*5+(agi*3)/2+str/4) | 0;
		objRate.pvpdr = (lvl*2+agi*0.1) | 0;
		objRate.pvpar = (lvl*3+agi*0.6) | 0;
		break;
		case 'mg':
		objRate.pvmdr = agi/3;
		objRate.pvmar = (lvl*5+(agi*3)/2+str/4) | 0;
		objRate.pvpdr = (lvl*2+agi*0.25) | 0;
		objRate.pvpar = (lvl*3+agi*3.5) | 0;
		break;		
	}

	for (var i = 0; i < objRate.ppvm; i++) {
		objRate.pvmdr *= 1.10;
	}

	objRate.pvmdr |= 0;
}

function refreshSM(e){

	var sender = (e && e.target) || (window.event && window.event.srcElement);
	var prefix = (sender.id).substring(0,5);	
	var c = document.getElementById((sender.id).substring(0,4)).className;
	var $ = function( id ) { return document.getElementById( prefix + id ); };
	if (!sanitycheck(prefix)) return;
	var str = +$('iStr').value;
	var agi = +$('iAgi').value;
	var vit = +$('iVit').value;
	var ene = +$('iEne').value;
	var lvl = +$('iLevel').value;
	var reset = +$('iResets').value;
	var pvida = +$('iSVida').value;
	var pdimi = +$('iSDiminui').value;
	var pddi = +$('iSDDI').value;
	var ppvm = +$('iSPvm').value;
	var staff = (+$('iSStaff').value) / 100;
	var tasa = +$('iSTAsa').options[$('iSTAsa').selectedIndex].value;
	var lasa = +$('iSLAsa').value;
	var imp = +$('iSCImp').checked;
	var addwp = +$('iSCStaff').checked;
	var addpendant = +$('iSCPendant').checked;
	var dmgbuff = 0;
	var defbuff = 0;
	var sample = +$('iSampledmg').value;
	if(+$('iBuffME').value > 0){
		dmgbuff = ((+$('iBuffME').value / 7) + 3) | 0;
		defbuff = ((+$('iBuffME').value / 8) + 2) | 0;
	}

	var pontos = calcPontos(c, reset, lvl, str, agi, vit, ene);
	var objAsa = {iatasa:0,Tiatasa:0,idfasa:0,Tidfasa:0,absasa:0,Tabsasa:0, lasa:lasa, tasa:tasa};
	var speed = calcSpeed(c, agi);
	speed += calcAsa(objAsa);
	var hp = calcHP(c, lvl, vit, pvida);	
	var mp = calcMP(c, lvl, ene);
	var ag = calcAG(c, ene, vit, agi, str);
	var def = calcDef(c, agi, defbuff, objAsa);
	sample = calcSample(sample, def, objAsa.absasa, pdimi, pddi);
	var sd = calcSD(str, agi, vit, ene, 0, def, lvl);

	var objDmg = {wmindmg:0,wmaxdmg:0,wexcdmg:0};
	var objOpt = {pen:addpendant, stf:addwp, stfp:staff, imp:imp, iatasa:objAsa.iatasa, dmgbuff:dmgbuff};
	calcDmg(c, objDmg, objOpt, str, agi, ene, 0);
	
	var objRate = {pvmdr:0, pvmar:0, pvpdr:0, pvpar:0, ppvm:ppvm};
	calcRate(c, objRate, lvl, agi, str);

	$('oPontos').value = pontos;
	$('oMinDmg').value = objDmg.wmindmg;
	$('oMaxDmg').value = objDmg.wmaxdmg;
	$('oExcDmg').value = objDmg.wexcdmg;
	$('oHP').value = hp;
	$('oMP').value = mp;
	$('oAG').value = ag;
	$('oSD').value = sd;
	$('oDef').value = def;
	$('oDefp').value = sample;
	$('oSpeed').value = speed;
	$('oPvmDr').value = objRate.pvmdr;
	$('oPvmAr').value = objRate.pvmar;
	$('oPvpDr').value = objRate.pvpdr;
	$('oPvpAr').value = objRate.pvpar;

}

function refreshME(e){
	var sender = (e && e.target) || (window.event && window.event.srcElement);
	var prefix = (sender.id).substring(0,5);
	var c = document.getElementById((sender.id).substring(0,4)).className;
	var $ = function( id ) { return document.getElementById( prefix + id ); };
	if (!sanitycheck(prefix)) return;
	if (+$('iSCSelf').checked == 1){
		$('iBuffME').value = $('iEne').value;
		$('iBuffME').disabled = true;
	}else{
		$('iBuffME').value = 0;
		$('iBuffME').disabled = false;
	}
	var str = +$('iStr').value;
	var agi = +$('iAgi').value;
	var vit = +$('iVit').value;
	var ene = +$('iEne').value;
	var lvl = +$('iLevel').value;
	var reset = +$('iResets').value;
	var pvida = +$('iSVida').value;
	var pdimi = +$('iSDiminui').value;
	var pddi = +$('iSDDI').value;
	var ppvm = +$('iSPvm').value;
	var bowmin = 0;
	var bowmax = 0;
	if(+$('iSBowmin').value > 0)
		bowmin = +$('iSBowmin').value;
	if(+$('iSBowmax').value > 0)
		bowmax = +$('iSBowmax').value;
	var tasa = +$('iSTAsa').options[$('iSTAsa').selectedIndex].value;
	var lasa = +$('iSLAsa').value;
	var imp = +$('iSCImp').checked;
	var addwp = +$('iSCBow').checked;
	var addpendant = +$('iSCPendant').checked;	
	var dmgbuff = 0;
	var defbuff = 0;
	if(+$('iBuffME').value > 0){
		dmgbuff = ((+$('iBuffME').value / 7) + 3) | 0;
		defbuff = ((+$('iBuffME').value / 8) + 2) | 0;
		
	}		
	var red = ((ene/7)+3) | 0;
	var	green = ((ene/8)+2) | 0;
	var	blue = ((ene/5)+5) | 0;
	var sample = +$('iSampledmg').value;

	var pontos = calcPontos(c, reset, lvl, str, agi, vit, ene);
	var objAsa = {iatasa:0,Tiatasa:0,idfasa:0,Tidfasa:0,absasa:0,Tabsasa:0, lasa:lasa, tasa:tasa};
	var speed = calcSpeed(c, agi);
	speed += calcAsa(objAsa);
	var hp = calcHP(c, lvl, vit, pvida);	
	var mp = calcMP(c, lvl, ene);
	var ag = calcAG(c, ene, vit, agi, str);
	var def = calcDef(c, agi, defbuff, objAsa);
	sample = calcSample(sample, def, objAsa.absasa, pdimi, pddi);
	var sd = calcSD(str, agi, vit, ene, 0, def, lvl);

	var objDmg = {pmindmg:0,pmaxdmg:0,pexcdmg:0};
	var objOpt = {pen:addpendant, stf:addwp, imp:imp, iatasa:objAsa.iatasa, dmgbuff:dmgbuff, wpmin:bowmin, wpmax:bowmax};
	calcDmg(c, objDmg, objOpt, str, agi, ene, 0);
	
	var objRate = {pvmdr:0, pvmar:0, pvpdr:0, pvpar:0, ppvm:ppvm};
	calcRate(c, objRate, lvl, agi, str);

	$('oPontos').value = pontos;
	$('oMinDmg').value = objDmg.pmindmg;
	$('oMaxDmg').value = objDmg.pmaxdmg;
	$('oExcDmg').value = objDmg.pexcdmg;
	$('oHP').value = hp;
	$('oMP').value = mp;
	$('oAG').value = ag;
	$('oSD').value = sd;
	$('oDef').value = def;
	$('oDefp').value = sample;
	$('oSpeed').value = speed;
	$('oPvmDr').value = objRate.pvmdr;
	$('oPvmAr').value = objRate.pvmar;
	$('oPvpDr').value = objRate.pvpdr;
	$('oPvpAr').value = objRate.pvpar;
	$('oBuffRed').value = red;
	$('oBuffGreen').value = green;
	$('oBuffBlue').value = blue;
}

function refreshMG(e){

	var sender = (e && e.target) || (window.event && window.event.srcElement);
	var prefix = (sender.id).substring(0,5);
	var c = document.getElementById((sender.id).substring(0,4)).className;
	var $ = function( id ) { return document.getElementById( prefix + id ); };
	if (!sanitycheck(prefix)) return;
	var str = +$('iStr').value;
	var agi = +$('iAgi').value;
	var vit = +$('iVit').value;
	var ene = +$('iEne').value;
	var lvl = +$('iLevel').value;
	var reset = +$('iResets').value;
	var pvida = +$('iSVida').value;
	var pdimi = +$('iSDiminui').value;
	var pddi = +$('iSDDI').value;
	var ppvm = +$('iSPvm').value;
	var wpmin = 0;
	var wpmax = 0;
	if (+$('iSWpmin').value > 0)
		wpmin = +$('iSWpmin').value;
	if (+$('iSWpmax').value > 0)
		wpmax = +$('iSWpmax').value;
	var staff = (+$('iSStaff').value) / 100;
	var tasa = +$('iSTAsa').options[$('iSTAsa').selectedIndex].value;
	var lasa = +$('iSLAsa').value;
	var imp = +$('iSCImp').checked;
	var addwp = +$('iSCStaff').checked;
	var addpendant = +$('iSCPendant').checked;
	var dmgbuff = 0;
	var defbuff = 0;
	if(+$('iBuffME').value > 0){
		dmgbuff = ((+$('iBuffME').value / 7) + 3) | 0;
		defbuff = ((+$('iBuffME').value / 8) + 2) | 0;
	}
	var sample = +$('iSampledmg').value;

	var pontos = calcPontos(c, reset, lvl, str, agi, vit, ene);
	var objAsa = {iatasa:0,Tiatasa:0,idfasa:0,Tidfasa:0,absasa:0,Tabsasa:0, lasa:lasa, tasa:tasa};
	var speed = calcSpeed(c, agi);
	speed += calcAsa(objAsa);
	var hp = calcHP(c, lvl, vit, pvida);	
	var mp = calcMP(c, lvl, ene);
	var ag = calcAG(c, ene, vit, agi, str);
	var def = calcDef(c, agi, defbuff, objAsa);
	sample = calcSample(sample, def, objAsa.absasa, pdimi, pddi);
	var sd = calcSD(str, agi, vit, ene, 0, def, lvl);
	
	var objDmg = {wmindmg:0,wmaxdmg:0,wexcdmg:0};
	var objOpt = {pen:addpendant, stf:addwp, stfp:staff, imp:imp,iatasa:objAsa.iatasa, dmgbuff:dmgbuff, wpmin:wpmin, wpmax:wpmax};
	calcDmg(c, objDmg, objOpt, str, agi, ene, 0);

	var objRate = {pvmdr:0, pvmar:0, pvpdr:0, pvpar:0, ppvm:ppvm};
	calcRate(c, objRate, lvl, agi, str);

	$('oPontos').value = pontos;
	$('oMinwizDmg').value = objDmg.wmindmg;
	$('oMaxwizDmg').value = objDmg.wmaxdmg;
	$('oExcwizDmg').value = objDmg.wexcdmg;
	$('oMinphyDmg').value = objDmg.pmindmg;
	$('oMaxphyDmg').value = objDmg.pmaxdmg;
	$('oExcphyDmg').value = objDmg.pexcdmg;
	$('oHP').value = hp;
	$('oMP').value = mp;
	$('oAG').value = ag;
	$('oSD').value = sd;
	$('oDef').value = def;
	$('oDefp').value = sample;
	$('oSpeed').value = speed;
	$('oPvmDr').value = objRate.pvmdr;
	$('oPvmAr').value = objRate.pvmar;
	$('oPvpDr').value = objRate.pvpdr;
	$('oPvpAr').value = objRate.pvpar;
}