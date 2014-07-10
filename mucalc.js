var $ = function( id ) { return document.getElementById( id ); };

function sanitycheck(){
	var flag = true;
	//alert($('iStr').value);

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
	var newTabID = $('tabs').getElementsByTagName('section').length;
	newTabID = 'tab' + (newTabID+1);
	var tabs = $("tabs");
	var newTab = document.createElement("section");
	newTab.id = newTabID;
	newTab.innerHTML =
	[
	'<h2><a href="',
	'#' + newTabID,
	'">',
	'Tab 1',
	'</a></h2>',
	'<p>This content appears on tab 2.</p>',
	].join('\n');
	tabs.appendChild(newTab);
}

function refresh(){
	if (!sanitycheck()) return;
	var str = +$('iStr').value;
	var agi = +$('iAgi').value;
	var vit = +$('iVit').value;
	var ene = +$('iEne').value;
	var lvl = +$('iLevel').value;
	var reset = +$('iResets').value;
	var pvida = +$('iSVida').value;
	var staff = (+$('iSStaff').value) / 100;
	var tasa = +$('iSTAsa').options[$('iSTAsa').selectedIndex].value;
	var lasa = $('iSLAsa').value;
	var imp = +$('iSCImp').checked;
	var addstaff = +$('iSCStaff').checked;
	var addpendant = +$('iSCPendant').checked;			

	var exreset = 0;
	if (reset > 250){
		exreset = reset - 250;
		reset = 250;
	}

	var pontos = 100 + (280 * reset) + (exreset * 12) + (6 * (lvl-1)) - (str+agi+vit+ene);
	var hp = 30+(lvl-1)+(vit*2);

	for (var i = 0; i < pvida; i++) {
		hp = (hp*1.05) | 0;
	}

	var mp = (lvl-1)*2+ene*2;
	var ag = ((ene*0.2)+(vit*0.3)+(agi*0.4)+(str*0.2)) | 0 ;
	var def = (agi/4) | 0;
	var speed = (agi/10) | 0;
	var sd = ((str+agi+vit+ene) * 1.2 + def / 2 + lvl*lvl/ 30) | 0;

	var asa = 0;
	switch(tasa){
		case 1:
		tasa = 2;
		asa = 12;
		break;
		case 2:
		tasa = 1;
		asa = 32;
		break;
	}
	asa += (tasa * lasa); asa /= 100; ;
	var chkdmg = (1+(imp*0.3)) * (1+(addpendant*0.02)) * (1+(addstaff*0.02));
	var mindmg = (ene / 9) * (1+staff) * (1+asa); mindmg *= chkdmg; mindmg |= 0;
	var maxdmg = (ene / 4) * (1+staff) * (1+asa); maxdmg *= chkdmg; maxdmg |= 0;
	var excdmg = maxdmg * 1.20; excdmg |= 0;
	var pvmdr = (agi/3) | 0;
	var pvmar = (lvl*5+(agi*3)/2+str/4) | 0;
	var pvpdr = (lvl*2+agi*0.25) | 0;
	var pvpar = (lvl*3+agi*4) | 0;

	$('oPontos').value = pontos;
	$('oMinDmg').value = mindmg;
	$('oMaxDmg').value = maxdmg;
	$('oExcDmg').value = excdmg;
	$('oHP').value = hp;
	$('oMP').value = mp;
	$('oAG').value = ag;
	$('oSD').value = sd;
	$('oDef').value = def;
	$('oSpeed').value = speed;
	$('oPvmDr').value = pvmdr;
	$('oPvmAr').value = pvmar;
	$('oPvpDr').value = pvpdr;
	$('oPvpAr').value = pvpar;

}