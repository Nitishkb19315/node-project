$(document).ready(function(){

    $('#search').click(function(){
        var email = $('#email').val();
        var url = '/user-checking?email='+ email;
        $.get(url,function(data){
            autofill(data);
        })
    })

    $('#email').blur(function(){
        var validation = /^([a-z0-9]+(?:[._-][a-z0-9]+)*)@([a-z0-9]+(?:[.-][a-z0-9]+)*\.[a-z]{2,})$/i;
        var email = $(this).val();
        var url = `/login?email= ${email}`;

        if(validation.test(email) == false){
            alert("Please enter valid email address");
            return;
        }
        $.get(url,function(data){
            if(data.length > 0){
                alert('this user id already exists');
            }
        });
    });

    $('#password').blur(function(){
        var validation3 = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/;
        password= $(this).val();
        if(validation3.test(password)==false){
            alert("you password must be contain 1 uppercase letter, 1 special character and 1 numerical number;")
        }
    });

    $('#mobileNo').blur(function(){

        validation4 = /^(\+\d{1,3}[- ]?)?\d{10}$/;
        mobile= $(this).val();
        if(validation4.test(mobile)==false)
        {
            alert('Please enter the valid Mobile No.')
        }
        
    });



    $('#sign_up').click(function(){
        var email = $('#email').val();
        var password = $('#password').val();
        var mobile_number = $('#mobile_number').val();
        var sel=$('#select option:selected').text();
        var url = `/sign_up?email=${email}&password=${password}&mobile_number=${mobile_number}&sel=${sel}`;
        
        $.get(url,function(data){  //call back function
            if(data.length==0)
            //alert(data);
            alert("Email exist try another");
          else{
              window.localStorage.setItem('email',email);
              window.localStorage.setItem('password',password);
              alert("Saved");
            }
    });
    });

    $('#log_in').click(function(){
        var email = $('#emailForLogin').val().trim();
        var password = $('#passwordForLogin').val();
        var url = `/login?email=${email}&password=${password}`;
        $.get(url,function(data){ 
            //  alert(data);
            if(data.length == 0){
                alert('user id not found')
            }else{

            if(password == data[0].PASSWORD){
                //alert('it is authorized person');
                window.localStorage.setItem('email',email);
                window.localStorage.setItem('password',password);
                if(data[0].type == 'Needy'){
                    window.open("./needy-dash.html", "_self");
                }
                if(data[0].type == 'Med Provider'){
                    window.open("./med-provider-dash.html","_self");
                }
                
            }else{
                alert('please enter the valid password');
            }
        }
    });
    });
});


