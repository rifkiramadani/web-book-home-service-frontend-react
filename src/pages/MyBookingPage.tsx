import React, { useState } from "react"
import type z from "zod";
import type { TransactionDetail } from "../types/type";
import { viewBookingSchema } from "../types/validationBooking";
import apiClient from "../services/apiServices";
import { isAxiosError } from "axios";

const MyBookingPage = () => {

    const [formData, setFormData] = useState({
        'booking_trx_id': "",
        'email': "",
    });

    const [formErrors, setFormErrors] = useState<z.ZodIssue[]>([]);
    const [notFound, setNotFound] = useState(false);
    const [loading, setLoading] = useState(false);
    const [bookingDetails, setBookingDetails] = useState<TransactionDetail | null>(null);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validation = viewBookingSchema.safeParse(formData);

        if (!validation.success) {
            setFormErrors(validation.error.issues);
            return;
        }

        setFormErrors([]);
        setLoading(false);
        setNotFound(false);

        try {
            const response = apiClient.post("/check-booking", formData);
            if (response.status === 200 | response.data.data) {
                setBookingDetails(response.data.data);
            } else {
                setNotFound(true);
                setBookingDetails(null);
            }
        } catch (error) {
            if (isAxiosError(error)) {
                if (error.response && error.status === 404) {
                    setNotFound(true);
                    setBookingDetails(null);
                }
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <main className="relative mx-auto min-h-screen w-full max-w-[640px] bg-[#F4F5F7] px-5 pb-[138px] pt-[50px]">
                <div id="Background" className="absolute left-0 right-0 top-0">
                    <img
                        src="/assets/images/backgrounds/orange.png"
                        alt="image"
                        className="h-[280px] w-full object-cover object-bottom"
                    />
                </div>
                <div className="relative flex flex-col gap-5">
                    <header className="flex flex-col items-center gap-[10px]">
                        <img
                            src="/assets/images/icons/list-form-check.svg"
                            alt="icon"
                            className="size-[70px] shrink-0"
                        />
                        <h1 className="text-[26px] font-extrabold leading-[39px] text-white">
                            Check My Booking
                        </h1>
                    </header>
                    <form onSubmit={handleSubmit}>
                        <section className="flex flex-col gap-4 rounded-3xl border border-shujia-graylight bg-white px-[14px] py-[14px]">

                            {/* Booking TRX ID */}
                            <label className="flex flex-col gap-2">
                                <h4 className="font-semibold">Booking TRX ID</h4>
                                {formErrors.find((error) => error.path.includes("booking_trx_id")) && (
                                    <p>
                                        {formErrors.find((error) => error.path.includes("booking_trx_id"))?.message}
                                    </p>
                                )}
                                <div className="relative flex h-[52px] w-full items-center overflow-hidden rounded-full border border-shujia-graylight focus-within:border-shujia-orange">
                                    <img
                                        src="/assets/images/icons/note-id-finished.svg"
                                        alt="icon"
                                        className="ml-[14px] h-6 w-6 shrink-0"
                                    />

                                    <input
                                        required
                                        name="booking_trx_id"
                                        onChange={handleChange}
                                        value={formData.booking_trx_id}
                                        id="bookingTrxId"
                                        placeholder="Your Booking TRX ID"
                                        className="h-full w-full !ml-2 bg-transparent px-3 font-semibold placeholder:text-base placeholder:font-normal focus:outline-none"
                                        type="text"
                                    />
                                </div>
                            </label>

                            {/* Email */}
                            <label className="flex flex-col gap-2">
                                <h4 className="font-semibold">Email Address</h4>
                                {formErrors.find((error) => error.path.includes("email")) && (
                                    <p>
                                        {formErrors.find((error) => error.path.includes("email"))?.message}
                                    </p>
                                )}
                                <div className="relative flex h-[52px] w-full items-center overflow-hidden rounded-full border border-shujia-graylight focus-within:border-shujia-orange">
                                    <img
                                        src="/assets/images/icons/amplop-booking-form.svg"
                                        alt="icon"
                                        className="ml-[14px] h-6 w-6 shrink-0"
                                    />

                                    <input
                                        required
                                        name="email"
                                        onChange={handleChange}
                                        value={formData.email}
                                        id="emailAddress"
                                        placeholder="Write your email"
                                        className="h-full w-full !ml-2 bg-transparent px-3 font-semibold placeholder:text-base placeholder:font-normal focus:outline-none"
                                        type="email"
                                    />
                                </div>
                            </label>

                            <button
                                type="submit"
                                className="w-full rounded-full bg-shujia-orange py-[14px] text-center font-semibold text-white hover:shadow-[0px_4px_10px_0px_#D04B1E80]"
                            >
                                Find My Booking
                            </button>

                        </section>

                    </form>
                    <section
                        id="NotFound"
                        className="flex flex-col items-center gap-4 rounded-3xl border border-shujia-graylight bg-white px-[14px] py-[14px]"
                    >
                        <img
                            src="/assets/images/icons/list-form-check-black.svg"
                            alt="icon"
                            className="size-[50px] shrink-0"
                        />
                        <strong className="font-bold">Oops! Not Found</strong>
                        <p className="text-center leading-7">
                            Kami tidak dapat menemukan pesanan anda silahkan diperiksa kembali
                        </p>
                    </section>
                    <div id="ResultBooking" className="space-y-[20px]">
                        <section
                            id="BookingStatus"
                            className="flex flex-col items-center gap-4 rounded-3xl border border-shujia-graylight bg-white px-[14px] py-[14px]"
                        >
                            <div className="flex w-full items-center justify-between">
                                <h3 className="font-semibold">Booking Status</h3>
                                <button type="button" data-expand="BookingStatusJ">
                                    <img
                                        src="/assets/images/icons/bottom-booking-form.svg"
                                        alt="icon"
                                        className="h-[32px] w-[32px] shrink-0"
                                    />
                                </button>
                            </div>
                            <div id="BookingStatusJ" className="w-full pb-10">
                                <div className="flex items-center relative">

                                    {/* GARIS BELAKANG */}
                                    <div className="absolute left-0 right-0 top-[12px] h-2 bg-[#F4F5F7] rounded-full" />

                                    {/* GARIS AKTIF (atur width sesuai progress) */}
                                    <div className="absolute left-0 top-[12px] h-2 bg-[#0CA024] rounded-full w-1/2" />

                                    {/* STEP 1 */}
                                    <div className="flex-1 relative flex flex-col items-center">
                                        <div className="z-10 flex h-6 w-6 items-center justify-center rounded-full bg-[#0CA024] text-xs font-bold text-white">
                                            1
                                        </div>
                                        <p className="mt-2 text-xs text-center font-semibold">
                                            Booking<br />Created
                                        </p>
                                    </div>

                                    {/* STEP 2 */}
                                    <div className="flex-1 relative flex flex-col items-center">
                                        <div className="z-10 flex h-6 w-6 items-center justify-center rounded-full bg-[#0CA024] text-xs font-bold text-white">
                                            2
                                        </div>
                                        <p className="mt-2 text-xs text-center font-semibold">
                                            Verifying<br />Payment
                                        </p>
                                    </div>

                                    {/* STEP 3 */}
                                    <div className="flex-1 relative flex flex-col items-center">
                                        <div className="z-10 flex h-6 w-6 items-center justify-center rounded-full bg-[#0CA024] text-xs font-bold text-white">
                                            3
                                        </div>
                                        <p className="mt-2 text-xs text-center font-semibold">
                                            Start<br />Working
                                        </p>
                                    </div>

                                </div>
                            </div>

                        </section>
                        <section
                            id="WorkingSchedule"
                            className="flex flex-col gap-4 rounded-3xl border border-shujia-graylight bg-white px-[14px] py-[14px]"
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold">Working Schedule</h3>
                                <button type="button" data-expand="WorkingScheduleJ">
                                    <img
                                        src="/assets/images/icons/bottom-booking-form.svg"
                                        alt="icon"
                                        className="h-8 w-8 shrink-0"
                                    />
                                </button>
                            </div>

                            <div id="WorkingScheduleJ" className="flex flex-col gap-4">

                                {/* Date */}
                                <label className="flex flex-col gap-2">
                                    <h4 className="font-semibold">Date</h4>

                                    <div className="flex h-[52px] w-full items-center overflow-hidden rounded-full border border-shujia-graylight bg-[#F4F5F7]">
                                        <img
                                            src="/assets/images/icons/date-booking-form.svg"
                                            alt="icon"
                                            className="ml-[14px] h-6 w-6 shrink-0"
                                        />
                                        <input
                                            readOnly
                                            type="text"
                                            defaultValue="17 October 2024"
                                            className="h-full w-full !ml-2 bg-transparent px-3 font-semibold focus:outline-none"
                                        />
                                    </div>
                                </label>

                                {/* Start Time */}
                                <label className="flex flex-col gap-2">
                                    <h4 className="font-semibold">Start Time At</h4>

                                    <div className="flex h-[52px] w-full items-center overflow-hidden rounded-full border border-shujia-graylight bg-[#F4F5F7]">
                                        <img
                                            src="/assets/images/icons/clock-booking-form.svg"
                                            alt="icon"
                                            className="ml-[14px] h-6 w-6 shrink-0"
                                        />
                                        <input
                                            readOnly
                                            type="text"
                                            defaultValue="09:00"
                                            className="h-full w-full !ml-2 bg-transparent px-3 font-semibold focus:outline-none"
                                        />
                                    </div>
                                </label>

                            </div>
                        </section>

                        <section
                            id="ServicesOrdered"
                            className="flex flex-col gap-4 rounded-3xl border border-shujia-graylight bg-white px-[14px] py-[14px]"
                        >
                            <div className="flex items-center justify-between">
                                <h2 className="font-semibold">Services Ordered</h2>
                                <button type="button" data-expand="ServicesOrderedJ">
                                    <img
                                        src="/assets/images/icons/bottom-booking-form.svg"
                                        alt="icon"
                                        className="h-[32px] w-[32px] shrink-0"
                                    />
                                </button>
                            </div>
                            <div className="flex flex-col gap-4" id="ServicesOrderedJ">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-[90px] w-[80px] shrink-0 items-center justify-center overflow-hidden rounded-3xl">
                                        <img
                                            src="/assets/images/thumbnails/clean-mini-cart.png"
                                            alt="image"
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <h3 className="line-clamp-2 h-[42px] text-sm font-semibold leading-[21px]">
                                            Home Family Theater Best Lights Installation
                                        </h3>
                                        <div className="flex items-center gap-[6px]">
                                            <div className="flex items-center gap-1">
                                                <img
                                                    src="/assets/images/icons/coint.svg"
                                                    alt="icon"
                                                    className="h-4 w-4 shrink-0"
                                                />
                                                <p className="text-xs leading-[18px] text-shujia-gray">
                                                    Rp 8.489.391
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <img
                                                    src="/assets/images/icons/clock-cart.svg"
                                                    alt="icon"
                                                    className="h-4 w-4 shrink-0"
                                                />
                                                <p className="text-xs leading-[18px] text-shujia-gray">
                                                    15 Hours
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr className="border-shujia-graylight" />
                                <div className="flex items-center gap-3">
                                    <div className="flex h-[90px] w-[80px] shrink-0 items-center justify-center overflow-hidden rounded-3xl">
                                        <img
                                            src="/assets/images/thumbnails/swim-mini-cart.png"
                                            alt="image"
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <h3 className="line-clamp-2 h-[42px] text-sm font-semibold leading-[21px]">
                                            Home Family Theater Best Lights Installation
                                        </h3>
                                        <div className="flex items-center gap-[6px]">
                                            <div className="flex items-center gap-1">
                                                <img
                                                    src="/assets/images/icons/coint.svg"
                                                    alt="icon"
                                                    className="h-4 w-4 shrink-0"
                                                />
                                                <p className="text-xs leading-[18px] text-shujia-gray">
                                                    Rp 8.489.391
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <img
                                                    src="/assets/images/icons/clock-cart.svg"
                                                    alt="icon"
                                                    className="h-4 w-4 shrink-0"
                                                />
                                                <p className="text-xs leading-[18px] text-shujia-gray">
                                                    15 Hours
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                                        className="h-[32px] w-[32px] shrink-0"
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
                                        <p className="text-shujia-gray">Booking ID</p>
                                    </div>
                                    <strong className="font-semibold">SHUJIA198291</strong>
                                </div>
                                <hr className="border-shujia-graylight" />
                                <div className="flex justify-between">
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
                                <div className="flex justify-between">
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
                                <hr className="border-shujia-graylight" />
                                <div className="flex justify-between">
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
                                <hr className="border-shujia-graylight" />
                                <div className="flex w-full items-center justify-center overflow-hidden rounded-3xl">
                                    <img
                                        src="/assets/images/thumbnails/buktitf.png"
                                        alt="image"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            </div>
                        </section>
                        <section
                            id="PersonalInformations"
                            className="flex flex-col gap-4 rounded-3xl border border-shujia-graylight bg-white px-[14px] py-[14px]"
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold">Personal Informations</h3>
                                <button type="button" data-expand="PersonalInformationsJ">
                                    <img
                                        src="/assets/images/icons/bottom-booking-form.svg"
                                        alt="icon"
                                        className="h-8 w-8 shrink-0"
                                    />
                                </button>
                            </div>

                            <div id="PersonalInformationsJ" className="flex flex-col gap-4">

                                {/* Full Name */}
                                <label className="flex flex-col gap-2">
                                    <h4 className="font-semibold">Full Name</h4>

                                    <div className="flex h-[52px] w-full items-center overflow-hidden rounded-full border border-shujia-graylight bg-[#F4F5F7]">
                                        <img
                                            src="/assets/images/icons/profil-booking-form.svg"
                                            alt="icon"
                                            className="ml-[14px] h-6 w-6 shrink-0"
                                        />
                                        <input
                                            readOnly
                                            type="text"
                                            defaultValue="Shayna Aliza"
                                            className="h-full w-full !ml-2 bg-transparent px-3 font-semibold focus:outline-none"
                                        />
                                    </div>
                                </label>

                                {/* Email */}
                                <label className="flex flex-col gap-2">
                                    <h4 className="font-semibold">Email Address</h4>

                                    <div className="flex h-[52px] w-full items-center overflow-hidden rounded-full border border-shujia-graylight bg-[#F4F5F7]">
                                        <img
                                            src="/assets/images/icons/amplop-booking-form.svg"
                                            alt="icon"
                                            className="ml-[14px] h-6 w-6 shrink-0"
                                        />
                                        <input
                                            readOnly
                                            type="email"
                                            defaultValue="shayna@bossqu.com"
                                            className="h-full w-full !ml-2 bg-transparent px-3 font-semibold focus:outline-none"
                                        />
                                    </div>
                                </label>

                                {/* Phone */}
                                <label className="flex flex-col gap-2">
                                    <h4 className="font-semibold">No. Phone</h4>

                                    <div className="flex h-[52px] w-full items-center overflow-hidden rounded-full border border-shujia-graylight bg-[#F4F5F7]">
                                        <img
                                            src="/assets/images/icons/telepon-booking-form.svg"
                                            alt="icon"
                                            className="ml-[14px] h-6 w-6 shrink-0"
                                        />
                                        <input
                                            readOnly
                                            type="tel"
                                            defaultValue="628123123123"
                                            className="h-full w-full !ml-2 bg-transparent px-3 font-semibold focus:outline-none"
                                        />
                                    </div>
                                </label>

                            </div>
                        </section>

                        <section
                            id="YourHomeAddress"
                            className="flex flex-col gap-4 rounded-3xl border border-shujia-graylight bg-white px-[14px] py-[14px]"
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold">Your Home Address</h3>
                                <button type="button" data-expand="YourHomeAddressJ">
                                    <img
                                        src="/assets/images/icons/bottom-booking-form.svg"
                                        alt="icon"
                                        className="h-8 w-8 shrink-0"
                                    />
                                </button>
                            </div>

                            <div id="YourHomeAddressJ" className="flex flex-col gap-4">

                                {/* Address */}
                                <label className="flex flex-col gap-2">
                                    <h4 className="font-semibold">Address</h4>

                                    <div className="flex w-full gap-3 rounded-[22px] border border-shujia-graylight bg-[#F4F5F7] px-[14px] py-[14px]">
                                        <img
                                            src="/assets/images/icons/school-booking-form.svg"
                                            alt="icon"
                                            className="h-6 w-6 shrink-0"
                                        />
                                        <textarea
                                            readOnly
                                            className="h-[82px] w-full resize-none bg-transparent font-semibold leading-7 focus:outline-none"
                                            defaultValue="Jalan satu dua tiga empat dekat lima tapi dibagi no 192"
                                        />
                                    </div>
                                </label>

                                {/* City */}
                                <label className="flex flex-col gap-2">
                                    <h4 className="font-semibold">City</h4>

                                    <div className="flex h-[52px] w-full items-center overflow-hidden rounded-full border border-shujia-graylight bg-[#F4F5F7]">
                                        <img
                                            src="/assets/images/icons/location-booking-form.svg"
                                            alt="icon"
                                            className="ml-[14px] h-6 w-6 shrink-0"
                                        />
                                        <select
                                            disabled
                                            className="h-full w-full !ml-2 appearance-none bg-transparent px-3 font-semibold focus:outline-none"
                                        >
                                            <option>Buitenzorg</option>
                                            <option>Surabaya</option>
                                            <option selected>Jakarta</option>
                                        </select>
                                    </div>
                                </label>

                                {/* Post Code */}
                                <label className="flex flex-col gap-2">
                                    <h4 className="font-semibold">Post Code</h4>

                                    <div className="flex h-[52px] w-full items-center overflow-hidden rounded-full border border-shujia-graylight bg-[#F4F5F7]">
                                        <img
                                            src="/assets/images/icons/ball-booking-form.svg"
                                            alt="icon"
                                            className="ml-[14px] h-6 w-6 shrink-0"
                                        />
                                        <input
                                            readOnly
                                            type="tel"
                                            defaultValue="1839812"
                                            className="h-full w-full !ml-2 bg-transparent px-3 font-semibold focus:outline-none"
                                        />
                                    </div>
                                </label>

                            </div>
                        </section>

                    </div>
                </div>
                <nav className="fixed bottom-5 left-0 right-0 z-30 mx-auto w-full">
                    <div className="mx-auto max-w-[640px] px-5">
                        <div className="rounded-[24px] bg-shujia-black px-[20px] py-[14px]">
                            <ul className="flex items-center gap-[10.67px]">
                                <li className="shrink-0">
                                    <a href="#">
                                        <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full border border-shujia-graylight hover:border-shujia-orange">
                                            <img
                                                src="/assets/images/icons/note-form-check-black.svg"
                                                alt="icon"
                                                className="h-[22px] w-[22px] shrink-0"
                                            />
                                        </div>
                                    </a>
                                </li>
                                <li className="w-full">
                                    <a href="#">
                                        <div className="flex items-center justify-center gap-2 rounded-full bg-shujia-orange px-[18px] py-[10px] hover:shadow-[0px_4px_10px_0px_#D04B1E80]">
                                            <img
                                                src="/assets/images/icons/list-form-check-white.svg"
                                                alt="icon"
                                                className="h-6 w-6 shrink-0"
                                            />
                                            <p className="text-sm font-semibold leading-[21px] text-white">
                                                My Booking
                                            </p>
                                        </div>
                                    </a>
                                </li>
                                <li className="shrink-0">
                                    <a href="#">
                                        <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full border border-shujia-graylight hover:border-shujia-orange">
                                            <img
                                                src="/assets/images/icons/chat.svg"
                                                alt="icon"
                                                className="h-[22px] w-[22px] shrink-0"
                                            />
                                        </div>
                                    </a>
                                </li>
                                <li className="shrink-0">
                                    <a href="#">
                                        <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full border border-shujia-graylight hover:border-shujia-orange">
                                            <img
                                                src="/assets/images/icons/profil.svg"
                                                alt="icon"
                                                className="h-[22px] w-[22px] shrink-0"
                                            />
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </main>

        </div>
    )
}

export default MyBookingPage
