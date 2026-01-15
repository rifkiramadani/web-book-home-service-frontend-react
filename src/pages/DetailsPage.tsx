import React, { useEffect, useState } from "react"
import type { CartItem, HomeService } from "../types/type"
import { useParams } from "react-router-dom";
import apiClient from "../services/apiServices";
import { Swiper, SwiperSlide } from 'swiper/react'

const DetailsPage = () => {

    //fungsi untuk mengambil slug dari params
    const { slug } = useParams<{ slug: string }>();

    const [service, setService] = useState<HomeService | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    //use state untuk menyimpan data cart atau data keranjang
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isAdding, setIsAdding] = useState(false); //use state untuk loading saat menambahkan keranjang

    //use effect ambil item cart dari localstorage (jalankan useEffect ketika cart di ambil dari localstorage)
    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            setCart(JSON.parse(savedCart)); //isi set cart dengan variabel savedCart yang telah di parse manjadi JSON
        }
    }, []);

    //use effect untuk fetch details data berdasarkan slug yang di ambil dari params
    useEffect(() => {
        apiClient
            .get(`/homeService/${slug}`)
            .then((response) => {
                setService(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error)
                setLoading(false);
            });
    }, [slug]); //jalankan ulang use effect ketika slug berubah

    // FORMAT RUPIAH
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
        }).format(value);
    }

    //fungsi untuk menghandle ketika tombol add to cart di tekan
    const handleAddToCart = () => {
        //jika service yang di pilih ada
        if (service) {
            //maka set loading adding menjadi true
            setIsAdding(true);
            //dan cek untuk item yang sudah ada dicart tidak bisa di pilih lagi (item yang di cart sama dengan service yang dipilih)
            const itemExists = cart.find((item) => item.home_service_id === service.id);
            //jika item nya sudah ada di cart
            if (itemExists) {
                //maka munculkan alert 
                alert("Jasa Sudah tersedia di cart");
                //dan set loading adding menjadi false
                setIsAdding(false);
                //jika item nya belum ada di cart
            } else {
                //maka buat variable untuk mengisi item pada cart berdasarkan type yang telah di buat
                const newCartItem: CartItem = {
                    home_service_id: service.id,
                    slug: service.slug,
                    quantity: 1,
                }

                // setelah itu buat variable updatedCart yang berisikan spread operator (item cart yang lama tambahkan item cart yang baru dengan variable newCartItem diatas)
                const updatedCart = [...cart, newCartItem];
                //setelah itu isi setCart dengan variable updatedCart tersebut
                setCart(updatedCart);

                //setelah itu simpan item cart tadi ke local storage dan format menjadi string
                localStorage.setItem("cart", JSON.stringify(updatedCart));

                //tampilkan alert
                alert("Jasa Berhasil ditambahkan ke cart");
                // dan set loading adding menjadi false
                setIsAdding(false);
            }
        }
    }


    if (loading) {
        return <p className="flex justify-center !mt-100">Loading...</p>
    }

    if (error) {
        return <p className="flex justify-center !mt-100">Error Loading: {error}</p>
    }

    if (!service) {
        return <p className="flex justify-center !mt-100">Service Not Found</p>
    }

    const BASE_URL = import.meta.env.VITE_REACT_API_STORAGE_URL;

    return (
        <div>
            <main key={service.id} className="relative mx-auto w-full max-w-[640px] overflow-x-hidden bg-white pb-[144px]">
                <div id="Background" className="absolute left-0 right-0 top-0 h-[228px]">
                    <img
                        src="/assets/images/backgrounds/orange-service-details.png"
                        alt="image"
                    />
                </div>
                <section
                    id="NavTop"
                    className="fixed left-0 right-0 top-[16px] z-30 transition-all duration-300"
                >
                    <div className="relative mx-auto max-w-[640px] px-5">
                        <div
                            id="ContainerNav"
                            className="flex items-center justify-between py-[14px] transition-all duration-300"
                        >
                            <a href="category.html">
                                <div
                                    id="Back"
                                    className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-white"
                                >
                                    <img
                                        src="/assets/images/icons/back.svg"
                                        alt="icon"
                                        className="h-[22px] w-[22px] shrink-0"
                                    />
                                </div>
                            </a>
                            <h2
                                id="Title"
                                className="font-semibold text-white transition-all duration-300"
                            >
                                Details
                            </h2>
                            <a href="#">
                                <div
                                    id="Cart"
                                    className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-white"
                                >
                                    <img
                                        src="/assets/images/icons/cart.svg"
                                        alt="icon"
                                        className="h-[22px] w-[22px] shrink-0"
                                    />
                                </div>
                            </a>
                        </div>
                    </div>
                </section>
                <header className="mt-[100px] px-5">
                    <div className="relative flex w-full items-center justify-center overflow-hidden rounded-[40px]">
                        <img
                            src={`${BASE_URL}/${service.thumbnail}`}
                            alt="image"
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute right-5 top-5 flex shrink-0 items-center gap-[2px] rounded-full bg-white px-[8px] py-[7px]">
                            <img
                                src="/assets/images/icons/star-service-details.svg"
                                alt="icon"
                                className="h-[22px] w-[22px] shrink-0"
                            />
                            <p className="font-semibold">4.8</p>
                        </div>
                        {service.is_popular ? (
                            <div className="absolute bottom-5 left-[20.5px] flex shrink-0 items-center gap-[2px] rounded-full bg-white px-[8px] py-[7px]">
                                <img
                                    src="/assets/images/icons/star-service-details.svg"
                                    alt="icon"
                                    className="h-[22px] w-[22px] shrink-0"
                                />
                                <p className="font-semibold">Popular</p>
                            </div>
                        ) : ''}

                    </div>
                    <h1 className="mt-5 text-2xl font-bold leading-[36px]">
                        {service.name}
                    </h1>
                </header>
                <section
                    id="ServiceDetails"
                    className="mt-5 grid grid-cols-2 gap-[14px] px-5"
                >
                    <div className="flex items-center gap-[10px] rounded-[20px] bg-[#F4F5F7] px-[14px] py-[14px]">
                        <img
                            src="/assets/images/icons/clock-service-details.svg"
                            alt="icon"
                            className="h-[32px] w-[32px] shrink-0"
                        />
                        <div>
                            <strong className="text-sm font-semibold leading-[21px]">
                                {service.duration} Hours
                            </strong>
                            <p className="text-sm leading-[21px] text-shujia-gray">Duration</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-[10px] rounded-[20px] bg-[#F4F5F7] px-[14px] py-[14px]">
                        <img
                            src="/assets/images/icons/note-service-details.svg"
                            alt="icon"
                            className="h-[32px] w-[32px] shrink-0"
                        />
                        <div>
                            <strong className="text-sm font-semibold leading-[21px]">
                                Top Service
                            </strong>
                            <p className="text-sm leading-[21px] text-shujia-gray">Guarantee</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-[10px] rounded-[20px] bg-[#F4F5F7] px-[14px] py-[14px]">
                        <img
                            src="/assets/images/icons/calender-service-details.svg"
                            alt="icon"
                            className="h-[32px] w-[32px] shrink-0"
                        />
                        <div>
                            <strong className="text-sm font-semibold leading-[21px]">
                                {service.category.name}
                            </strong>
                            <p className="text-sm leading-[21px] text-shujia-gray">Category</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-[10px] rounded-[20px] bg-[#F4F5F7] px-[14px] py-[14px]">
                        <img
                            src="/assets/images/icons/clock-service-details.svg"
                            alt="icon"
                            className="h-[32px] w-[32px] shrink-0"
                        />
                        <div>
                            <strong className="text-sm font-semibold leading-[21px]">
                                Free Tools
                            </strong>
                            <p className="text-sm leading-[21px] text-shujia-gray">SNI Level</p>
                        </div>
                    </div>
                </section>
                <section id="ServiceDescription" className="mt-5 px-5">
                    <h3 className="font-semibold">Details</h3>
                    <p className="leading-7">
                        {service.about}
                    </p>
                </section>
                <section id="ServiceBenefits" className="mt-5 px-5">
                    <div className="flex w-full flex-col gap-3 rounded-[24px] border border-shujia-graylight p-[14px]">
                        <h3 className="font-semibold">Service Benefits</h3>
                        {service.service_benefits.length > 0
                            ? service.service_benefits.map((serviceBenefit) => (
                                <React.Fragment key={serviceBenefit.id}>
                                    <div className="flex items-center gap-3">
                                        <img
                                            src="/assets/images/icons/verify-service-details.svg"
                                            alt="icon"
                                            className="h-[32px] w-[32px] shrink-0"
                                        />
                                        <p className="leading-[26px]">
                                            {serviceBenefit.name}
                                        </p>
                                    </div>
                                    <hr className="border-shujia-graylight" />
                                </React.Fragment>
                            )) : 'Belum Ada Service Benefits'}

                    </div>
                </section>
                <section id="GreatCustomers" className="relative mt-5 space-y-[14px]">
                    <h3 className="pl-5 font-semibold">Great Customers</h3>
                    <div id="GreatCustomersSlider" className="swiper w-full overflow-x-hidden">
                        <Swiper
                            className="swiper-wrapper pb-[30px]"
                            direction='horizontal'
                            spaceBetween={20}
                            slidesPerView='auto'
                            slidesOffsetAfter={20}
                            slidesOffsetBefore={20}
                        >
                            {service.service_testimonials.length > 0
                                ? service.service_testimonials.map((serviceTestimonial) => (
                                    <SwiperSlide key={serviceTestimonial.id} className="swiper-slide !w-fit">
                                        <a href="#" className="card">
                                            <div className="flex w-[300px] flex-col gap-4 rounded-3xl border border-shujia-graylight p-5">
                                                <div className="stars flex items-center">
                                                    <img
                                                        src="/assets/images/icons/star-service-details.svg"
                                                        alt="icon"
                                                        className="h-[22px] w-[22px] shrink-0"
                                                    />
                                                    <img
                                                        src="/assets/images/icons/star-service-details.svg"
                                                        alt="icon"
                                                        className="h-[22px] w-[22px] shrink-0"
                                                    />
                                                    <img
                                                        src="/assets/images/icons/star-service-details.svg"
                                                        alt="icon"
                                                        className="h-[22px] w-[22px] shrink-0"
                                                    />
                                                    <img
                                                        src="/assets/images/icons/star-service-details.svg"
                                                        alt="icon"
                                                        className="h-[22px] w-[22px] shrink-0"
                                                    />
                                                    <img
                                                        src="/assets/images/icons/star-service-details.svg"
                                                        alt="icon"
                                                        className="h-[22px] w-[22px] shrink-0"
                                                    />
                                                </div>
                                                <p className="leading-7">
                                                    {serviceTestimonial.message}
                                                </p>
                                                <div className="profil flex items-center gap-3">
                                                    <div className="flex h-[60px] w-[60px] items-center justify-center overflow-hidden rounded-full">
                                                        <img
                                                            src={`${BASE_URL}/${serviceTestimonial.photo}`}
                                                            alt="image"
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col gap-[2px]">
                                                        <h5 className="font-semibold">{serviceTestimonial.name}</h5>
                                                        {/* <p className="text-sm leading-[21px] text-shujia-gray">
                                                        Programer
                                                    </p> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </SwiperSlide>
                                )) : 'Belum Ada Data Testimonials'}
                        </Swiper>
                    </div>
                </section>
                <nav className="fixed bottom-5 left-0 right-0 z-30 mx-auto w-full">
                    <div className="mx-auto max-w-[640px] px-5">
                        <div className="flex items-center gap-[45px] rounded-[24px] bg-shujia-black px-[20px] py-[14px]">
                            <div>
                                <strong className="whitespace-nowrap text-[22px] font-extrabold leading-[33px] text-white">
                                    {formatCurrency(service.price)}
                                </strong>
                                <p className="text-sm leading-[21px] text-white">Refund Guarantee</p>
                            </div>
                            {/* ketika di klik jalankan function handleAddToCart dan disabled ketika isAdding menjadi true */}
                            <button onClick={handleAddToCart} disabled={isAdding} className="w-full">
                                <p className="w-full rounded-full bg-shujia-orange px-[18px] py-[14px] text-center font-semibold text-white transition-all duration-300 hover:shadow-[0px_4px_10px_0px_#D04B1E80]">
                                    {isAdding ? "Adding..." : 'Add To Cart'}
                                </p>
                            </button>
                        </div>
                    </div>
                </nav>
            </main>
        </div>
    )
}

export default DetailsPage
