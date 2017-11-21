var User = require('../models/user');
var  prod = require('../models/prod'); 
var  Track = require('../models/track'); 
//var Machine = require('../models/machine');
var jwt   = require('jsonwebtoken');
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
 // var m;
 //  var la;
 //  var ln;
 //  var mip;


    var mc;
         var mipp;
         var lang;
         var long;


 require('getmac').getMac(function(err,macAddress1){
             if (err)  throw err
              mc = macAddress1;
            });
 
          publicIp.v4().then(ip => {
          mipp = ip;
          where.is(ip, function(err, result) {
            if (result) {
              lang=result.get('lat');
              long=result.get('lng');
              }
          });
        });

console.log(mipp+" "+ lang);

 router.post('/register', function(req, res) {
        var user = new User(); 
        user.email    = req.body.email;
    user.password   = req.body.pass;
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
    if((curr_date<=f_date) && (rem>0)){

      for(var i = (created+1); i<=(created+t); i++){
        qr.saveSync('i', i+'.png'); 
        console.log(i);
      }
    created = created + 10;
    rem = rem-10;

///////////////////
 
   
User.findOneAndUpdate({username: puname}, {$set:{QRGenerated:created , QRRemain:rem }},function(err, doc){
  if(err) throw err;
    if(err){
      res.json({success: false, message: "Something wrong when updating QRGenerated and QRRemain in DB"});
        console.log("Something wrong when updating QRGenerated and QRRemain in DB!");
    }else{
       res.json({success: true, message: "successfully generated a batch of 10 qrcodes"});
      console.log("successfully generated a batch of 10 qrcodes");
    }

    
});

}else{
   res.json({success: false, message: "u have generated 100 qrcodes"});
      console.log('u have generated 100 qrcodes');
    }

  });

    
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
   if(err) throw err;
    if(err){
      res.json({success: false, message: "Something wrong when updating paid = true in DB!"});
        console.log("Something wrong when updating QRGenerated and QRRemain in DB!");
    }else{
       res.json({success: true, message: "successfully updated paid = true"});
      console.log("successfully generated a batch of 10 qrcodes");
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


 router.post('/sc', function(req, res) {
      var track = new Track(); 
      track.PID    = '7';
      track.uname   = 'demo13' ;
      track.LoggedIn = new Date(Date.now());
      track.UserLat = lang; 
      track.UserLong =  long;
      track.DeviceId   = mc ;
      track.DeviceGeo = mipp ;


            // Save new user to database
        track.save(function(err){
            if(err){
               res.json({success: false, message:"Data not fetched"});
                 console.log('error');
                        } 
                         else{
              res.json({success: true , message:'Fetched The data '});
                console.log('saved');
            }
        });
   // }
    
    });


   router.get('/tc', function(req, res) {
    var Parent="PA123";
    prod.aggregate([ { 
  $lookup: {
    from: "package", localField: Parent, foreignField:"PA123", as: "pac"} 
  },
  {
        $unwind: "$pac"
    },
    {
    $lookup: {
    from: "palatte", localField: "pac.Parent", foreignField:"PalID", as: "pal"} 
  },
  {
        $unwind: "$pal"
    },
    {
    $lookup: {
    from: "container", localField: "pal.Parent", foreignField:"CID", as: "con"} 
  },
   {
        $unwind: "$con"
    }


  ]).exec(function(err, book) {
            if (err) {
                res.send(err); 
            } else {
              res.send(book);
              //console.log(book[0].docs[0]["bookTitle"]);
            }
        });
    });


    //      prod.aggregate([ { $lookup: {from: "package", localField: "Parent", foreignField:"PacID", as: "pac"} }]).exec(function(err, book) {
    //         if (err) {
    //             res.send(err); 
    //         } else {
    //           res.send(book);
    //           //console.log(book[0].docs[0]["bookTitle"]);
    //         }
    //     });
    // });

   

 // prod.aggregate([ { $lookup: {from: "package", localField: "Parent", foreignField:"PacID", as: "pac"}},
 //    {
 //        $unwind: "$pac"
 //    },
 //    {
 //        $lookup: {
 //            from: "palatte",
 //            localField: "pac.Parent",
 //            foreignField: "PalID",
 //            as: "pal"
 //        }
 //    },
 //    {
 //        $unwind: "$pal"
 //    },
 //    {
 //        $lookup: {
 //            from: "container",
 //            localField: "pal.Parent",
 //            foreignField: "CID",
 //            as: "con"
 //        }
 //    } ]).exec(function(err, book) {
 //            if (err) {
 //                res.send(err); 
 //            } else {
 //              res.send(book);
 //              //console.log(book[0].docs[0]["bookTitle"]);
 //            }
        


        // });




//     Product.aggregate([{
//         $lookup: {
//            from: "package",
//            localField: "Parent",
//            foreignField: "PacID",
//            as: "pac"}
//     },
//     {
//         $unwind: "$pac"
//     },
//     {
//         $lookup: {
//             from: "palatte",
//             localField: "pac.Parent",
//             foreignField: "PalID",
//             as: "pal"
//         }
//     },
//     {
//         $unwind: "$pal"
//     },
//     {
//         $lookup: {
//             from: "container",
//             localField: "pal.Parent",
//             foreignField: "CID",
//             as: "con"
//         }
//     },
//     {
//         $unwind: "$pal"
//     }
// ]).exec(function(err, book) {
//             if (err) {
//                 res.send(err); 
//             } else {
//               res.send(book);
//               //console.log(book[0].docs[0]["bookTitle"]);
//             }
//         });
    // });



    //    prod.aggregate([ { $lookup: {from: "books", localField: "bookISBN", foreignField:"ISBN", as: "docs"} }]).exec(function(err, book) {
    //         if (err) {
    //             res.send(err); 
    //         } else {
    //           res.send(book);
    //           //console.log(book[0].docs[0]["bookTitle"]);
    //         }
    //     });
    // });


    return router;

}

