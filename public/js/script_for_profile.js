$(document).ready(function(){
   
    fill();

    // $('#search').click(function(){
    //     var email = $('#email').val();
    //     var url = '/user-checking?email='+ email;
    //     $.get(url,function(data){
    //         autofill(data);
    //     })
    // })

    /*$('#email').blur(function(){
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
    });*/

});




function autofill(data){
    //console.log(data);
    $('#name').val(data[0].name);
    $('#contact').val(data[0].contact);
    $('#aadhaar').val(data[0].aadhaar);
    var address = data[0].fulladdress.split(',');
    $('#address').val(address[0]);
    $('#address2').val(address[1]);
    $('#city').val(data[0].city);
    $('#state').val(data[0].state);
    $('#pin').val(data[0].pin);
    $('#prev').attr('src',"uploads/"+data[0].picname);
    $('#prev').css('display','block');
    $('#previous_image').val(data[0].picname);
}

function fill(){
    //alert(localStorage.getItem('email'))
    document.getElementById('email').value = localStorage.getItem('email');
    var email = $('#email').val();
        var url = '/user-checking?email='+ email;
        $.get(url,function(data){
            autofill(data);
            //console.log(data);
        })
}