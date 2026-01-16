import { useEffect, useState } from "react"
import AccordionSection from "../components/AccordionSection";
import type z from "zod";
import { Link, useNavigate } from "react-router-dom";
import { bookingSchema } from "../types/validationBooking";
import type { BookingFormData } from "../types/type";


const BookingPage = () => {

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

    //BUAT STATE UNTUK MENAMPUNG DATA DARI FORM 
    const [formData, setFormData] = useState<BookingFormData>({
        name: "",
        email: "",
        phone: "",
        started_time: "",
        schedule_at: "",
        post_code: "",
        address: "",
        city: "",
    });

    //SIMPAN ERROR FORM NYA
    const [formErrors, setFormErrors] = useState<z.ZodIssue[]>([]);

    //KETIKA USER KLIK TOMBOL CONTINUE AKAN MENAVIGASI KE HALAMAN SELANJUTNYA
    const navigate = useNavigate();

    useEffect(() => {
        //buat variable untuk mengambil booking data dan cart data dari localstorage
        const savedData = localStorage.getItem("bookingData")
        const cartData = localStorage.getItem("cart");

        //jika cartData tidak ada maka navigasi ke homepage
        if (!cartData || JSON.parse(cartData).length === 0) {
            navigate('/');
            return;
        }
        //jika ada bookingData maka isi state setFormData dengan bookingData itu sendiri
        if (savedData) {
            setFormData(JSON.parse(savedData));
        }
    }, [navigate]);

    // DATA CITY STATIS
    const cities = [
        "Rejang Lebong",
        "Kepahiang",
        "Kota Bengkulu",
        "Bengkulu Tengah",
        "Bengkulu Utara",
        "Lebong",
        "Muko-Muko",
        "Seluma",
        "Bengkulu Selatan",
    ]

    // UNTUK MENGHANDLE onChange FORM ATAU BEHAVIOR FORM KETIKA DI KETIK (MENGAMBIL PROPERTI NAME DAN VALUE DARI FORM)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev, //spread operator
            [name]: value,
        }));
    };

    // MENDAPATKAN TANGGAL BESOK HARI UNTUK FORM SCHEDULE AT
    useEffect(() => {
        // ambil method date
        const tommorow = new Date();
        //ambil hari ini di tambah 1 jadi mendapatkan ke esokan harinya
        tommorow.setDate(tommorow.getDate() + 1);
        console.log(tommorow);

        //format Date agar mudah terbaca oleh user
        const formattedDate = tommorow.toISOString().split('T')[0];

        //isi form schedule_at menggunakan data ke esokan hari yang sudah di buat di atas
        setFormData((prev) => ({
            ...prev,
            schedule_at: formattedDate,
        }))
    }, [])

    //UNTUK MENGHANDLE KETIKA USER MENEKAN TOMBOL SUBMIT
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const validation = bookingSchema.safeParse(formData);

        if (!validation.success) {
            setFormErrors(validation.error.issues);
            return;
        }

        localStorage.setItem("bookingData", JSON.stringify(formData));
        alert("Booking information saved!");

        navigate('/payment')

        setFormErrors([]);
    }

    return (
        <div>
            <main className="relative min-h-screen mx-auto w-full max-w-[640px] bg-[#F4F5F7]">
                <div id="Background" className="absolute left-0 right-0 top-0">
                    <img
                        src="/assets/images/backgrounds/orange.png"
                        alt="image"
                        className="h-[350px] w-full object-cover object-bottom"
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
                            <Link
                                to={'/myCart'}
                                id="BackA"
                                className={isScrolled ? (
                                    'absolute transition-all duration-300 left-[16px]'
                                ) : ('absolute left-0 transition-all duration-300')}
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
                            </Link>
                            <h2
                                id="Title"
                                className={isScrolled ? (
                                    'font-semibold transition-all duration-300'
                                ) : ('font-semibold text-white transition-all duration-300')}
                            >
                                Booking Services
                            </h2>
                        </div>
                    </div>
                </section>
                <section id="ProgressBar" className="relative px-5 pt-[92px]">
                    <div className="flex items-center">
                        {/* STEP 1 */}
                        <div className="flex flex-1 flex-col items-center">
                            <div className="h-2 w-full rounded-full bg-white"></div>
                            <div className="-mt-[18px] flex flex-col items-center gap-1">
                                <div className="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-white text-xs font-bold">
                                    1
                                </div>
                                <p className="text-xs font-semibold text-white">Booking</p>
                            </div>
                        </div>

                        {/* STEP 2 */}
                        <div className="flex flex-1 flex-col items-center">
                            <div className="h-2 w-full rounded-full bg-[#E68B6D]"></div>
                            <div className="-mt-[18px] flex flex-col items-center gap-1">
                                <div className="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-[#FFBFA9] text-xs font-bold text-[#C2836D]">
                                    2
                                </div>
                                <p className="text-xs font-semibold text-[#FFBFA9]">Payment</p>
                            </div>
                        </div>

                        {/* STEP 3 */}
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
                    <form onSubmit={handleSubmit}>
                        <header className="flex flex-col gap-[2px]">
                            <h1 className="text-[26px] font-extrabold leading-[39px] text-white">Start Booking</h1>
                            <p className="text-white">Lorem dolor si amet data asli</p>
                        </header>

                        <div className="mt-[20px] flex flex-col gap-5">
                            {/* --- WORKING SCHEDULE --- */}
                            <AccordionSection title="Working Schedule" iconSrc="/assets/images/icons/bottom-booking-form.svg">
                                <div className="flex flex-col gap-4">
                                    <label className="flex flex-col gap-2">
                                        <h4 className="font-semibold">Date</h4>
                                        <div className="relative flex items-center h-[52px] w-full overflow-hidden rounded-full border border-shujia-graylight bg-[#F4F5F7]">
                                            <img src="/assets/images/icons/date-booking-form.svg" className="absolute left-[14px] h-6 w-6 pointer-events-none" alt="icon" />
                                            <input name="schedule_at" value={formData.schedule_at} onChange={handleChange} required readOnly type="text" className="h-full w-full bg-transparent pl-[50px] font-semibold focus:outline-none" />
                                        </div>
                                    </label>
                                    <label className="flex flex-col gap-2">
                                        <h4 className="font-semibold">Start Time At</h4>
                                        <div className="relative flex items-center h-[52px] w-full overflow-hidden rounded-full border border-shujia-graylight transition-all duration-300 focus-within:border-shujia-orange bg-white">
                                            <img src="/assets/images/icons/clock-booking-form.svg" className="absolute left-[14px] h-6 w-6 z-20 pointer-events-none" alt="icon" />
                                            <select name="started_time" value={formData.started_time} onChange={handleChange} required className="h-full w-full appearance-none bg-transparent relative z-10 pl-[50px] font-semibold focus:outline-none cursor-pointer">
                                                <option value="" disabled selected>Enter the time</option>
                                                <option value="09:00">09:00</option>
                                                <option value="10:00">10:00</option>
                                                <option value="11:00">11:00</option>
                                                <option value="12:00">12:00</option>
                                                <option value="13:00">13:00</option>
                                            </select>
                                            <img src="/assets/images/icons/bottom-select.svg" className="absolute right-[14px] h-5 w-5 pointer-events-none" alt="icon" />
                                        </div>
                                    </label>
                                </div>
                            </AccordionSection>

                            {/* --- PERSONAL INFORMATION --- */}
                            <AccordionSection title="Personal Information" iconSrc="/assets/images/icons/bottom-booking-form.svg">
                                <div className="flex flex-col gap-4">
                                    <label className="flex flex-col gap-2">
                                        <h4 className="font-semibold">Full Name</h4>
                                        <div className="relative flex items-center h-[52px] w-full overflow-hidden rounded-full border border-shujia-graylight transition-all duration-300 focus-within:border-shujia-orange bg-white">
                                            <img src="/assets/images/icons/profil-booking-form.svg" className="absolute left-[14px] h-6 w-6 pointer-events-none" alt="icon" />
                                            <input name="name" value={formData.name} onChange={handleChange} type="text" placeholder="Write your complete name" className="h-full w-full bg-transparent pl-[50px] font-semibold placeholder:font-normal placeholder:text-shujia-gray focus:outline-none" />
                                        </div>
                                        {/* TAMPILKAN ERROR JIKA ADA KESALAHAN PADA VALIDASI FORM */}
                                        {formErrors.find((error) =>
                                            error.path.includes("name")
                                        ) && (
                                                <p className="!text-red-500">
                                                    {
                                                        formErrors.find((error) =>
                                                            error.path.includes("name")
                                                        )?.message
                                                    }
                                                </p>
                                            )}
                                    </label>
                                    <label className="flex flex-col gap-2">
                                        <h4 className="font-semibold">Email Address</h4>
                                        <div className="relative flex items-center h-[52px] w-full overflow-hidden rounded-full border border-shujia-graylight transition-all duration-300 focus-within:border-shujia-orange bg-white">
                                            <img src="/assets/images/icons/amplop-booking-form.svg" className="absolute left-[14px] h-6 w-6 pointer-events-none" alt="icon" />
                                            <input name="email" value={formData.email} onChange={handleChange} required type="email" placeholder="Write your email" className="h-full w-full bg-transparent pl-[50px] font-semibold placeholder:font-normal placeholder:text-shujia-gray focus:outline-none" />
                                        </div>
                                        {/* TAMPILKAN ERROR JIKA ADA KESALAHAN PADA VALIDASI FORM */}
                                        {formErrors.find((error) =>
                                            error.path.includes("email")
                                        ) && (
                                                <p className="!text-red-500">
                                                    {
                                                        formErrors.find((error) =>
                                                            error.path.includes("email")
                                                        )?.message
                                                    }
                                                </p>
                                            )}
                                    </label>
                                    <label className="flex flex-col gap-2">
                                        <h4 className="font-semibold">No. Phone</h4>
                                        <div className="relative flex items-center h-[52px] w-full overflow-hidden rounded-full border border-shujia-graylight transition-all duration-300 focus-within:border-shujia-orange bg-white">
                                            <img src="/assets/images/icons/telepon-booking-form.svg" className="absolute left-[14px] h-6 w-6 pointer-events-none" alt="icon" />
                                            <input name="phone" value={formData.phone} onChange={handleChange} required type="tel" placeholder="Write your active number" className="h-full w-full bg-transparent pl-[50px] font-semibold placeholder:font-normal placeholder:text-shujia-gray focus:outline-none" />
                                        </div>
                                        {/* TAMPILKAN ERROR JIKA ADA KESALAHAN PADA VALIDASI FORM */}
                                        {formErrors.find((error) =>
                                            error.path.includes("phone")
                                        ) && (
                                                <p className="!text-red-500">
                                                    {
                                                        formErrors.find((error) =>
                                                            error.path.includes("phone")
                                                        )?.message
                                                    }
                                                </p>
                                            )}
                                    </label>
                                </div>
                            </AccordionSection>

                            {/* --- HOME ADDRESS --- */}
                            <AccordionSection title="Your Home Adress" iconSrc="/assets/images/icons/bottom-booking-form.svg">
                                <div className="flex flex-col gap-4">
                                    <label className="flex flex-col gap-2">
                                        <h4 className="font-semibold">Address</h4>
                                        <div className="relative h-[110px] w-full overflow-hidden rounded-[22px] border border-shujia-graylight transition-all duration-300 focus-within:border-shujia-orange bg-white">
                                            <img src="/assets/images/icons/school-booking-form.svg" className="absolute left-[14px] top-[16px] h-6 w-6 pointer-events-none" alt="icon" />
                                            <textarea name="address" value={formData.address} onChange={handleChange} required placeholder="Enter your complete address" className="h-full w-full pl-[50px] pr-[14px] pt-[14px] font-semibold leading-7 placeholder:font-normal placeholder:text-shujia-gray focus:outline-none resize-none" />
                                        </div>
                                        {/* TAMPILKAN ERROR JIKA ADA KESALAHAN PADA VALIDASI FORM */}
                                        {formErrors.find((error) =>
                                            error.path.includes("address")
                                        ) && (
                                                <p>
                                                    {
                                                        formErrors.find((error) =>
                                                            error.path.includes("address")
                                                        )?.message
                                                    }
                                                </p>
                                            )}
                                    </label>
                                    <label className="flex flex-col gap-2">
                                        <h4 className="font-semibold">City</h4>
                                        <div className="relative flex items-center h-[52px] w-full overflow-hidden rounded-full border border-shujia-graylight transition-all duration-300 focus-within:border-shujia-orange bg-white">
                                            <img src="/assets/images/icons/location-booking-form.svg" className="absolute left-[14px] h-6 w-6 z-20 pointer-events-none" alt="icon" />
                                            <select name="city" value={formData.city} onChange={handleChange} required className="h-full w-full appearance-none bg-transparent relative z-10 pl-[50px] font-semibold focus:outline-none cursor-pointer">
                                                <option value="">Enter the city name</option>
                                                {cities.length > 0 ? (
                                                    cities.map((city) => (
                                                        <option key={city} value={city}>{city}</option>
                                                    ))
                                                ) : (<option disabled value="">Belum Ada Data Kota</option>)}
                                            </select>
                                            <img src="/assets/images/icons/bottom-select.svg" className="absolute right-[14px] h-6 w-6 pointer-events-none" alt="icon" />
                                        </div>
                                        {/* TAMPILKAN ERROR JIKA ADA KESALAHAN PADA VALIDASI FORM */}
                                        {formErrors.find((error) =>
                                            error.path.includes("city")
                                        ) && (
                                                <p className="!text-red-500">
                                                    {
                                                        formErrors.find((error) =>
                                                            error.path.includes("city")
                                                        )?.message
                                                    }
                                                </p>
                                            )}
                                    </label>
                                    <label className="flex flex-col gap-2">
                                        <h4 className="font-semibold">Post Code</h4>
                                        <div className="relative flex items-center h-[52px] w-full overflow-hidden rounded-full border border-shujia-graylight transition-all duration-300 focus-within:border-shujia-orange bg-white">
                                            <img src="/assets/images/icons/ball-booking-form.svg" className="absolute left-[14px] h-6 w-6 pointer-events-none" alt="icon" />
                                            <input name="post_code" value={formData.post_code} onChange={handleChange} required type="tel" placeholder="What’s your postal code" className="h-full w-full bg-transparent pl-[50px] font-semibold placeholder:font-normal placeholder:text-shujia-gray focus:outline-none" />
                                        </div>
                                        {/* TAMPILKAN ERROR JIKA ADA KESALAHAN PADA VALIDASI FORM */}
                                        {formErrors.find((error) =>
                                            error.path.includes("post_code")
                                        ) && (
                                                <p className="!text-red-500">
                                                    {
                                                        formErrors.find((error) =>
                                                            error.path.includes("post_code")
                                                        )?.message
                                                    }
                                                </p>
                                            )}
                                    </label>
                                </div>
                            </AccordionSection>
                        </div>

                        <button
                            type="submit"
                            className="mt-[44px] w-full rounded-full bg-shujia-orange py-[14px] font-semibold text-white transition-all duration-300 hover:shadow-[0px_4px_10px_0px_#D04B1E80]"
                        >
                            Continue to Payment
                        </button>
                    </form>
                </div>
            </main>

        </div>
    )
}

export default BookingPage
