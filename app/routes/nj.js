var User = require('../models/user');
var  Product = require('../models/product'); 
var  Track = require('../models/track'); 
//var Machine = require('../models/machine');
var jwt	  = require('jsonwebtoken');
var secret = 'cryptography'
var request = require('request');
var qr = require('qr-js');

var puname = 'null';

module.exports = function(router) {
var previous=0;

var mypubip;
var where = require('node-where');
var getmac = require('getmac');
var macAddress;
var lat;
var lng;
const publicIp = require('public-ip');

 



 router.post('/register', function(req, res) {
        var user = new User(); 
        user.email 		= req.body.email;
		user.password		= req.body.pass;
		user.username = req.body.uname;
		user.Regdate = new Date(Date.now());
		user.Expdate =  new Date(Date.now() +(7*24*60*60*1000));
		user.QRGenerated = 0;
        user.QRRemain = 100;
        user.paid = false;
 if(req.body.email == null || req.body.email == "" || req.body.pass == null || req.body.pass == "" || req.body.uname == null || req.body.uname == "")  {
            
            res.json({success: false, message:'Provide User name /Email ' })
        }else{
            // Save new user to database
        user.save(function(err){
            if(err){
                res.json({success: false, message:"User name /Email already exits"});
                        } 
                         else{
                res.json({success: true , message:'user created'});
            }
        });
    }
    
    });


router.post('/authenticate', function(req,res){
  puname = req.body.uname;

  User.findOne({username: req.body.uname}).select(" username password").exec(function(err,user){
    if(err) throw err;
    if(!user){
      res.json({success: false, message: "could not authenticate User"});

    }
    else if(user){
      if(req.body.pass)
      {
        var validPassword = user.comparePassword(req.body.pass);

      }
      else{
             res.json({success: false, message: "no password provided"});
 
      }
      if(!validPassword){
      res.json({success: false, message: "could not authenticate password"});

    } else{
     var token =  jwt.sign({username: user.username},secret, {expiresIn: '24h'});
      res.json({success: true, message: " authenticated password", token: token});
    }
    }
  });
});


  router.use(function(req,res,next){

  var token = req.body.token || req.body.query || req.headers['x-access-token'];
  if(token){
    //verify token

    jwt.verify(token, secret, function(err, decoded) {
      if(err) {
        res.json({success: false, message:"Toke Invalid"});
      }
        else{
            req.decoded = decoded;
            next();
        }
});

  }
  else{
    res.json({succes: false, message: "No Token Provided"});
  }

  });



  router.post('/me', function(req, res){
    res.send(req.decoded);

  });




 router.post('/gqr', function(req, res){
   console.log('inside gqr');
     var n = 10;
      console.log('number ' +n );

  User.findOne({username: puname}).exec(function(err, user){
    var curr_date = Date.now();
    var f_date = user.Expdate;
    var created = user.QRGenerated;
    var rem = user.QRRemain;
    console.log('current date ' +curr_date );
    console.log('fetched date '+f_date);
    console.log('qr remaining ' + rem );
    var t=10;
    if((curr_date>=f_date) && (rem>0)){

      for(var i = (created+1); i<=(created+t); i++){
        qr.saveSync('i', i+'.png'); 
        console.log(i);
      }
    created = created + 10;
    rem = rem-10;

///////////////////
 
   
User.findOneAndUpdate({username: puname}, {$set:{QRGenerated:created , QRRemain:rem }},function(err, doc){
    if(err){
        console.log("Something wrong when updating QRGenerated and QRRemain in DB!");
    }else{
      console.log("successfully generated a batch of 10 qrcodes");
    }

    
});

}else{
      console.log('u have generated 100 qrcodes');
    }

  });
  res.send('book added');
    
  });




   router.post('/pay', function(req, res){
    var rem1;
    var exp;
    User.findOne({username: puname}).exec(function(err, user){
    
    rem1 = user.QRRemain;
    exp = user.Expdate;
    exp = new Date(exp + 30*24*60*60000);

    console.log('remaning in pay ' + rem1 );
    rem1 = rem1 + 100; 
    console.log('remaning after payment is done ' + rem1 );


 User.findOneAndUpdate({username: puname}, {$set:{paid:'true', QRRemain:rem1, Expdate:exp}},function(err, doc){
    if(err){
        console.log("Something wrong when updating paid = true in DB!");
    }else{
      console.log("successfully updated paid = true");
    }
  });


    });
    
    /////////////////////////////////
   
////////////////    

  });
'/edit/:id'
//route for getting prodct details from qrcode scanner ID  
   router.get('/track/:id',function(req,res){

    var PID = req.params.id;
    console.log('fetched PID:  '+PID);
  });


//route for getting device details for trackschema 
router.post('/sc', function(req, res){


  var m;
  var la;
  var ln;
  var mip;
//   require('getmac').getMac(function(err,macAddress1){
//     if (err)  throw err
//     m = macAddress1;
//   console.log(m);
// });
 
// publicIp.v4().then(ip => {
// mip = ip;
// where.is(ip, function(err, result) {
//   if (result) {
//     la=result.get('lat');
//     ln=result.get('lng');
//     console.log(la+" "+ln);
//     console.log(mip);
//   }
// });

// });
if((la==null || la=='') && (ln==null || ln=='') && (m==null || m=='') && (mip==null || mip==''))
{
    console.log("check here "+la+" "+ln+" "+m+" "+mip);
    console.log('everything undefined');
     require('getmac').getMac(function(err,macAddress1){
      if (err)  throw err
      m = macAddress1;
       console.log(m);
      });
 
publicIp.v4().then(ip => {
mip = ip;
where.is(ip, function(err, result) {
  if (result) {
    la=result.get('lat');
    ln=result.get('lng');
    console.log(la+" "+ln);
    console.log(mip);
  }
});

});
}
else{

}
  // else{
  //   if((la!=null || la!='') && (ln!=null || ln!='') && (m!=null || m!='') && (mip!=null || mip!=''))
  // { 
    var track = new Track(); 
      track.PID    = '3';
      track.uname   = 'demo1' ;
      track.LoggedIn = new Date(Date.now());
      track.UserLat = la; 
      track.UserLong =  ln;
      track.DeviceId   =  m;
      track.DeviceGeo =  mip;
      track.save(function(err){
                 if(err){
        console.log("Something wrong when updating in DB!");
    }else{
      console.log("successfully updated");
    }
             });


 Track.findOneAndUpdate({PID: '3'}, {$set:{UserLat:la, UserLong:ln, DeviceId:m, DeviceGeo:mip }},function(err, doc){
    if(err){
        console.log("Something wrong when updating in DB!");
    }else{
      console.log("successfully updated");
    }
  });

    // }
    //   else{
    //     console.log('still undefined being fetched');
    //   }
// }

 
    


    

 
    
   });
    
    /////////////////////////////////
   
////////////////    

 
 



    return router;

}

