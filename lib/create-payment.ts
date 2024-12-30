import axios from 'axios'

export async function createPayment(details:any){
	const {data} = await axios.post(
		'https://api.yookassa.ru/v3/payments',
		{
			amount: {
				value: details.amount,
				currency: 'RUB',
			},
			capture: true,
			description: details.description,
			metadata: {
				order_id: details.orderId
			},
			confirmation: {  
				type: 'redirect',
				return_url: process.env.YOOKASSA_CALLBACK_URL,
			},
		},

		{
			auth: {
				//username: process.env.YOOKASSA_API_KEY as string,
				//password: '',
				username: process.env.YOOKASSA_STORE_ID as string,
				password: process.env.YOOKASSA_API_KEY as string,
			},

			headers: {
				'Idempotence-Key': Math.random().toString(36).substring(7),
				'Content-Type' : 'application/json',
			}
		})

	return data;
}


