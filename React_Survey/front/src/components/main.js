import React from 'react';
import Axios from 'axios';
import { useState } from 'react';


const Main = () => {

	const [gender, setGender ] = useState('');
	const [animal, setAnimal ] = useState('');

	const setGenderHandler = e => {
		setGender(e.target.value);
	}

	const setAnimalHandler = e => {
		setAnimal(e.target.value);
	}

	const onSubmitResult = (e) => {
		e.preventDefault();

		let body = {
			gender,
			animal
		}
		
		if(body.gender === '' || body.animal === ''){
			alert('다시 고르세요');
		}	else {
			Axios.post('/', body)
			alert('설문해주셔서 감사합니다.')
		}
	
	}

	return (
		<div>
			<h1>Survey</h1>
			<form onSubmit={onSubmitResult}>
				<h2>성별을 고르세요</h2>
				<label><input type="radio" value="male" name="gender" onChange={setGenderHandler}/>남자</label>
				<label><input type="radio" value="female" name="gender" onChange={setGenderHandler}/>여자</label>
				<br/>
				<h2>동물을 고르세요</h2>
				<label><input type="radio" value="tiger" name="animal" onChange={setAnimalHandler}/>호랑이</label>
				<label><input type="radio" value="elephant" name="animal" onChange={setAnimalHandler}/>코끼리</label>
				<br/><br/>
				<button>제출</button>
			</form>
		</div>
	);
};

export default Main;