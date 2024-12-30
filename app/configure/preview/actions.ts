'use server'

import { BASE_PRICE, PRODUCT_PRICES } from '@/config/products'
import { db } from '@/db'
import { createPayment } from '@/lib/create-payment'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { Order } from '@prisma/client'
import axios from 'axios'

export const createCheckoutSession = async ({configId}: {configId:string}) => {
	const configuration = await db.configuration.findUnique({
		where: {id:configId}
	})

	if(!configuration){
		console.log('sussy')
	}

	if(configuration){
		console.log(configuration.id)
	}

	const {getUser} = getKindeServerSession()
	const user = await getUser()

	console.log(user.id)

	if(!user){
		throw new Error('You need to be logged in')
	}

	const {finish, material} = configuration

	let price = BASE_PRICE
  if (finish === 'textured') price += PRODUCT_PRICES.finish.textured
  if (material === 'polycarbonate')
    price += PRODUCT_PRICES.material.polycarbonate

	let order: Order | undefined = undefined

	const existingOrder = await db.order.findFirst(
		{
			where: {
				userId: user.id,
				configurationId: configuration!.id
			},
		}
	)

	//if(!existingOrder){
		//console.log('fuck uou')
	//}

	if(existingOrder){
		order = existingOrder
		console.log('ex order is here')
	} else {
		order = await db.order.create({
			data: {
				amount: price/100,
				userId: user.id,
				configurationId: configuration!.id
			}
		})
	}

	

	const paymentData = await createPayment({
		amount: order.amount * 100,
		orderId: order.id,
		description: 'Payment for order #' + order.id,
	});

	console.log(paymentData)

	if (!paymentData) {
		throw new Error('Payment data not found');
	}

	await db.order.update({
		where: {
			id: order.id,
		},
		data: {
			paymentId: paymentData.id,
		},
	});

	const url = paymentData.confirmation.confirmation_url ;
 
	return url;
	
	

}