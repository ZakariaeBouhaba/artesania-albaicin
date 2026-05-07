import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'

type Lang = 'es' | 'en'

const I18N: Record<Lang, Record<string, string>> = {
  es: {
    announce_pre: "Envío gratuito en pedidos superiores a 120€",
    announce_strong: "PRESENTANDO LA COLECCIÓN AL-ANDALUS",
    announce_post: "Edición limitada · Otoño 2026",
    nav_shop: "Tienda", nav_collections: "Colecciones", nav_artisans: "Artesanos", nav_journal: "Diario", nav_visit: "Visítanos",
    hero_eyebrow: "Bazar de Granada · Desde 1987",
    hero_title_pre: "Tesoros del", hero_title_em: "Mediterráneo", hero_title_post: "hechos a mano",
    hero_sub: "Una selección curada de perfumes árabes, alfombras bereberes, piel repujada, cerámica zellige y joyería de plata, traída desde los talleres del norte de África y Andalucía hasta el corazón del Albaycín.",
    hero_cta_main: "Explorar la tienda", hero_cta_alt: "Nuestra historia",
    hero_meta_left: "Granada, España", hero_meta_artisans: "ARTESANOS", hero_meta_collections: "COLECCIONES",
    cats_eyebrow: "El Bazar", cats_title: "Categorías\nde la casa",
    cats_lead: "Cada categoría es el resultado de años de viajes y conversaciones con maestros artesanos. Nada se produce en masa.",
    featured_eyebrow: "Selección del maestro", featured_title: "Lo que destaca\neste mes",
    featured_lead: "Piezas elegidas a mano por nuestro fundador. Stock limitado, todas únicas.", view_all: "Ver todo",
    values_1_t: "Hecho a mano", values_1_p: "Cada pieza ha sido tocada por las manos de un artesano. Sin atajos.",
    values_2_t: "Comercio justo", values_2_p: "Pagamos directamente al taller. Sin intermediarios, sin regateo abusivo.",
    values_3_t: "Envío mundial", values_3_p: "Embalado a mano y enviado desde Granada en 48 h.",
    values_4_t: "Cambios 30 días", values_4_p: "Si una pieza no encuentra su sitio en tu casa, vuelve a nosotros.",
    story_eyebrow: "Nuestra historia", story_title: "Una tienda en\nel barrio del Albaycín",
    story_p1: "Desde 1987, nuestra familia recorre los zocos de Marrakech, Fez, Esauira y Tetuán para traer al Albaycín objetos elegidos uno a uno.",
    story_p2: "No vendemos «lo de siempre». Buscamos talleres pequeños, métodos antiguos, materiales nobles.",
    story_cta: "Conoce nuestros artesanos", story_stamp: "Fundado\n1987\nAlbaycín",
    visit_eyebrow: "Visítanos en Granada", visit_title: "La boutique\nfrente a la Alhambra",
    visit_p: "Nuestra tienda histórica está en el corazón del Albaycín, a tres minutos del Mirador de San Nicolás.",
    visit_addr: "Dirección", visit_addr_v: "Cuesta del Chapiz, 14\n18010 Albaycín, Granada",
    visit_hours: "Horario", visit_hours_v: "Lunes a sábado 10:00 – 21:00\nDomingo 11:00 – 18:00",
    visit_phone: "Teléfono", visit_phone_v: "+34 958 22 18 47", visit_cta: "Cómo llegar",
    news_eyebrow: "Diario del Albaycín", news_title: "Recibe nuestras nuevas piezas\nantes que nadie",
    news_p: "Una carta al mes con las llegadas del último viaje, historias de los talleres y un descuento ocasional. Sin ruido.",
    news_placeholder: "Tu correo", news_cta: "Suscribirme",
    cat_page_title: "Catálogo completo", cat_page_lead: "Cada producto del bazar, filtrable y buscable.",
    filter_cat: "Categoría", filter_price: "Precio", filter_origin: "Origen", filter_color: "Color", filter_clear: "Limpiar filtros",
    sort_relevance: "Relevancia", sort_new: "Más nuevos", sort_priceasc: "Precio: menor a mayor", sort_pricedesc: "Precio: mayor a menor",
    results: "resultados",
    add_cart: "Añadir al carrito", buy_now: "Comprar ahora", view: "Ver pieza",
    tag_new: "Nuevo", tag_sale: "Rebaja",
    origin: "Origen", materials: "Materiales", size: "Tamaño", color: "Color",
    free_ship: "Envío gratis a partir de 120€", handcrafted: "Pieza hecha a mano · Única",
    shipped_from: "Enviado desde Granada en 48 h", returns_30: "Devolución 30 días",
    cart: "Carrito", cart_empty_t: "Tu carrito está vacío",
    cart_empty_p: "Aún no has guardado ninguna pieza. Cada objeto del bazar es único; vuelve cuando la encuentres.",
    cart_empty_cta: "Volver a la tienda",
    subtotal: "Subtotal", shipping: "Envío", shipping_calc: "Calculado en el checkout",
    tax: "Impuestos", tax_inc: "Incluidos", total: "Total", checkout: "Tramitar pedido",
    promo_placeholder: "Código promocional", apply: "Aplicar",
    checkout_title: "Tramitar pedido", step_info: "Información", step_ship: "Envío", step_pay: "Pago",
    contact: "Contacto", contact_sub: "Te enviaremos la confirmación a este correo",
    email: "Correo electrónico", shipping_addr: "Dirección de envío", shipping_sub: "Embalado a mano y enviado desde nuestra tienda",
    first_name: "Nombre", last_name: "Apellidos", addr1: "Dirección", addr2: "Apartamento, piso (opcional)",
    city: "Ciudad", postal: "Código postal", country: "País", phone: "Teléfono",
    payment: "Forma de pago", payment_sub: "Todas las transacciones son seguras y cifradas",
    pay_card: "Tarjeta de crédito", pay_paypal: "PayPal", pay_bank: "Transferencia bancaria", pay_apple: "Apple Pay",
    complete_order: "Completar pedido", order_summary: "Resumen del pedido",
    search_placeholder: "Busca perfumes, alfombras, lámparas…", search_close: "Cerrar",
    search_popular: "Búsquedas populares", search_empty: "No encontramos nada con «{q}». Prueba con otro término.",
    footer_about: "Bazar de artesanía traída del Mediterráneo desde 1987. Cuesta del Chapiz, 14 · Albaycín, Granada.",
    footer_shop: "Tienda", footer_help: "Ayuda", footer_about_h: "La casa",
    footer_h_ship: "Envíos y devoluciones", footer_h_size: "Cuidado de las piezas",
    footer_h_contact: "Contáctanos", footer_h_faq: "Preguntas frecuentes",
    footer_a_story: "Nuestra historia", footer_a_artisans: "Artesanos", footer_a_journal: "Diario", footer_a_visit: "Visítanos",
    footer_legal: "© 2026 Artesanía Albaycín, S.L. · Todos los derechos reservados",
    footer_terms: "Términos", footer_privacy: "Privacidad",
  },
  en: {
    announce_pre: "Free shipping on orders over €120",
    announce_strong: "INTRODUCING THE AL-ANDALUS COLLECTION",
    announce_post: "Limited edition · Autumn 2026",
    nav_shop: "Shop", nav_collections: "Collections", nav_artisans: "Artisans", nav_journal: "Journal", nav_visit: "Visit us",
    hero_eyebrow: "Granada Bazaar · Since 1987",
    hero_title_pre: "Treasures of the", hero_title_em: "Mediterranean", hero_title_post: "made by hand",
    hero_sub: "A curated selection of Arabian perfumes, Berber rugs, hand-tooled leather, zellige ceramics and silver jewelry — sourced from workshops across North Africa and Andalusia.",
    hero_cta_main: "Enter the shop", hero_cta_alt: "Our story",
    hero_meta_left: "Granada, Spain", hero_meta_artisans: "ARTISANS", hero_meta_collections: "COLLECTIONS",
    cats_eyebrow: "The Bazaar", cats_title: "Categories\nof the house",
    cats_lead: "Each category is the result of years of travel and conversations with master artisans. Nothing is mass-produced.",
    featured_eyebrow: "Master's selection", featured_title: "What stands out\nthis month",
    featured_lead: "Pieces hand-picked by our founder. Limited stock, all unique.", view_all: "View all",
    values_1_t: "Made by hand", values_1_p: "Every piece has been touched by an artisan's hands. No shortcuts.",
    values_2_t: "Fair trade", values_2_p: "We pay the workshop directly. No middlemen, no abusive haggling.",
    values_3_t: "Worldwide shipping", values_3_p: "Hand-packed and shipped from Granada within 48 h.",
    values_4_t: "30-day returns", values_4_p: "If a piece doesn't find its place at home, send it back.",
    story_eyebrow: "Our story", story_title: "A shop in\nthe Albaycín quarter",
    story_p1: "Since 1987 our family has travelled the souks of Marrakech, Fez, Essaouira and Tetouan to bring back to the Albaycín objects chosen one by one.",
    story_p2: "We don't sell \"the usual stuff\". We seek out small workshops, old methods, noble materials.",
    story_cta: "Meet our artisans", story_stamp: "Founded\n1987\nAlbaycín",
    visit_eyebrow: "Visit us in Granada", visit_title: "The boutique\nfacing the Alhambra",
    visit_p: "Our historic shop sits at the heart of the Albaycín, three minutes from the Mirador de San Nicolás.",
    visit_addr: "Address", visit_addr_v: "Cuesta del Chapiz, 14\n18010 Albaycín, Granada",
    visit_hours: "Hours", visit_hours_v: "Monday to Saturday 10:00 – 21:00\nSunday 11:00 – 18:00",
    visit_phone: "Phone", visit_phone_v: "+34 958 22 18 47", visit_cta: "Get directions",
    news_eyebrow: "The Albaycín Journal", news_title: "Receive our new pieces\nbefore anyone else",
    news_p: "One letter a month with arrivals from the last trip, stories from the workshops and the occasional discount.",
    news_placeholder: "Your email", news_cta: "Subscribe",
    cat_page_title: "Full catalogue", cat_page_lead: "Every product in the bazaar, filterable and searchable.",
    filter_cat: "Category", filter_price: "Price", filter_origin: "Origin", filter_color: "Colour", filter_clear: "Clear filters",
    sort_relevance: "Relevance", sort_new: "Newest", sort_priceasc: "Price: low to high", sort_pricedesc: "Price: high to low",
    results: "results",
    add_cart: "Add to cart", buy_now: "Buy now", view: "View piece",
    tag_new: "New", tag_sale: "Sale",
    origin: "Origin", materials: "Materials", size: "Size", color: "Colour",
    free_ship: "Free shipping over €120", handcrafted: "Made by hand · Unique piece",
    shipped_from: "Shipped from Granada within 48 h", returns_30: "30-day returns",
    cart: "Cart", cart_empty_t: "Your cart is empty",
    cart_empty_p: "You haven't saved any piece yet. Every object in the bazaar is unique; come back when you've found yours.",
    cart_empty_cta: "Back to the shop",
    subtotal: "Subtotal", shipping: "Shipping", shipping_calc: "Calculated at checkout",
    tax: "Tax", tax_inc: "Included", total: "Total", checkout: "Checkout",
    promo_placeholder: "Promo code", apply: "Apply",
    checkout_title: "Checkout", step_info: "Information", step_ship: "Shipping", step_pay: "Payment",
    contact: "Contact", contact_sub: "We'll send your confirmation to this email",
    email: "Email", shipping_addr: "Shipping address", shipping_sub: "Hand-packed and shipped from our shop",
    first_name: "First name", last_name: "Last name", addr1: "Address", addr2: "Apartment, suite (optional)",
    city: "City", postal: "Postal code", country: "Country", phone: "Phone",
    payment: "Payment method", payment_sub: "All transactions are secure and encrypted",
    pay_card: "Credit card", pay_paypal: "PayPal", pay_bank: "Bank transfer", pay_apple: "Apple Pay",
    complete_order: "Complete order", order_summary: "Order summary",
    search_placeholder: "Search perfumes, rugs, lanterns…", search_close: "Close",
    search_popular: "Popular searches", search_empty: "Nothing found for \"{q}\". Try another term.",
    footer_about: "Mediterranean handicraft bazaar since 1987. Cuesta del Chapiz, 14 · Albaycín, Granada.",
    footer_shop: "Shop", footer_help: "Help", footer_about_h: "The house",
    footer_h_ship: "Shipping & returns", footer_h_size: "Care guide",
    footer_h_contact: "Contact us", footer_h_faq: "FAQ",
    footer_a_story: "Our story", footer_a_artisans: "Artisans", footer_a_journal: "Journal", footer_a_visit: "Visit us",
    footer_legal: "© 2026 Artesanía Albaycín, S.L. · All rights reserved",
    footer_terms: "Terms", footer_privacy: "Privacy",
  },
}

interface I18nContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: string) => string
}

export const I18nContext = createContext<I18nContextValue>({
  lang: 'es',
  setLang: () => {},
  t: (k) => k,
})

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = localStorage.getItem('aa_lang')
    return (stored === 'en' ? 'en' : 'es') as Lang
  })

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    localStorage.setItem('aa_lang', l)
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const t = useCallback((key: string) => I18N[lang][key] ?? key, [lang])

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>
}

export function useI18n() {
  return useContext(I18nContext)
}
