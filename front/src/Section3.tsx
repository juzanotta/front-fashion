import CardPeca from "./components/CardPeca";

export default function Section3() {
    return (
        <section className="px-30 py-10 bg-[#E3D5B8]">
            <h1 className="font-serif text-[#C33941] text-6xl w-30 flex justify-end">new in</h1>

            

            <div className="card bg-[#E3D5B8] border border-[#C33941] w-90 shadow-[#C33941] my-5 ">
                <figure className="px-5 pt-5">
                    <img
                        src="./minerva.jpg"
                        alt="minerva"
                        className="rounded-xl" />
                </figure>

                <div className="px-7 py-4 start">
                    <h2 className="card-title font-sans font-extrabold text-2xl text-[#C33941]">Minerva</h2>
                    <p className="font-sans">Mimizinha mto linda da sua mamãe e mto amada</p>
                    <div className="card-actions justify-between">
                        <div className="btn btn-circle bg-[#E3D5B8] border-[#E3D5B8] text-[#C33941] hover:bg-[#C33941] hover:text-[#E3D5B8]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg>
                        </div>
                        <div className="">
                            <div className="badge badge-outline mr-2 text-[#C33941]">Fashion</div>
                            <div className="badge badge-outline text-[#C33941]">Products</div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}