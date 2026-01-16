import React, { useEffect, useState } from 'react'
import AccordionSection from '../components/AccordionSection';
import type { BookingFormData, HomeService } from '../types/type';
import type z from 'zod';
import { useNavigate } from 'react-router-dom';

type FormData = {
    proof: File | null;
    home_service_ids: number[];
}

const PaymentPage = () => {

    const [formData, setFormData] = useState<FormData>({
        proof: null,
        home_service_ids: [],
    });

    const [serviceDetails, setServiceDetails] = useState<HomeService[]>([]);
    const [bookingData, setBookingData] = useState<BookingFormData | null>(null);
    const [formErrors, setFormErrors] = useState<z.ZodIssue[]>([]);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const TAX_RATE = 0.11;
    const navigate = useNavigate();

    if (loading) {
        <p className='flex justify-center !mt-100'>Loading...</p>
    }

    if (error) {
        return <p className="flex justify-center !mt-100">Error Loading: {error}</p>
    }



    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        }

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, [])

    // FORMAT RUPIAH
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
        }).format(value);
    }

    return (
        <div>
            <main className="relative min-h-screen mx-auto w-full max-w-[640px] bg-[#F4F5F7]">
                <div id="Background" className="absolute left-0 right-0 top-0">
                    <img
                        src="/assets/images/backgrounds/orange.png"
                        alt="image"
                        className="h-[280px] w-full object-cover object-bottom"
                    />
                </div>
                <section
                    id="NavTop"
                    className="fixed left-0 right-0 top-[16px] z-30 transition-all duration-300"
                >
                    <div className="relative mx-auto max-w-[640px] px-5">
                        <div
                            id="ContainerNav"
                            className={isScrolled ? (
                                'relative flex h-[68px] items-center justify-center transition-all duration-300 bg-white rounded-[22px] shadow-[0px_12px_20px_0px_#0305041C]'
                            ) : ('relative flex h-[68px] items-center justify-center transition-all duration-300 ')}
                        >
                            <a
                                id="BackA"
                                href="booking-form.html"
                                className={isScrolled ? (
                                    'absolute transition-all duration-300 left-[16px]'
                                ) : ('absolute left-0 text-white transition-all duration-300')}
                            >
                                <div
                                    id="Back"
                                    className={isScrolled ? (
                                        'flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-white border border-shujia-graylight'
                                    ) : ('flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-white')}
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
                                className={isScrolled ? (
                                    'font-semibold transition-all duration-300'
                                ) : ('font-semibold text-white transition-all duration-300')}
                            >
                                Payment Services
                            </h2>
                        </div>
                    </div>
                </section>

                <section id="ProgressBar" className="relative px-5 pt-[92px]">
                    <div className="flex items-center">

                        {/* STEP 1 - DONE */}
                        <div className="flex flex-1 flex-col items-center">
                            <div className="h-2 w-full rounded-full bg-white"></div>
                            <div className="-mt-[18px] flex flex-col items-center gap-1">
                                <div className="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-white text-xs font-bold text-shujia-orange">
                                    1
                                </div>
                                <p className="text-xs font-semibold text-white">Booking</p>
                            </div>
                        </div>

                        {/* STEP 2 - ACTIVE */}
                        <div className="flex flex-1 flex-col items-center">
                            <div className="h-2 w-full rounded-full bg-white"></div>
                            <div className="-mt-[18px] flex flex-col items-center gap-1">
                                <div className="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-white text-xs font-bold text-shujia-orange">
                                    2
                                </div>
                                <p className="text-xs font-semibold text-white">Payment</p>
                            </div>
                        </div>

                        {/* STEP 3 - INACTIVE */}
                        <div className="flex flex-1 flex-col items-center">
                            <div className="h-2 w-full rounded-full bg-[#E68B6D]"></div>
                            <div className="-mt-[18px] flex flex-col items-center gap-1">
                                <div className="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-[#FFBFA9] text-xs font-bold text-[#C2836D]">
                                    3
                                </div>
                                <p className="text-xs font-semibold text-[#FFBFA9]">Delivery</p>
                            </div>
                        </div>

                    </div>
                </section>

                <div className="relative mt-[44px] flex flex-col px-5 pb-5">
                    <header className="flex flex-col gap-[2px]">
                        <h1 className="text-[26px] font-extrabold leading-[39px] text-white">
                            Payment
                        </h1>
                        <p className="text-white">Dibayar dulu nanti baru dikerjain</p>
                    </header>
                    <div className="mt-[20px] flex flex-col gap-5">
                        <section id="PaymentMethod" className="grid grid-cols-2 gap-[14px]">
                            <div className="flex items-center justify-center gap-[10px] rounded-[20px] bg-shujia-black py-[14px]">
                                <img
                                    src="/assets/images/icons/send-to-payment.svg"
                                    alt="icon"
                                    className="h-[32px] w-[32px] shrink-0"
                                />
                                <div>
                                    <h5 className="text-sm font-semibold leading-[21px] text-white">
                                        Send to Bank
                                    </h5>
                                    <p className="text-sm leading-[21px] text-white">Available</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-center gap-[10px] rounded-[20px] border border-shujia-graylight bg-white py-[14px]">
                                <img
                                    src="/assets/images/icons/credit-payment.svg"
                                    alt="icon"
                                    className="h-[32px] w-[32px] shrink-0"
                                />
                                <div>
                                    <h5 className="text-sm font-semibold leading-[21px]">
                                        Credit Card
                                    </h5>
                                    <p className="text-sm leading-[21px]">Offline</p>
                                </div>
                            </div>
                        </section>

                        <AccordionSection
                            title='Available Payment'
                            iconSrc='/assets/images/icons/bottom-booking-form.svg'
                        >
                            <div id="AvailablePaymentJ" className="flex flex-col gap-4">
                                <div className="flex gap-4">
                                    <div className="flex h-[60px] w-[81px] items-center justify-center overflow-hidden shrink-0">
                                        <img
                                            src="/assets/images/thumbnails/bca.png"
                                            alt="image"
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-[10px]">
                                        <div className="flex flex-col gap-[2px]">
                                            <h4 className="text-shujia-gray">Bank Name</h4>
                                            <strong className="font-semibold">Bank Central Asia</strong>
                                        </div>
                                        <div className="flex flex-col gap-[2px]">
                                            <h4 className="text-shujia-gray">Bank Number</h4>
                                            <strong className="font-semibold">18209301928391</strong>
                                        </div>
                                        <div className="flex flex-col gap-[2px]">
                                            <h4 className="text-shujia-gray">Bank Account</h4>
                                            <strong className="font-semibold">
                                                Shujia Angga Indonesia
                                            </strong>
                                        </div>
                                    </div>
                                </div>
                                <hr className="border-shujia-graylight" />
                                <div className="flex gap-4">
                                    <div className="flex h-[60px] w-[81px] items-center justify-center overflow-hidden shrink-0">
                                        <img
                                            src="/assets/images/thumbnails/mandiri.png"
                                            alt="image"
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-[10px]">
                                        <div className="flex flex-col gap-[2px]">
                                            <h4 className="text-shujia-gray">Bank Name</h4>
                                            <strong className="font-semibold">Bank Mandiri</strong>
                                        </div>
                                        <div className="flex flex-col gap-[2px]">
                                            <h4 className="text-shujia-gray">Bank Number</h4>
                                            <strong className="font-semibold">829839192</strong>
                                        </div>
                                        <div className="flex flex-col gap-[2px]">
                                            <h4 className="text-shujia-gray">Bank Account</h4>
                                            <strong className="font-semibold">
                                                Shujia Angga Indonesia
                                            </strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </AccordionSection>

                        <AccordionSection
                            title='Booking Details'
                            iconSrc='/assets/images/icons/bottom-booking-form.svg'
                        >
                            <div className="flex flex-col gap-4" id="BookingDetailsJ">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-[10px]">
                                        <img
                                            src="/assets/images/icons/note-payment.svg"
                                            alt="icon"
                                            className="h-[24px] w-[24px] shrink-0"
                                        />
                                        <p className="text-shujia-gray">Sub Total</p>
                                    </div>
                                    <strong className="font-semibold">Rp 180.394.392</strong>
                                </div>
                                <hr className="border-shujia-graylight" />
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-[10px]">
                                        <img
                                            src="/assets/images/icons/note-payment.svg"
                                            alt="icon"
                                            className="h-[24px] w-[24px] shrink-0"
                                        />
                                        <p className="text-shujia-gray">Tax 11%</p>
                                    </div>
                                    <strong className="font-semibold">Rp 18.495.699</strong>
                                </div>
                                <hr className="border-shujia-graylight" />
                                <div className="flex items-center justify-between">
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
                                <div className="flex items-center justify-between">
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
                                <hr className="border-shujia-graylight" />
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-[10px]">
                                        <img
                                            src="/assets/images/icons/note-payment.svg"
                                            alt="icon"
                                            className="h-[24px] w-[24px] shrink-0"
                                        />
                                        <p className="text-shujia-gray">Grand Total</p>
                                    </div>
                                    <strong className="text-[20px] font-bold leading-[30px] text-shujia-orange">
                                        Rp 189.398.391
                                    </strong>
                                </div>
                            </div>
                        </AccordionSection>
                    </div>

                    <form action="booking-finished.html" className="mt-[20px]">
                        <AccordionSection
                            title='Confirmation'
                            iconSrc='/assets/images/icons/bottom-booking-form.svg'
                        >
                            <label className="flex flex-col gap-2">
                                <h4 className="font-semibold">Add Proof of Payment</h4>

                                <div className="relative flex h-[52px] items-center gap-3 rounded-full border border-shujia-graylight px-[14px] transition-all focus-within:border-shujia-orange">

                                    {/* ICON */}
                                    <img
                                        src="/assets/images/icons/proof-payment.svg"
                                        alt="icon"
                                        className="h-6 w-6 shrink-0"
                                    />

                                    {/* TEXT */}
                                    <p className="text-shujia-gray">
                                        Upload Image
                                    </p>

                                    {/* INPUT */}
                                    <input
                                        type="file"
                                        required
                                        className="absolute inset-0 cursor-pointer opacity-0"
                                    />
                                </div>
                            </label>
                        </AccordionSection>
                        <button
                            type="submit"
                            className="mt-[54px] w-full rounded-full bg-shujia-orange py-[14px] font-semibold text-white transition-all duration-300 hover:shadow-[0px_4px_10px_0px_#D04B1E80]"
                        >
                            Confirm My Payment
                        </button>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default PaymentPage