import { db } from '@/db'

import { NextRequest, NextResponse } from 'next/server'


export async function POST(req: NextRequest){
	try {
		const body = await req.json() ;

		const order = await db.order.findFirst({
			where: {
				id: body.object.metadata.order_id
			},
		})

		if (!order){
			return NextResponse.json({
				error: "Order not found"
			})
		}

		const isSucceeded = body.object.status ==='succeeded'

		await db.order.update({
			where: {
				id: order.id,
			},

			data: {
				isPaid: true,
			}
		})



	} catch (error) {
		console.log('Checkout callback error', error)
		return NextResponse.json({error: 'Server error'})
	}
}