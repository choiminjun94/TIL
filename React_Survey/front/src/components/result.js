import React, { useEffect, useState } from 'react';
import Axios from 'axios';


const Result = () => {

	const [result, setResult] = useState({});


	useEffect(() => {
		Axios.get('/result')
		.then(res => {
				setResult(res.data);
			})
	},[])


	return(
		<div>			
			<table>
				<thead>
					<tr>
						<th><span>😎</span></th>
						<th>호랑이</th>
						<th>코끼리</th>
						<th>합계</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>남자</td>
						<td>{result.mt}</td>
						<td>{result.me}</td>
						<td>{result.m}</td>
					</tr>
					<tr>
						<td >여자</td>
						<td >{result.ft}</td>
						<td >{result.fe}</td>
						<td >{result.f}</td>
					</tr>
					<tr>
						<td >합계</td>
						<td >{result.t}</td>
						<td >{result.e}</td>
						<td >{result.a}</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}


export default Result;
