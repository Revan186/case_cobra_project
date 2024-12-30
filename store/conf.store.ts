import {create} from 'zustand';

interface confStoreInterface {
	conf: object ;
	setConf: ()=>void
}

const useConfStore = create<confStoreInterface>((set) => ({
	conf: {},
	setConf: () => set((state)=>({conf: state.conf}))
}))



export default useConfStore