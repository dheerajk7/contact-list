const express = require('express');
const path = require('path');       //path module for path
const port = 8000;
// const db = require('./config/mongoose');
const Contact = require('./model/contact');

var app = express();
app.set('view engine','ejs');           //setting template engine in view engine property of app
app.set('views',path.join(__dirname, 'views'));     //setting directory in views property of app
app.use(express.urlencoded());            //parser to parse data from form in body property of request
app.use(express.static('assets'));         //using static file with help of middleware


//middleware are used to process request or reponse between view and controller
//It has three things
//request, response, next
//next is used to call next middleware and no middleware is there it will go to controller
/*middleware created by us
app.use(function(request,response,next)
{
    request.body.isAdmin = true;            //adding new attribute using middleware
    console.log("MiddleWare1 called");
    next();             //for accessing next middleware and controller
});

app.use(function(request,response,next)
{
    console.log(request.body.isAdmin);
    console.log("Middleware2 called");
    next();             //goes to controller now as no middleware present now
});
*/

/* contact list array when DB is not there
var contactList = [
    {
        name : "Dheerraj Kushwah",
        phone: "1232302434",
    },
    {
        name:"Ravi",
        phone:"12323324234",
    },
    {
        name:"Shivam",
        phone:"2343423432",
    }
];
*/

app.get('/',function(request,response)
{
    /*sending using contact list array
    return response.render('home',{
        title : "My contact list home",
        contact_list : contactList,
    });*/

    //sending using DB
    Contact.find({},function(err,contactList)           //second parameter contains array of object filtered
        {
            if(err)
            {
                console.log("Error in printing contact");
                return;
            }

            return response.render('home',{
                title:"My contact list",
                contact_list : contactList,
            });

        });
});


app.get('/practice',function(request,response)
{
    return response.render('practice',{
        title:"Practice Section!",
        condition : false,
    });
});

app.post('/create-contact',function(request,response)
{
    console.log(request.body);
    /* adding contact in contact list variable
    contactList.push(
        {
            name:request.body.name,
            phone:request.body.phone,
            isAdmin : request.body.isAdmin,
        }
    );*/

    //adding in DB
    Contact.create({
        name : request.body.name,
        phone : request.body.phone, 
    }, function(err, newContact)                //second variable contains the contact we have created
    {
        if(err)
        {
            console.log("Error in creating contact");
            return;
        }

        console.log("Contact created with: ",newContact);
        return response.redirect('/');
    });

    //we can directly do that contactList.push(request.body);
    // return response.redirect('back');      use when using contact list array      //back for going back to same page where we have come here
});

app.get('/delete-contact-query',function(request,response)
{
    /*deleting using array
    console.log(request.query.phone,request.query.name);
    for(let i=0;i<contactList.length;i++)
    {
        if(contactList[i].phone == request.query.phone)
        {
            contactList.splice(i,1);
            break;
        }
    }
    return response.redirect('/'); */

    //deleting from DB
    let id = request.query.id;
    Contact.findByIdAndDelete(id,function(err)
    {
        if(err)
        {
            console.log("Error in deleting contact using query string");
            return;
        }
        return response.redirect('back');
    });
});

app.get('/delete-contact-params/:phone/:name/:id', function(request,response)
{
    /* deleting from array
    console.log(request.params.phone, request.params.name);
    for(let i=0;i<contactList.length;i++)
    {
        if(contactList[i].phone == request.params.phone)
        {
            contactList.splice(i,1);
            break;
        }
    }
    return response.redirect('/');*/

    //deleting from DB

    let id = request.params.id;
    Contact.deleteOne({"_id":id},function(err)
    {
        if(err)
        {
            console.log("Error in deleting contact using params");
            return;
        }

        return response.redirect('back');
    });
});


app.listen(port,function(err)
{
    if(err)
    {
        console.log("Error", err);
        return;
    }
    console.log("My express server is running on port: ",port);

})