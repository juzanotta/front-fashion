export default function Section2() {
    return (
        // <section id="categorias" className="px-30 py-10 bg-[#E3D5B8]">
        <section id="categorias" className="h-145 w-full bg-[url('/background2.png')] bg-cover bg-center px-30 py-10">
            <h1 className="font-serif uppercase text-3xl text-[#C33941] flex justify-center pb-3">categorias</h1>

            <div className="carousel carousel-center rounded-box max-w space-x-4 p-4">
                <div className="carousel-item block">
                    <img
                        src="./pants.jpg"
                        className="rounded-box h-100" />
                    <p className="flex justify-center font-serif lowercase text-[#C33941] text-xl font-medium pt-1.5">calças</p>
                </div>

                <div className="carousel-item block">
                    <img
                        src="./blouse.jpg"
                        className="rounded-box h-100" />
                    <p className="flex justify-center font-serif lowercase text-[#C33941] text-xl font-medium pt-1.5">blusas</p>
                </div>

                <div className="carousel-item block">
                    <img
                        src="./dress.jpg"
                        className="rounded-box h-100" />
                    <p className="flex justify-center font-serif lowercase text-[#C33941] text-xl font-medium pt-1.5">vestidos</p>
                </div>

                <div className="carousel-item block">
                    <img
                        src="./purse.jpg"
                        className="rounded-box h-100" />
                    <p className="flex justify-center font-serif lowercase text-[#C33941] text-xl font-medium pt-1.5">bolsas</p>
                </div>

                <div className="carousel-item block">
                    <img
                        src="./skirt.jpg"
                        className="rounded-box h-100" />
                    <p className="flex justify-center font-serif lowercase text-[#C33941] text-xl font-medium pt-1.5">saias</p>
                </div>

                <div className="carousel-item block">
                    <img
                        src="./shoes.jpg"
                        className="rounded-box h-100" />
                    <p className="flex justify-center font-serif lowercase text-[#C33941] text-xl font-medium pt-1.5">sapatos</p>
                </div>
                
            </div>


            <div className="carousel w-full">
                <div id="slide1" className="carousel-item relative w-full">
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"
                        className="w-full" />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide4" className="btn btn-circle">❮</a>
                        <a href="#slide2" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide2" className="carousel-item relative w-full">
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp"
                        className="w-full" />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide1" className="btn btn-circle">❮</a>
                        <a href="#slide3" className="btn btn-circle">❯</a>
                    </div>
                </div>
            </div>
        </section>
    )
}