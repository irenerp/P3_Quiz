const Sequelize = require('sequelize');
const sequelize = new Sequelize ("sqlite:quizzes.sqlite", {logging: false});

sequelize.define ('quiz', {
	question: {
		type: Sequelize.STRING,
		unique: {msg: "Ya existe esta pregunta"},
		validate: {notEmpty: {msg: "La pregunta no puede estar vacia"}}
	},
	answer:{
		type: Sequelize.STRING,
		validate: {notEmpty: {msg: "La pregunta no puede estar vacia"}}
	}
});

sequelize.sync()
.then(() => sequelize.models.quiz.count()) //promesa que cuenta las preguntas
.then(count => {
	if(!count){
		return sequelize.models.quiz.bulkCreate([ 
			{question: "Capital de Italia", answer: "Roma"},
			{question: "Capital de Francia", answer: "Paris"},
			{question: "Capital de España", answer: "Madrid"},
			{question: "Capital de Portugal", answer: "Lisboa"}
		]);
	}
})

.catch(error =>{
	console.log(error);
});

module.exports = sequelize;