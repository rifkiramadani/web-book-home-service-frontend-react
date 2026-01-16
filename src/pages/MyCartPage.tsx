import { useEffect, useState } from "react"
import type { CartItem, HomeService } from "../types/type"
import apiClient from "../services/apiServices";
import { Link } from "react-router-dom";


const MyCartPage = () => {

    const [serviceDetails, setServiceDetails] = useState<HomeService[]>([]);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //buat variable untuk mengambil items cart dari localstorage
        const savedCart = localStorage.getItem("cart");
        //jika savedCart ada
        if (savedCart) {
            //maka parsing savedCart tersebut ke dalam bentuk JSON
            const cartItems: CartItem[] = JSON.parse(savedCart);
            //dan isi use state setCart dengan variable cartItems diatas
            setCart(cartItems);

            const fetchServiceDetails = async () => {
                //buat wadah untuk menyimpan valid service dan updated cart 
                const validServices: HomeService[] = [];
                const updatedCart: CartItem[] = [];

                //untuk mengecek apakah service tersebut masih ada atau tidak
                for (const item of cartItems) {
                    try {
                        const response = await apiClient.get(`homeService/${item.slug}`);
                        const service = response.data.data;

                        if (service) {
                            validServices.push(service);
                            updatedCart.push(item);
                        } else {
                            console.warn(
                                `Service with slug ${item.slug} is longer available`
                            );
                        }

                    } catch (error) {
                        if (error instanceof Error) {
                            setError(error.message);
                            console.error(
                                `Error fetching service with slug ${item.slug}: ${error.message}`
                            );
                            const updatedCartAfterError = cartItems.filter(
                                (cartItem) => cartItem.slug !== item.slug
                            );
                            setCart(updatedCartAfterError);
                            localStorage.setItem("cart", JSON.stringify(updatedCartAfterError));
                        }
                    }
                }
                setServiceDetails(validServices);
                setLoading(false);
            };
            fetchServiceDetails();
        } else {
            setLoading(false);
        }
    }, [])

    const handleRemoveItem = (slug: string) => {
        //fungsi untuk memfilter data yang tidak diklik tidak di hapus
        const updatedCart = cart.filter((item) => item.slug !== slug);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setServiceDetails((prevDetails) =>
            prevDetails.filter((service) => service.slug !== slug)
        );
    }

    //menghitung subtotal secara iterasi
    const subTotal = serviceDetails.reduce(
        (acc, service) => acc + service.price,
        0
    );

    const tax = subTotal * 0.11;
    const total = subTotal + tax;


    if (loading) {
        return <p className="flex justify-center !mt-100">Loading...</p>
    }

    if (error) {
        return <p className="flex justify-center !mt-100">Error Loading: {error}</p>
    }

    // FORMAT RUPIAH
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
        }).format(value);
    }

    const BASE_URL = import.meta.env.VITE_REACT_API_STORAGE_URL;

    return (
        <div>
            <main className="relative mx-auto min-h-screen w-full max-w-[640px] bg-[#F4F5F7] pb-[158px]">
                <div id="Background" className="absolute left-0 right-0 top-0">
                    <img
                        src="/assets/images/backgrounds/orange.png"
                        alt="image"
                        className="h-[190px] w-full object-cover object-bottom"
                    />
                </div>
                <section
                    id="NavTop"
                    className="fixed left-0 right-0 top-[16px] z-30 transition-all duration-300"
                >
                    <div className="relative mx-auto max-w-[640px] px-5">
                        <div
                            id="ContainerNav"
                            className="relative flex h-[68px] items-center justify-center transition-all duration-300"
                        >
                            <Link to={'/'}
                                id="BackA"
                                className="absolute left-0 transition-all duration-300"
                            >
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
                            </Link>
                            <h1
                                id="Title"
                                className="font-semibold text-white transition-all duration-300"
                            >
                                My Cart
                            </h1>
                        </div>
                    </div>
                </section>
                <div className="relative flex flex-col gap-[20px] px-5 pt-[100px]">
                    <section
                        id="HomeServices"
                        className="flex flex-col gap-4 rounded-3xl border border-shujia-graylight bg-white px-[14px] py-[14px]"
                    >
                        <div className="flex items-center justify-between">
                            <h2 className="font-semibold">Home Services</h2>
                            <button type="button" data-expand="HomeServicesJ">
                                <img
                                    src="/assets/images/icons/bottom-booking-form.svg"
                                    alt="icon"
                                    className="h-[32px] w-[32px] shrink-0 transition-all duration-300"
                                />
                            </button>
                        </div>
                        <div className="flex flex-col gap-4" id="HomeServicesJ">
                            {serviceDetails.length > 0
                                ? serviceDetails.map((serviceDetail, index) => (
                                    <>
                                        <div key={serviceDetail.id} className="card flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-[90px] w-[80px] shrink-0 items-center justify-center overflow-hidden rounded-3xl">
                                                    <img
                                                        src={`${BASE_URL}/${serviceDetail.thumbnail}`}
                                                        alt="image"
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <h3 className="line-clamp-2 h-[42px] text-sm font-semibold leading-[21px]">
                                                        {serviceDetail.name}
                                                    </h3>
                                                    <div className="flex items-center gap-[6px]">
                                                        <div className="flex items-center gap-1">
                                                            <img
                                                                src="/assets/images/icons/coint.svg"
                                                                alt="icon"
                                                                className="h-4 w-4 shrink-0"
                                                            />
                                                            <p className="text-xs leading-[18px] text-shujia-gray">
                                                                {formatCurrency(serviceDetail.price)}
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <img
                                                                src="/assets/images/icons/clock-cart.svg"
                                                                alt="icon"
                                                                className="h-4 w-4 shrink-0"
                                                            />
                                                            <p className="text-xs leading-[18px] text-shujia-gray">
                                                                {serviceDetail.duration} Hours
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <button onClick={() => handleRemoveItem(serviceDetail.slug)} type="button" className="shrink-0">
                                                <img
                                                    src="/assets/images/icons/garbage.svg"
                                                    alt="icon"
                                                    className="size-[32px] shrink-0"
                                                />
                                            </button>
                                        </div>
                                        {/* {index < serviceDetail.length - 1 && (
                                            <hr className="border-shujia-graylight" />
                                        )} */}
                                        <hr className="border-shujia-graylight" />
                                    </>
                                )) : "Belum Ada Data Cart"}
                        </div>
                    </section>
                    <section
                        id="BookingDetails"
                        className="flex flex-col gap-4 rounded-3xl border border-shujia-graylight bg-white px-[14px] py-[14px]"
                    >
                        <div className="flex items-center justify-between">
                            <h2 className="font-semibold">Booking Details</h2>
                            <button type="button" data-expand="BookingDetailsJ">
                                <img
                                    src="/assets/images/icons/bottom-booking-form.svg"
                                    alt="icon"
                                    className="h-[32px] w-[32px] shrink-0 transition-all duration-300"
                                />
                            </button>
                        </div>
                        <div className="flex flex-col gap-4" id="BookingDetailsJ">
                            <div className="flex justify-between">
                                <div className="flex items-center gap-[10px]">
                                    <img
                                        src="/assets/images/icons/note-payment.svg"
                                        alt="icon"
                                        className="h-[24px] w-[24px] shrink-0"
                                    />
                                    <p className="text-shujia-gray">Sub Total</p>
                                </div>
                                <strong className="font-semibold">{formatCurrency(subTotal)}</strong>
                            </div>
                            <hr className="border-shujia-graylight" />
                            <div className="flex justify-between">
                                <div className="flex items-center gap-[10px]">
                                    <img
                                        src="/assets/images/icons/note-payment.svg"
                                        alt="icon"
                                        className="h-[24px] w-[24px] shrink-0"
                                    />
                                    <p className="text-shujia-gray">Tax 11%</p>
                                </div>
                                <strong className="font-semibold">{formatCurrency(tax)}</strong>
                            </div>
                            <hr className="border-shujia-graylight" />
                            <div className="flex justify-between">
                                <div className="flex items-center gap-[10px]">
                                    <img
                                        src="/assets/images/icons/note-payment.svg"
                                        alt="icon"
                                        className="h-[24px] w-[24px] shrink-0"
                                    />
                                    <p className="text-shujia-gray">Insurance</p>
                                </div>
                                <strong className="font-semibold">Free for All</strong>
                            </div>
                            <hr className="border-shujia-graylight" />
                            <div className="flex justify-between">
                                <div className="flex items-center gap-[10px]">
                                    <img
                                        src="/assets/images/icons/note-payment.svg"
                                        alt="icon"
                                        className="h-[24px] w-[24px] shrink-0"
                                    />
                                    <p className="text-shujia-gray">Service Tools</p>
                                </div>
                                <strong className="font-semibold">Free for All</strong>
                            </div>
                        </div>
                    </section>
                    <section id="Adverticement">
                        <a href="#">
                            <img src="/assets/images/backgrounds/adverticement.png" alt="icon" />
                        </a>
                    </section>
                </div>
                <nav className="fixed bottom-5 left-0 right-0 z-30 mx-auto w-full">
                    <div className="mx-auto max-w-[640px] px-5">
                        <div className="flex items-center gap-[45px] rounded-[24px] bg-shujia-black px-[20px] py-[14px]">
                            <div>
                                <strong className="whitespace-nowrap text-[22px] font-extrabold leading-[33px] text-white">
                                    {formatCurrency(total)}
                                </strong>
                                <p className="text-sm leading-[21px] text-white">Grand Total</p>
                            </div>
                            <a href="booking-form.html" className="w-full">
                                <p className="w-full rounded-full bg-shujia-orange px-[18px] py-[14px] text-center font-semibold text-white transition-all duration-300 hover:shadow-[0px_4px_10px_0px_#D04B1E80]">
                                    Continue
                                </p>
                            </a>
                        </div>
                    </div>
                </nav>
            </main>

        </div>
    )
}

export default MyCartPage
