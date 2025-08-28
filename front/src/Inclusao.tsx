export default function Inclusao() {
    return (
        <div className="bg-[#E3D5B8] h-screen px-30 py-10 flex">

            <h1 className="font-serif text-[#C33941] text-5xl w-30 ">novo produto</h1>

            <form className="max-w-md mx-auto py-10">


                <div className="relative z-0 w-full mb-5 group">
                    <select id="pecas" defaultValue="" required className="block py-2.5 px-0 w-full text-sm text-[#C33941] bg-transparent border-0 border-b-2 border-[#C33941] appearance-none dark:text-white dark:border-[#C33941] dark:focus:border-[#C33941] focus:outline-none focus:ring-0 focus:border-[#D7A278] peer font-medium" >
                        <option value="" disabled hidden></option>
                        <option value="calca" className="bg-[#D7A278] font-medium">Calça</option>
                        <option value="blusa" className="bg-[#D7A278] font-medium">Blusa</option>
                        <option value="acessorio" className="bg-[#D7A278] font-medium">Acessório</option>
                        <option value="saia" className="bg-[#D7A278] font-medium">Saia</option>
                        <option value="vestido" className="bg-[#D7A278] font-medium">Vestido</option>
                        <option value="bolsa" className="bg-[#D7A278] font-medium">Bolsa</option>
                        <option value="sapato" className="bg-[#D7A278] font-medium">Sapato</option>
                    </select>

                    <label
                        htmlFor="pecas"
                        className="peer-focus:font-medium absolute text-sm text-[#C33941] dark:text-[#C33941] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#D7A278] peer-focus:dark:text-[#C33941] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Tipo da peça
                    </label>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" id="cor" className="block py-2.5 px-0 w-full text-sm text-[#C33941] bg-transparent border-0 border-b-2 border-[#C33941] appearance-none dark:text-[#C33941] dark:border-[#C33941] dark:focus:border-[#D7A278] focus:outline-none focus:ring-0 focus:border-[#D7A278] peer font-medium" placeholder=" " required />
                    <label htmlFor="" className="peer-focus:font-medium absolute text-sm text-[#C33941] dark:text-[#C33941] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#D7A278] peer-focus:dark:text-[#C33941] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Cor da peça</label>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" id="marca" className="block py-2.5 px-0 w-full text-sm text-[#C33941] bg-transparent border-0 border-b-2 border-[#C33941] appearance-none dark:text-white dark:border-[#C33941] dark:focus:border-[#C33941] focus:outline-none focus:ring-0 focus:border-[#D7A278] peer font-medium" placeholder=" " required />
                    <label htmlFor="" className="peer-focus:font-medium absolute text-sm text-[#C33941] dark:text-[#C33941] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#D7A278] peer-focus:dark:text-[#C33941] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Marca</label>
                </div>

                <div className="grid md:grid-cols-2 md:gap-6">

                    <div className="relative z-0 w-full mb-5 group">
                        <select id="pecas" defaultValue="" required className="block py-2.5 px-0 w-full text-sm text-[#C33941] bg-transparent border-0 border-b-2 border-[#C33941] appearance-none dark:text-white dark:border-[#C33941] dark:focus:border-[#C33941] focus:outline-none focus:ring-0 focus:border-[#D7A278] peer font-medium" >
                            <option value="" disabled hidden></option>
                            <option value="pp" className="bg-[#D7A278] font-medium">PP</option>
                            <option value="p" className="bg-[#D7A278] font-medium">P</option>
                            <option value="m" className="bg-[#D7A278] font-medium">M</option>
                            <option value="g" className="bg-[#D7A278] font-medium">G</option>
                            <option value="gg" className="bg-[#D7A278] font-medium">GG</option>
                            <option value="g1" className="bg-[#D7A278] font-medium">XG</option>
                        </select>
                        <label htmlFor="pecas" className="peer-focus:font-medium absolute text-sm text-[#C33941] dark:text-[#C33941] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#D7A278] peer-focus:dark:text-[#C33941] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tamanho</label>
                    </div>


                    <div className="relative z-0 w-full mb-5 group">
                        <input type="number" id="valor" className="block py-2.5 px-0 w-full text-sm text-[#C33941] bg-transparent border-0 border-b-2 border-[#C33941] appearance-none dark:text-white dark:border-[#C33941] dark:focus:border-[#C33941] focus:outline-none focus:ring-0 focus:border-[#D7A278] peer font-medium" placeholder=" " required />
                        <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-[#C33941] dark:text-[#C33941] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#D7A278] peer-focus:dark:text-[#C33941] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Valor</label>
                    </div>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" id="foto" className="block py-2.5 px-0 w-full text-sm text-[#C33941] bg-transparent border-0 border-b-2 border-[#C33941] appearance-none dark:text-white dark:border-[#C33941] dark:focus:border-[#C33941] focus:outline-none focus:ring-0 focus:border-[#D7A278] peer font-medium" placeholder=" " required />
                    <label htmlFor="" className="peer-focus:font-medium absolute text-sm text-[#C33941] dark:text-[#C33941] duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#D7A278] peer-focus:dark:text-[#C33941] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Foto (URL)</label>
                </div>

                <button type="submit" className="text-[#C33941] bg-[#D7A278] hover:bg-[#C33941] hover:text-[#D7A278] border focus:ring-4 focus:outline-none focus:ring-[#D7A278] font-medium rounded-lg text-m w-full sm:w-auto px-7 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Enviar</button>
            </form>

            <div className="w-27"></div>


        </div>
    )
}