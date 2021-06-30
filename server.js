const express = require('express');
const app = express();
const mysql = require('mysql');
const path = require('path');
const fileupload = require('express-fileupload');
const { send } = require('process');

var dbConfigObj={
    host:"localhost",
    user:"root", 
    password:"",
    database:"project"
}
var dbcon= mysql.createConnection(dbConfigObj);
dbcon.connect(function(err){
    if(err)
        console.log(err.message);
    else
        console.log("Connected Successfully");
});
var port = process.env.PORT ||8080;

app.listen(port,()=>{
    console.log('server started at port 8080');
})
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(fileupload());



app.get('/',(req, res)=>{
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(path.join(__dirname,'public',index.html));
});

app.get('/sign_up',(req,res)=>{
    console.log(req.query);
    var data = [req.query.email.trim(),req.query.password,req.query.mobile_number,req.query.sel];
    dbcon.query('insert into profile(USERID,PASSWORD,MOBILE,type) value(?,?,?,?)',data, function(err, data) {
        if(err) console.log(err);
        res.send(data);
    });
});

app.get('/login',(req, res)=>{
    console.log(req.query);
    var data = [req.query.email,req.query.password];
    dbcon.query('select * from profile where  USERID= ?',[req.query.email.trim()],(err,data)=>{

        if(err) console.log(err);
        res.send(data);
        console.log(data);
    })
})


app.get('/provider-profile',(req, res)=>{
    res.sendFile(path.join(process.cwd(), 'public/provider-profile.html' ));
})

app.post('/save',(req, res)=>{
    
    var fulladdress = req.body.address1+','+req.body.address2;
    req.body.picname = req.files.pic.name;
    var data = [req.body.email,req.body.name,req.body.contact,req.body.aadhaar,fulladdress,req.body.city, req.body.picname,req.body.state,req.body.pin];
    
    if(req.files == null){
        res.body.filename = 'nopic.png';
        //alert('file not');
    }else{
        req.files.pic.mv(path.join(process.cwd(),'public' ,'uploads',req.files.pic.name),(err)=>{
            if(err)
                console.log(err);
            else
                console.log('file uploaded');
        });
    }
    dbcon.query('insert into profiles2 values(?,?,?,?,?,?,?,?,?)',data, function(err, data) {
        if(err) console.log(err);
    });
    res.end('saved.......')
})

app.get('/user-checking',(req, res)=>{
    dbcon.query('select * from profiles2 where email = ?',[req.query.email],(err,data)=>{
        res.send(data);
        console.log(data)
    })
});

app.post('/update',(req,res)=>{
    
    var fulladdress = req.body.address1+','+req.body.address2;
    if(req.files == null){
        req.body.picname=req.body.previous_image;
    }else{
    req.body.picname = req.files.pic.name;
    req.files.pic.mv(path.join(process.cwd(),'public','uploads',req.files.pic.name),(err)=>{
        if(err)
            console.log(err);
        else
            console.log('file uploaded');
    });
    }
    var data = [req.body.name,req.body.contact,req.body.aadhaar,fulladdress,req.body.city,req.body.picname,req.body.state,req.body.pin,req.body.email];
    dbcon.query("UPDATE profiles2 SET name=?,contact=?,aadhaar =?,address=?,city=?,picname=?,state=?,pin=? where email=?",data,(err)=>{
        if(err) { console.log(err);}
        else{console.log('update');}
    })
    console.log(req.body);
    res.end("updated");
})




//===========================avail medicine====================================================
app.get('/avail',(req, res)=>{
    res.sendFile(path.join(__dirname,"public/med-avail.html"));
})

app.post('/save-med',(req,res)=>{
    console.log(req.body);
    var data = [null,req.body.email,req.body.medname,req.body.company,req.body.date,req.body.unit,req.body.quantity,req.files.pic.name];
    console.log(data);
    dbcon.query('insert into medicines_table(uid,email,medname,company,expdate,unit,qty,picname) values(?,?,?,?,?,?,?,?)',data,(err,data)=>{
        if(err) console.log(err);
        else
        console.log('saved...');
    })
    res.end('working');
})

app.get('/med-manager',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/med-manager.html'));
});

app.get('/fetchMed',(req,res)=>{
    dbcon.query('select * from medicines_table where email=? and stock = "available"',[req.query.email], (err,data)=>{
        res.send(data);
    })
});

app.get('/sold-medicine',(req,res)=>{
    dbcon.query('update medicines_table set stock=? where uid = ?',["sold",req.query.uid],(err,data)=>{
        res.send(data);
    })
})

//=====================================needy profile ==========================================
app.get('/needy-profile',(req, res)=>{
    res.sendFile(path.join(process.cwd(),'public/needy-profile.html'));
})

app.post('/save-needy-profile',(req, res)=>{
    res.end('working');
})

app.get('/find-medicine',(req, res)=>{
    res.sendFile(path.join(__dirname, 'public/med-finder.html'))
})

app.get('/med',(req, res)=>{
    dbcon.query('select distinct medname,city from medicines_table',(err,data)=>{
        res.send(data);
    })
});

app.get('/fetchcity',(req,res)=>{
    dbcon.query('select distinct city from medicines_table',(err,data)=>{
        res.send(data);
    })
});
app.get('/providers',(req, res)=>{
    dbcon.query('select * from medicines_table where medname = ? AND city = ?',[req.query.medname,req.query.city],(err,data)=>{
        res.send(data);
    })
})
app.get('/search_needy_profile',(req, res)=>{
    dbcon.query('select * from needy_profiles where email = ?',[req.query.email],(err,data)=>{
        res.send(data);
    })
});

app.post('/save_needy_profile',(req, res)=>{
    var fulladdress = req.body.address+","+req.body.city +","+req.body.state+","+req.body.pin;
    console.log(req.body);
    console.log(fulladdress);
    dbcon.query('insert into needy_profiles values(?,?,?,?,?,?,?)',[req.body.email,req.body.name,fulladdress,req.body.city,req.body.aadhaar,req.body.pin,req.body.contact],(err,data)=>{
        //console.log(saved);
    })
    res.send('saved');
})

app.post('/update_needy_profile',(req,res)=>{
    var fulladdress = req.body.address+","+req.body.city +","+req.body.state+","+req.body.pin;
    // console.log(req.body);
    // console.log(fulladdress);
    var data = [req.body.name,fulladdress,req.body.city,req.body.aadhaar,req.body.pin,req.body.contact,req.body.email];
    dbcon.query('UPDATE needy_profiles SET name=?,address=?,city=?,aahaar=?,pin=?,contact=? where email=?',data,(err,data)=>{
      if(err)

        res.send(err);
        else
         res.send('updated');
    })
   
})

app.get('/provider_details',(req, res)=>{
    console.log(req.query.email);
    dbcon.query('select * from profiles2 where email = ?',[req.query.email],(err,data)=>{
        res.send(data);
        console.log(data)
    })
})