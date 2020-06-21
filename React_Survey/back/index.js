const express = require('express');
const app = express();
const port = 4000;
const bodyParser = require('body-parser');
const Survey = require('./model/survey');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_DB, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
	.catch(err => console.log(err));


	app.post('/', (req, res) => {
		const survey = new Survey({
			gender: req.body.gender,
			animal: req.body.animal
		})

		survey.save()
		.then(rr=>{
			console.log(rr)
			res.status(201).json(rr)})
})

app.get('/result', async(req,res) => {
	 const result = {
		mt: await Survey.countDocuments({gender:'male',animal:'tiger'}),
		ft: await Survey.countDocuments({gender:'female',animal:'tiger'}),
		me: await Survey.countDocuments({gender:'male',animal:'elephant'}),
		fe: await Survey.countDocuments({gender:'female',animal:'elephant'}),
		m: 	await Survey.countDocuments({gender:'male'}),
		f: 	await Survey.countDocuments({gender:'female'}),
		t: 	await Survey.countDocuments({animal:'tiger'}),
		e: 	await Survey.countDocuments({animal:'elephant'}),
		a:	await Survey.countDocuments({}),
	}
 res.json(result);
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`));