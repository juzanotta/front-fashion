export default function Section1() {
    return (
        // <section className="h-130 w-full bg-[url('/background1.png')] bg-cover bg-center">
        //     {/* <h1 className="text-8xl text-[#E3D5B8] font-serif w-20 px-60 pt-75 leading-[.85]">Avenida <span className="text-[#D7A278] pl-15">Fashion</span></h1> */}
        //         <h1 className="text-8xl text-[#E3D5B8] font-serif w-20 px-60 pt-50 leading-[.85] start">Avenida</h1>
        //         <img src="./fashion.png" alt="" className="w-250 px-60" />
        // </section>
        <section className="bg-[#C33941] h-125 px-50 flex flex-col justify-center items-center">
            <img src="./avenida.png" alt="" className="w-50 "/>
            <img src="./fashion.png" alt="" className="w-150 "/>
        </section>
    )
}