import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';

import { AiOutlineEye } from 'react-icons/ai';

export function login() {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	// async function login(){
	//     console.warn(email , password)
	//     let item={email,password};
	//     let result = await fetch("",{
	//         method:''
	//     })
	// }

	const [icon, setIcon] = useState(<AiOutlineEye />);

	// function myFunction() {
	// 	let x = document.getElementById('myInput');
	// 	if (x.type === 'password') {
	// 		x.type = 'text';
	// 		setIcon(<AiOutlineEye />);
	// 	} else {
	// 		x.type = 'password';
	// 		setIcon(<AiOutlineEyeInvisible />);
	// 	}
	// }

	return (
		<>
			<div className="bg-[url('/images/bg.png')]  bg-no-repeat bg-cover bg-center h-screen ">
				<div className="flex justify-end h-full items-center p-28">
					<div className="flex flex-col bg-white  shadow-lg shadow-black  solid p-10 rounded-xl ">
						<h1 className="text-center font-semibold text-4xl">Sign In</h1>

						<input
							type="email"
							className="border-2 rounded-lg w-[320px] p-3 outline-none mt-10"
							placeholder="email"
							onChange={(e) => setEmail(e.target.value)}
						/>

						<div className="flex justify-between items-center border-2  rounded-lg w-[320px] p-3 outline-none mt-10">
							<input
								type="Password"
								id="myInput"
								className="outline-none"
								placeholder="Password"
								onChange={(e) => setPassword(e.target.value)}
							/>
							{/* <div onClick={myFunction} className="cursor-pointer">
								{icon}
							</div> */}
						</div>
						<button
							type="submit"
							className="border p-3 rounded-lg font-semibold w-32 mt-10 mx-auto active:bg-[#0c0e85] bg-[#72B8BF] text-white "
							onClick={login}
						>
							LOG IN
						</button>
						<img
							src="/images/ers-logo.png"
							className="mt-10 mx-auto "
							height={200}
							width={200}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
