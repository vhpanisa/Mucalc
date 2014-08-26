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

function bugmp(mp){
	if(mp > 65535)
		return true;
	return false;
}

function bugvelo(c, speed){
	switch(c){
		case 'sm':
		if(speed < 455)
			return 0;
		else if(speed >= 455 && speed <= 479)
			return 1;
		else if(speed >= 480 && speed <= 586)// até 617 //
			return 0;
		else if(speed >= 587 && speed <= 688)
			return 1;
		else if(speed >= 689 && speed <= 854)
			return 0;
		else if(speed >= 855 && speed <= 1006)// até 1037 //
			return 1;
		else if(speed >= 1007 && speed <= 1099)
			return 2;
		else if(speed >= 1100 && speed <= 1104)
			return 1;
		else if(speed >= 1105 && speed <= 1354)
			return 0;
		else if(speed >= 1355 && speed <= 1599)
			return 1;
		else if(speed >= 1600 && speed <= 2349)
			return 2;
		else if(speed >= 2350 && speed <= 2354)
			return 1;
		else if(speed >= 2355 && speed <= 2854)
			return 0;
		else if(speed >= 2855)
			return 1;
		break;
		case 'mg':
		if(speed <= 526)
			return 0;
		else if(speed >= 526 && speed <= 553)
			return 1;
		else if(speed >= 553 && speed <= 726)
			return 0;
		else if(speed >= 726 && speed <= 833)
			return 1;
		else if(speed >= 833 && speed <= 1040)
			return 0;
		else if(speed >= 1040 && speed <= 1400)
			return 1;
		else if(speed >= 1400 && speed <= 1706)
			return 0;
		else if(speed >= 1706 && speed <= 2033)
			return 1;
		else if(speed >= 2033)
			return 2;
		else
			return 1;
		break;
		case 'dl':
		if(speed <= 190)
			return 0;
		else if (speed == 200)
			return 1;
		else if(speed >= 210 && speed <= 270)
			return 0;
		else if(speed >= 280 && speed <= 310)
			return 1;
		else if(speed >= 320 && speed <= 390)
			return 0;
		else if(speed >= 400 && speed <= 520)
			return 1;
		else if(speed >= 530 && speed <= 640)
			return 0;
		else if(speed >= 650 && speed <= 1140)
			return 1;
		else if(speed >= 1150 && speed <= 1390)
			return 0;
		else if(speed >= 1400 && speed <= 3250)
			return 1;
		break;
	}
}

function bugcheck(c, objBug, prefix){

	var $ = function( id ) { return document.getElementById( prefix + id ); };

	$('oMP').style['background-color'] = '';
	if(bugmp(objBug.mp))
		$('oMP').style['background-color'] = 'yellow';

	switch(bugvelo(c, objBug.speed)){
		case 0:
		$('oSpeed').style['background-color'] = '';
		break;
		case 1:
		$('oSpeed').style['background-color'] = 'yellow';
		break;
		case 2:
		$('oSpeed').style['background-color'] = 'orange';
		break;
	}

}

