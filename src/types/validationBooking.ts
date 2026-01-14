import { z } from 'zod';

// validasi form booking
export const bookingSchema = z.object({
    name: z.string().min(1, "Name Is Required"),
    email: z.string().email("Invalid Email"),
    phone: z.string().min(1, "Phone Number Is Required"),
    started_time: z.string().min(1, "Start Time Is Required"),
    schedule_at: z.string().min(1, "Schedule Date Is Required"),
    post_code: z.string().min(1, "Post Code Is Required"),
    address: z.string().min(1, "Address Is Required"),
    city: z.string().min(1, "City Is Required"),
});

// validasi proof berupa file
export const paymentSchema = z.object({
    proof: z.instanceof(File).refine((file) => file.size > 0, "Proof Of Payment Is Required"),
});

export const viewBookingSchema = z.object({
    booking_trx_id: z.string().min(1, "Booking Transaction Code Is Required"),
    email: z.string().email("Invalid Email"),
});