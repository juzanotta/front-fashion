<div className="carousel carousel-center rounded-box max-w space-x-4 p-4"> 
<div className="carousel-item block" id="foto1"> 
<img src="./pants.jpg" className="rounded-box h-100" /> 
<p className="flex justify-center font-serif lowercase text-[#C33941] text-xl font-medium pt-1.5">calças</p> 
<div className="absolute left-18 right-18 top-215 flex -translate-y-1/2 transform justify-between"> 
<a href="#foto6" className="btn btn-ghost btn-circle text-[#C33941]">❮</a> 
<a href="#foto2" className="btn btn-ghost btn-circle text-[#C33941]">❯</a> 
</div> 
</div> 



import type { ClienteType } from '../utils/ClienteType'
import { create } from 'zustand'


type ClienteStore = {
    cliente: ClienteType
    logaCliente: (clienteLogado: ClienteType) => void
    deslogaCliente: () => void
}

export const useClienteStore = create<ClienteStore>((set) => ({
    cliente: {} as ClienteType,
    logaCliente: (clienteLogado: any) => set({cliente: clienteLogado}),
    deslogaCliente: () => set({cliente: {} as ClienteType})
}))