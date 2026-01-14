export interface HomeService {
    id: number,
    name: string,
    slug: string,
    thumbnail: string,
    about: string,
    category: Category,
    is_popular: boolean,
    price: number,
    duration: number,
    serviceBenefits: ServiceBenefit[], //type relasi
    serviceTestimonials: ServiceTestimonial[], //type relasi
}

export interface Category {
    name: string,
    slug: string,
    photo: string,
    photo_white: string,
    homeServices_count: number, //untuk limit
    homeServices: HomeService[], //type relasi
    popular_services: HomeService[], //untuk is_popular
}

interface ServiceBenefit {
    id: number,
    name: string,
    home_service: HomeService, //type relasi
}

interface ServiceTestimonial {
    id: number,
    name: string,
    message: string,
    photo: string,
    home_service: HomeService //type relasi
}

export interface BookingTransaction {
    id: 1,
    booking_trx_id: string,
    name: string,
    phone: string,
    email: string,
    proof: string,
    address: string,
    city: string,
    post_code: string,
    started_time: string,
    schedule_at: string,
    sub_total: number,
    total_amount: number,
    total_tax_amount: number,
    is_paid: boolean,
    transactionDetails: TransactionDetail[], //type relasi
}

interface TransactionDetail {
    id: number,
    price: number,
    home_service_id: number,
    home_service: HomeService, //type relasi
    booking_transaction: BookingTransaction, //type relasi
}

//interface untuk keranjang
export interface CartItem {
    home_service_id: number,
    slug: string,
    quantity: number,
}

//type untuk booking form data
export type BookingFormData = {
    name: string,
    email: string,
    phone: string,
    started_time: string,
    schedule_at: string,
    post_code: string,
    address: string,
    city: string,
}