function addTab(){
	var newTabID = $('tabs').getElementsByTagName('section').length - 1;
	if (newTabID+1 >= 6) return;
	newTabID = 'tab' + (newTabID+1);
	var tabs = $("tabs");
	var newTab = document.createElement("section");
	newTab.id = newTabID;
	var aux = "";
	switch(+$('classes').options[$('classes').selectedIndex].value){
		case 1:
		aux = $('modelBK').innerHTML;
		break;
		case 2:
		aux = $('modelSM').innerHTML;
		break;
		case 3:
		aux = $('modelME').innerHTML;
		break;
		case 4:
		aux = $('modelMG').innerHTML;
		break;
		case 5:
		aux = $('modelDL').innerHTML;
		break;
		default:
		alert('Classe não implementada');
		return;
	}
	newTab.innerHTML = aux;
	tabs.appendChild(newTab);
	switch(+$('classes').options[$('classes').selectedIndex].value){
		case 1:
		$(newTabID).classList.add('bk');
		break;
		case 2:
		$(newTabID).classList.add('sm');
		break;
		case 3:
		$(newTabID).classList.add('me');
		break;
		case 4:
		$(newTabID).classList.add('mg');
		break;
		case 5:
		$(newTabID).classList.add('dl');
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

function calcSample(sample, def, absasa, pdimi, pddi, buffms, gangel){

	sample -= def;
	sample = sample * (1-absasa);

	for (var i = 0; i < pdimi; i++) {
		sample = (sample*0.96);
	}
	for (var i = 0; i < pddi; i++) {
		sample = (sample*0.93);
	}
	
	sample = sample * (1-(0.7*buffms));
	sample = sample * (1-(0.2*gangel));

	if(sample < 0) sample = 0;
	return (sample | 0);
}

function calcPontos (c, reset, vip, lvl, str, agi, vit, ene) {

	var exreset = 0;
	if (reset > 250){
		exreset = reset - 250;
		reset = 250;
	}

	var pontos = 0;
	switch(c){
		case 'mg':
		pontos = (100 + ((280+(60*vip)) * reset) + (exreset * 12) + (7 * (lvl-1)) - (str+agi+vit+ene));
		break;
		case 'dl':
		pontos = (100 + ((220+(60*vip)) * reset) + (exreset * 12) + (7 * (lvl-1)) - (str+agi+vit+ene));
		break;
		default:
		pontos = (100 + ((220+(60*vip)) * reset) + (exreset * 12) + (6 * (lvl-1)) - (str+agi+vit+ene));
		break;
	}

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

function calcDef (c, agi, defbuff, objAsa, pdeze, bdef) {
	var def = 0;
	switch(c){
		case 'bk':
		def = agi/3;
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
		def = agi/7;
		break;
	}

	def += defbuff;
	def += 800; //Defesa média dos sets
	def += (objAsa.Tidfasa * objAsa.lasa);

	for (var i = 0; i < pdeze; i++) {
		def = (def*1.16);
	}

	def *= (1+(bdef/100));
	return (def | 0);
}

function calcHP (c, lvl, vit, pvida, buffgf) {
	var hp = 0;
	switch(c){
		case 'bk':
		hp = 35+(lvl-1)*2+(vit*3);
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
		hp = 50+(lvl-1)*1.5+(vit*2);
		break;
	}

	for (var i = 0; i < pvida; i++) {
		hp = hp*1.04;
	}

	hp = hp * (1+(1*buffgf));

	return (hp | 0);
}

function calcMP (c, lvl, ene) {
	var mp = 0;
	switch(c){
		case 'bk':
		mp = 10+(lvl-1)*0.5+ene;
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
		mp = 40+(lvl-1)+(ene-15)*1.5;
		break;
	}

	return (mp | 0);
}

function calcAG(c, objAttr){
	var ag = 0;
	switch(c){
		case 'bk':
		ag = (objAttr.ene+objAttr.vit)*(0.3+objAttr.agi)*(0.2+objAttr.str)*0.15;
		break;
		case 'sm':
		ag = (objAttr.ene*0.2)+(objAttr.vit*0.3)+(objAttr.agi*0.4)+(objAttr.str*0.2);
		break;
		case 'me':
		ag = (objAttr.ene*0.2)+(objAttr.vit*0.3)+(objAttr.agi*0.2)+(objAttr.str*0.3);
		break;
		case 'mg':
		ag = (objAttr.ene*0.15)+(objAttr.vit*0.3)+(objAttr.agi*0.25)+(objAttr.str*0.2);
		break;
		case 'dl':
		ag = (objAttr.ene*0.15)+(objAttr.vit*0.1)+(objAttr.agi*0.2)+(objAttr.str*0.3)+(objAttr.cmd*0.3);
		break;
	}	
	return (ag | 0);
}

function calcSpeed (c, agi) {
	var speed = 0;
	switch(c){
		case 'bk':
		speed = agi / 15;
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
		speed = agi / 10;
		break;
	}	
	return (speed | 0);
}

function calcSD (objAttr, def, lvl) {
	var sd = (objAttr.str+objAttr.agi+objAttr.vit+objAttr.ene+objAttr.cmd) * 1.2 + def / 2 + lvl*lvl/ 30;
	return (sd | 0);
}

function calcWDmg(objDmg, objOpt, ene){
	objDmg.wmindmg = (ene / 9) * (1+(objOpt.pen*0.02)) * (1+(objOpt.wp*0.02)) * (1+objOpt.stfp);
	objDmg.wmindmg += objOpt.dmgbuff;
	objDmg.wmindmg *= (1+objOpt.iatasa) * (1+(objOpt.imp*0.3));
	objDmg.wmindmg |= 0;

	objDmg.wmaxdmg = (ene / 4) * (1+(objOpt.pen*0.02)) * (1+(objOpt.wp*0.02)) * (1+objOpt.stfp);
	objDmg.wmaxdmg += objOpt.dmgbuff;
	objDmg.wmaxdmg *= (1+objOpt.iatasa) * (1+(objOpt.imp*0.3));
	objDmg.wmaxdmg |= 0;
}

function calcPDmg(c, objDmg, objOpt, str, ene, agi){

	switch(c){
		case 'bk':
		objDmg.pmindmg = str/6;
		objDmg.pmaxdmg = str/4;
		objDmg.cbdmg = (str+agi+ene)/2;
		break;
		case 'me':
		objDmg.pmindmg = (str/14)+(agi/7);
		objDmg.pmaxdmg = (str/8)+(agi/4);
		break;
		case 'mg':
		objDmg.pmindmg = (str/6)+(ene/12);
		objDmg.pmaxdmg = (str/4)+(ene/8);
		break;
		case 'dl':
		objDmg.pmindmg = (str/7)+(ene/14);
		objDmg.pmaxdmg = (str/5)+(ene/10);
		break;
	}

	objDmg.pmindmg += objOpt.wpmin;
	objDmg.pmindmg *= (1+(objOpt.pen*0.02)) * (1+(objOpt.wp*0.02));
	objDmg.pmindmg += objOpt.dmgbuff;
	objDmg.pmindmg *= (1+objOpt.iatasa) * (1+(objOpt.imp*0.3));

	objDmg.pmaxdmg += objOpt.wpmax;
	objDmg.pmaxdmg *= (1+(objOpt.pen*0.02)) * (1+(objOpt.wp*0.02));
	objDmg.pmaxdmg += objOpt.dmgbuff;
	objDmg.pmaxdmg *= (1+objOpt.iatasa) * (1+(objOpt.imp*0.3));

	if(c == 'bk'){
		objDmg.cbdmg += objOpt.wpmax;
		objDmg.cbdmg *= (1+(objOpt.pen*0.02)) * (1+(objOpt.wp*0.02));
		objDmg.cbdmg += objOpt.dmgbuff;
		objDmg.cbdmg *= (1+objOpt.iatasa) * (1+(objOpt.imp*0.3));
		objDmg.cbdmg |= 0;
	}

	switch(c){
		case 'bk':
		t = 200 + (ene/10);
		break;
		case 'me':
		t = 100;
		break;
		case 'mg':
		t = 200;
		break;
		case 'dl':
		t = 200 + (ene/20);
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
		case 'bk':
		calcPDmg(c, objDmg, objOpt, str, ene, agi);
		break;
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
		case 'dl':
		calcPDmg(c, objDmg, objOpt, str, ene, agi);
		break;
	}

	objDmg.wexcdmg = objDmg.wmaxdmg * 1.20;
	objDmg.wexcdmg |= 0;
	objDmg.pexcdmg = objDmg.pmaxdmg * 1.20;
	objDmg.pexcdmg |= 0;

}

function calcRate(c, objRate, lvl, objAttr){
	switch(c){
		case 'bk':
		objRate.pvmdr = objAttr.agi/3;
		objRate.pvmar = ((lvl*5+(objAttr.agi*3))/2+objAttr.str/4) | 0;
		objRate.pvpdr = (lvl*2+objAttr.agi*0.5) | 0;
		objRate.pvpar = (lvl*3+objAttr.agi*4.5) | 0;
		break;
		case 'sm':
		objRate.pvmdr = objAttr.agi/3;
		objRate.pvmar = ((lvl*5+(objAttr.agi*3))/2+objAttr.str/4) | 0;
		objRate.pvpdr = (lvl*2+objAttr.agi*0.25) | 0;
		objRate.pvpar = (lvl*3+objAttr.agi*4) | 0;
		break;
		case 'me':
		objRate.pvmdr = objAttr.agi/4;
		objRate.pvmar = ((lvl*5+(objAttr.agi*3))/2+(objAttr.str/4)) | 0;
		objRate.pvpdr = (lvl*2+objAttr.agi*0.1) | 0;
		objRate.pvpar = (lvl*3+objAttr.agi*0.6) | 0;
		break;
		case 'mg':
		objRate.pvmdr = objAttr.agi/3;
		objRate.pvmar = ((lvl*5+(objAttr.agi*3))/2+(objAttr.str/4)) | 0;
		objRate.pvpdr = (lvl*2+objAttr.agi*0.25) | 0;
		objRate.pvpar = (lvl*3+objAttr.agi*3.5) | 0;
		break;
		case 'dl':
		objRate.pvmdr = objAttr.agi/7;
		objRate.pvmar = ((lvl*5+(objAttr.agi*5))/2+(objAttr.str/6)+(objAttr.cmd/10)) | 0;
		objRate.pvpdr = (lvl*2+objAttr.agi*0.5) | 0;
		objRate.pvpar = (lvl*3+objAttr.agi*4) | 0;
		break;
	}

	for (var i = 0; i < objRate.ppvm; i++) {
		objRate.pvmdr *= 1.10;
	}

	objRate.pvpdr = objRate.pvpdr + (objRate.def*0.10)

	objRate.pvpdr |= 0;
	objRate.pvmdr |= 0;
}


function refresh(e){
	var sender = (e && e.target) || (window.event && window.event.srcElement);
	var prefix = (sender.id).substring(0,5);
	try{var c = document.getElementById((sender.id).substring(0,4)).className;}
	catch(err){return;}
	var $ = function( id ) { return document.getElementById( prefix + id ); };
	if (!sanitycheck(prefix)) return;
	var str = +$('iStr').value;
	var agi = +$('iAgi').value;
	var vit = +$('iVit').value;
	var ene = +$('iEne').value;

	if(c == 'dl')
		var cmd = +$('iCmd').value;
	else
		var cmd = 0;

	var objAttr = {str:str, agi:agi, vit:vit, ene:ene, cmd:cmd};

	var lvl = +$('iLevel').value;
	var reset = +$('iResets').value;
	var vip = +$('iSCVip').checked;
	var pvida = +$('iSVida').value;
	var pdimi = +$('iSDiminui').value;
	var pddi = +$('iSDDI').value;
	var pdeze = +$('iSDeze').value;
	var ppvm = +$('iSPvm').value;
	var bdef = +$('iSSet').options[$('iSSet').selectedIndex].value;
	if(c == 'sm' || c == 'mg')
		var staff = (+$('iSStaff').value) / 100;
	var tasa = +$('iSTAsa').options[$('iSTAsa').selectedIndex].value;
	var lasa = +$('iSLAsa').value;
	var imp = +$('iSTPet').options[$('iSTPet').selectedIndex].value == 1 ? 1 : 0;
	var gangel = +$('iSTPet').options[$('iSTPet').selectedIndex].value == 2 ? 1 : 0;
	var addwp = +$('iSCWp').checked;
	var addpendant = +$('iSCPendant').checked;
	var buffms = +$('iSCMS').checked;
	var buffgf = +$('iSCGF').checked;
	var dmgbuff = 0;
	var defbuff = 0;
	var sample = +$('iSampledmg').value;
	if(c != 'sm'){
		var wpmin = 0;
		var wpmax = 0;
		if(+$('iSWpmin').value > 0)
			wpmin = +$('iSWpmin').value;
		if(+$('iSWpmax').value > 0)
			wpmax = +$('iSWpmax').value;
	}

	if (c == 'me'){
		if (+$('iSCSelf').checked == 1){
			$('iBuffME').value = $('iEne').value;
			$('iBuffME').disabled = true;
		}else{
			$('iBuffME').value = 0;
			$('iBuffME').disabled = false;
		}
	}

	if(+$('iBuffME').value > 0){
		dmgbuff = ((+$('iBuffME').value / 7) + 3) | 0;
		defbuff = ((+$('iBuffME').value / 8) + 2) | 0;
	}

	var red = ((ene/7)+3) | 0;
	var	green = ((ene/8)+2) | 0;
	var	blue = ((ene/5)+5) | 0;

	var pontos = calcPontos(c, reset, vip, lvl, str, agi, vit, ene);
	var objAsa = {iatasa:0,Tiatasa:0,idfasa:0,Tidfasa:0,absasa:0,Tabsasa:0, lasa:lasa, tasa:tasa};
	var speed = calcSpeed(c, agi);
	speed += calcAsa(objAsa);
	var hp = calcHP(c, lvl, vit, pvida, buffgf);	
	var mp = calcMP(c, lvl, ene);
	var ag = calcAG(c, objAttr);
	var def = calcDef(c, agi, defbuff, objAsa, pdeze, bdef);
	sample = calcSample(sample, def, objAsa.absasa, pdimi, pddi, buffms, gangel);
	var sd = calcSD(objAttr, def, lvl);

	var objDmg = {};
	var objOpt = {pen:addpendant, wp:addwp, stfp:staff, imp:imp, iatasa:objAsa.iatasa, dmgbuff:dmgbuff, wpmin:wpmin, wpmax:wpmax};
	calcDmg(c, objDmg, objOpt, str, agi, ene, cmd);

	var objRate = {pvmdr:0, pvmar:0, pvpdr:0, pvpar:0, ppvm:ppvm, def:def};
	calcRate(c, objRate, lvl, objAttr);

	$('oPontos').value = pontos;
	if(c == 'sm' || c == 'mg'){
		$('oMinwizDmg').value = objDmg.wmindmg;
		$('oMaxwizDmg').value = objDmg.wmaxdmg;
		$('oExcwizDmg').value = objDmg.wexcdmg;
	}
	if(c != 'sm'){
		$('oMinphyDmg').value = objDmg.pmindmg;
		$('oMaxphyDmg').value = objDmg.pmaxdmg;
		$('oExcphyDmg').value = objDmg.pexcdmg;
	}
	if(c == 'dl'){
		$('oFBMinphyDmg').value = objDmg.fbmindmg;
		$('oFBMaxphyDmg').value = objDmg.fbmaxdmg;
		$('oFBExcphyDmg').value = objDmg.fbexcdmg;
	}
	if(c == 'bk')
		$('oCBDmg').value = objDmg.cbdmg;

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
	if(c == 'me'){
		$('oBuffRed').value = red;
		$('oBuffGreen').value = green;
		$('oBuffBlue').value = blue;
	}
	var objBug = {mp:mp, speed:speed};
	bugcheck(c, objBug, prefix);
}