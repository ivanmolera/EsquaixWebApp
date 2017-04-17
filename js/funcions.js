function finestra(theURL,winName,features)
{
	window.open(theURL,winName,features);
}

function gotoHome() {
	window.location = "index.php";
}

function gotoEquips() {
	window.location = "equips.php";
}

function gotoCalendari() {
	window.location = "calendari.php";
}

function gotoAdmin() {
	window.location = "admin.php";
}

function validateForm()
{
  var i,p,q,nm,test,num,min,max,errors='',args=validateForm.arguments;
  
  for (i=0; i<(args.length-2); i+=3)
  {
  	test=args[i+2];
  	val=findObj(args[i]);
  	if(val)
  	{
  		nm=val.name;
  		if((val=val.value)!="")
  		{
      			if(test.indexOf('isEmail')!=-1)
      			{
      				p=val.indexOf('@');
        			if(p<1 || p==(val.length-1))
        				errors+='- El camp <'+nm+'> ha de contenir una adreça de correu vàlida.\n';
      			}
      			else if(test!='R')
      			{
        			if(isNaN(val))
        				errors+='- El camp <'+nm+'> ha de contenir un nombre.\n';
        			
        			if(test.indexOf('inRange') != -1)
        			{
        				p=test.indexOf(':');
          				min=test.substring(8,p);
          				max=test.substring(p+1);
          
          				if(val<min || max<val)
          					errors+='- El camp <'+nm+'> ha de contenir un nombre entre '+min+' i '+max+'.\n';
    				}
    			}
    		}
    		else if(test.charAt(0) == 'R')
    			errors += '- El camp <'+nm+'> és necessari.\n';
    	}
  }
  
  if(errors)
  	alert('Han ocorregut els següents errors:\n'+errors);
  
  document.returnValue = (errors == '');
}