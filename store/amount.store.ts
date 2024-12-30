import {create} from 'zustand';

interface amountStoreInterface {
	amount: number ;
	setAmount: ()=>void
}

const useAmountStore = create<amountStoreInterface>((set) => ({
	amount: 1,
	setAmount: () => set((state)=>({amount: state.amount}))
}))



export default useAmountStore