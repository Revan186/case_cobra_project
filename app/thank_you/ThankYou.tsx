'use client'

import { useQuery } from '@tanstack/react-query'
import { getPaymentStatus } from './actions'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import PhonePreview from '@/components/PhonePreview'
import { formatPrice } from '@/lib/utils'
import { db } from '@/db'
import { useEffect, useState } from 'react'
import { retrievedAmount, retrievedConf } from './retrievedStuff'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {Resend} from 'resend'
import OrderReceivedEmail from '@/components/OrderReceivedEmail'
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {kindeUser} from './actions'

const ThankYou = () => {
  const resend = new Resend(`${process.env.RESEND_API_KEY}`)
	const searchParams = useSearchParams()
	const orderId = searchParams.get('orderId') || ''
  const router = useRouter()

	const [conf, setConf] = useState({})
	const [amount, setAmount] = useState<number>()
  

 
  useEffect(()=>{

		//@ts-ignore
    const retrievedAmount = JSON.parse(sessionStorage.getItem('totalPrice'));
       
		//@ts-ignore
    const retrievedConf = JSON.parse(sessionStorage.getItem('configuration'));
      

    setAmount(retrievedAmount);
    setConf(retrievedConf)

    const sendThatFuckingEmail = async () => {
     
      const email = kindeUser()

    await resend.emails.send({
      from: 'CaseCobra <aragas1245@gmail.com>',
      to: email ,
      subject: 'Thanks for your order!',
      react: OrderReceivedEmail({
        orderId: 56738927464
       
        
      
      }),
    })

   
    }

    sendThatFuckingEmail()
    
  },[searchParams])

	const { color } = conf

  const done = () => {
   
    router.push('/')
  }




	return (
		<div className='bg-white'>
			<div className='mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8'>
				<div className='max-w-xl'>
					<p className='text-base font-medium text-primary'></p>
					<h1 className='mt-2 text-4xl font-bold tracking-tight sm:text-5xl'>
						Your case is on the way!
					</h1>
					<p className='mt-2 text-base text-zinc-500'>
						We've received your order and are now processing it.
					</p>

					<div className='mt-12 text-sm font-medium'>
						<p className='text-zinc-900'>Order number</p>
						<p className='mt-2 text-zinc-500'>658349285762542</p>
					</div>
				</div>

				<div className='mt-10 border-t border-zinc-200'>
					<div className='mt-10 flex flex-auto flex-col'>
						<h4 className='font-semibold text-zinc-900'>
							You made a great choice!
						</h4>
						<p className='mt-2 text-sm text-zinc-600'>
							We at CaseCobra believe that a phone case doesn't only need to
							look good, but also last you for the years to come. We offer a
							5-year print guarantee: If you case isn't of the highest quality,
							we'll replace it for free.
						</p>
					</div>
				</div>

				<div className='flex space-x-6 overflow-hidden mt-4 rounded-xl bg-gray-900/5 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl'>
					<PhonePreview
						croppedImageUrl={conf.croppedImageUrl!}
						color={color!}
					/>
				</div>

				<div>
					<div className='grid grid-cols-2 gap-x-6 border-t border-zinc-200 py-10 text-sm'>
						<div>
							<p className='font-medium text-zinc-900'>Payment status</p>
							<p className='mt-2 text-zinc-700'>Paid</p>
						</div>

						<div>
							<p className='font-medium text-zinc-900'>Shipping Method</p>
							<p className='mt-2 text-zinc-700'>
								DHL, takes up to 3 working days
							</p>
						</div>
					</div>
				</div>

				<div className='space-y-6 border-t border-zinc-200 pt-10 text-sm'>
					<div className='flex justify-between'>
						<p className='font-medium text-zinc-900'>Subtotal</p>
						<p className='text-zinc-700'>{formatPrice(amount / 100)}</p>
					</div>
					<div className='flex justify-between'>
						<p className='font-medium text-zinc-900'>Shipping</p>
						<p className='text-zinc-700'>{formatPrice(0)}</p>
					</div>
					<div className='flex justify-between'>
						<p className='font-medium text-zinc-900'>Total</p>
						<p className='text-zinc-700'>{formatPrice(amount / 100)}</p>
					</div>
          
         
         
				</div>

        <div className='mt-20 px-[31%]'> <Button className='px-12' onClick={()=>router.push('/')}>Return to the main page</Button></div>

			</div>
     
		</div>
	)
}

export default ThankYou
