var bodyParser =require('body-parser');
var mongoose=require('mongoose');
//connect to the database

mongoose.connect('mongodb://test:test@ds157097.mlab.com:57097/todo');


//create a schema -this is like a blueprint
var todoSchema =new mongoose.Schema({
	item: String
});

//createa model type of todo
var Todo= mongoose.model('Todo',todoSchema);


//var data=[{item:'get milk'},{item:'walk dog'},{item:'kick some coading ass'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});


module.exports= function(app){

	 app.get('/',function(req,res){
		 //get data from mongodb and pass it to the view
		 Todo.find({},function(err,data){
			 if(err)throw err;
			 res.render('todo',{todos:data});
		 });

	 });
	 app.post('/',urlencodedParser,function(req,res){
		 //get data from the view and add it to mongodb var
		 var newTodo=Todo(req.body).save(function(err,data){
			if(err)throw err;
            res.json(data);
		 })

	 });
	 app.delete('/:item',function(req,res){
		 //delete the requested item from mongodb
		 Todo.find({item:req.params.item.replace(/\-/g," ")}).remove(function(err,data){
			 if(err)throw err;
			 res.json(data);
		 })

	 });

};
