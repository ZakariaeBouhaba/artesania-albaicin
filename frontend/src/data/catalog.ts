export interface Category {
  id: string
  es: string
  en: string
  sub_es: string
  sub_en: string
  count: number
  img: string
}

export interface Product {
  id: string
  cat: string
  es: string
  en: string
  desc_es: string
  desc_en: string
  materials_es: string
  materials_en: string
  origin: string
  price: number
  old: number | null
  tag: 'new' | 'sale' | null
  imgs: string[]
}

export const CATEGORIES: Category[] = [
  { id: "perfumes",  es: "Perfumes árabes",     en: "Arabian Perfumes",   sub_es: "Attar · Aceites · Fragancias",        sub_en: "Attar · Oils · Fragrances",         count: 48, img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1400&q=70" },
  { id: "alfombras", es: "Alfombras",           en: "Rugs & Tapestries",  sub_es: "Bereber · Kilim · Anudadas",          sub_en: "Berber · Kilim · Hand-knotted",     count: 32, img: "https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&w=1400&q=70" },
  { id: "cuero",     es: "Piel & Cuero",        en: "Leather Goods",      sub_es: "Bolsos · Babuchas · Marroquinería",   sub_en: "Bags · Babouches · Leatherwork",    count: 64, img: "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=1400&q=70" },
  { id: "ceramica",  es: "Cerámica & Zellige",  en: "Ceramics & Zellige", sub_es: "Platos · Azulejos · Tagine",          sub_en: "Plates · Tiles · Tagine",           count: 41, img: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1400&q=70" },
  { id: "ropa",      es: "Kaftanes & Túnicas",  en: "Kaftans & Tunics",   sub_es: "Bordado · Lino · Seda",               sub_en: "Embroidery · Linen · Silk",         count: 28, img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1400&q=70" },
  { id: "lamparas",  es: "Lámparas & Faroles",  en: "Lanterns & Lights",  sub_es: "Latón calado · Vidrio · Mosaico",     sub_en: "Pierced brass · Glass · Mosaic",    count: 36, img: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1400&q=70" },
  { id: "te",        es: "Té & Especias",       en: "Tea & Spices",       sub_es: "Menta · Azafrán · Ras el hanout",     sub_en: "Mint · Saffron · Ras el hanout",    count: 22, img: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=1400&q=70" },
  { id: "joyeria",   es: "Joyería bereber",     en: "Berber Jewelry",     sub_es: "Plata · Ámbar · Coral",                sub_en: "Silver · Amber · Coral",            count: 39, img: "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=1400&q=70" },
  { id: "souvenirs", es: "Recuerdos",           en: "Souvenirs",          sub_es: "Magnetos · Postales · Mini-lámparas", sub_en: "Magnets · Postcards · Mini-lamps",  count: 54, img: "https://images.unsplash.com/photo-1551892589-865f69869476?auto=format&fit=crop&w=1400&q=70" },
]

const IMG: Record<string, string[]> = {
  perfumes: [
    "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=70",
    "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=70",
    "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=900&q=70",
    "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=900&q=70",
  ],
  alfombras: [
    "https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&w=900&q=70",
    "https://images.unsplash.com/photo-1606744824163-985d376605aa?auto=format&fit=crop&w=900&q=70",
    "https://images.unsplash.com/photo-1584285405429-136bf988919c?auto=format&fit=crop&w=900&q=70",
  ],
  cuero: [
    "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=900&q=70",
    "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=70",
    "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=900&q=70",
  ],
  ceramica: [
    "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=900&q=70",
    "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=70",
    "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=900&q=70",
  ],
  ropa: [
    "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=70",
    "https://images.unsplash.com/photo-1606293926249-ed22f5a4a8ac?auto=format&fit=crop&w=900&q=70",
    "https://images.unsplash.com/photo-1583391733975-b54f44ec0eef?auto=format&fit=crop&w=900&q=70",
  ],
  lamparas: [
    "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=900&q=70",
    "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=900&q=70",
  ],
  te: [
    "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=900&q=70",
    "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=900&q=70",
    "https://images.unsplash.com/photo-1545048702-79362596cdc9?auto=format&fit=crop&w=900&q=70",
  ],
  joyeria: [
    "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=900&q=70",
    "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=70",
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=70",
  ],
  souvenirs: [
    "https://images.unsplash.com/photo-1551892589-865f69869476?auto=format&fit=crop&w=900&q=70",
    "https://images.unsplash.com/photo-1543340713-8c1aab1d8f4f?auto=format&fit=crop&w=900&q=70",
  ],
}

export const PRODUCTS: Product[] = [
  { id: "p1001", cat: "perfumes", es: "Attar de Rosa Damascena", en: "Damascus Rose Attar", desc_es: "Aceite puro de rosa de Damasco destilado al fuego lento. Una sola gota basta para envolver la piel todo el día. Frasco soplado a mano en cristal con tapón filigranado.", desc_en: "Pure Damascus rose oil distilled over slow fire. A single drop is enough to wrap the skin all day. Hand-blown crystal flask with filigreed cap.", materials_es: "Aceite esencial 100% · Cristal soplado", materials_en: "100% essential oil · Blown crystal", origin: "Marruecos · Marrakech", price: 89, old: null, tag: "new", imgs: IMG.perfumes },
  { id: "p1002", cat: "perfumes", es: "Oud Royal del Albaycín", en: "Albaycín Royal Oud", desc_es: "Mezcla profunda de oud cambodiano, ámbar gris y mirra. Notas amaderadas que evocan los patios de la Alhambra al anochecer.", desc_en: "Deep blend of Cambodian oud, ambergris and myrrh. Woody notes evoking the Alhambra courtyards at dusk.", materials_es: "Oud · Ámbar · Mirra", materials_en: "Oud · Amber · Myrrh", origin: "Granada · Albaycín", price: 145, old: null, tag: null, imgs: IMG.perfumes },
  { id: "p1003", cat: "perfumes", es: "Musk Blanco de Granada", en: "Granada White Musk", desc_es: "Musk delicado con jazmín de noche y un fondo de cedro andalusí. Limpio, envolvente, atemporal.", desc_en: "Delicate musk with night jasmine and an Andalusian cedar base. Clean, enveloping, timeless.", materials_es: "Musk · Jazmín · Cedro", materials_en: "Musk · Jasmine · Cedar", origin: "Granada", price: 64, old: 78, tag: "sale", imgs: IMG.perfumes },
  { id: "p1004", cat: "alfombras", es: "Beni Ourain Natural", en: "Natural Beni Ourain", desc_es: "Alfombra bereber tejida a mano en lana virgen. Patrón geométrico en negro sobre marfil, diseño atemporal del Atlas Medio.", desc_en: "Berber rug hand-woven from virgin wool. Geometric black-on-ivory pattern, timeless design from the Middle Atlas.", materials_es: "Lana virgen 100% · Tejida a mano", materials_en: "100% virgin wool · Hand-woven", origin: "Marruecos · Atlas Medio", price: 420, old: null, tag: null, imgs: IMG.alfombras },
  { id: "p1005", cat: "alfombras", es: "Kilim Vintage Azilal", en: "Vintage Azilal Kilim", desc_es: "Kilim de la región de Azilal con motivos tribales en ocre, terracota y azul añil. Pieza de colección, tejida en los años ochenta.", desc_en: "Kilim from the Azilal region with tribal motifs in ochre, terracotta and indigo. Collector's piece, woven in the eighties.", materials_es: "Lana teñida naturalmente · Vintage", materials_en: "Naturally dyed wool · Vintage", origin: "Marruecos · Azilal", price: 680, old: null, tag: "new", imgs: IMG.alfombras },
  { id: "p1006", cat: "cuero", es: "Bolso de Cuero Repujado", en: "Embossed Leather Bag", desc_es: "Bolso de mano en cuero de ternera natural repujado con motivos de arabescos. Cosido a mano, sin pegamentos, duración generacional.", desc_en: "Hand bag in natural calf leather embossed with arabesque motifs. Hand-stitched, no adhesives, generational durability.", materials_es: "Cuero de ternera natural · Latón", materials_en: "Natural calf leather · Brass", origin: "Marruecos · Fez", price: 185, old: 220, tag: "sale", imgs: IMG.cuero },
  { id: "p1007", cat: "cuero", es: "Babuchas de Marraquech", en: "Marrakech Babouches", desc_es: "Babuchas artesanales de cuero curtido vegetal. Suela en piel gruesa, bordado floral dorado. El calzado del Albaycín.", desc_en: "Handcrafted vegetable-tanned leather babouches. Thick leather sole, gold floral embroidery. The footwear of the Albaycín.", materials_es: "Cuero curtido vegetal · Bordado hilo de oro", materials_en: "Vegetable-tanned leather · Gold thread embroidery", origin: "Marruecos · Marrakech", price: 78, old: null, tag: null, imgs: IMG.cuero },
  { id: "p1008", cat: "ceramica", es: "Plato Zellige Azul Fez", en: "Fez Blue Zellige Plate", desc_es: "Plato de cerámica tradicional con esmalte azul cobalto y decoración geométrica zellige. Firmado por el maestro alfarero.", desc_en: "Traditional ceramic plate with cobalt blue glaze and zellige geometric decoration. Signed by the master potter.", materials_es: "Cerámica · Esmalte de cobalto · Hecho a mano", materials_en: "Ceramic · Cobalt glaze · Hand-made", origin: "Marruecos · Fez", price: 48, old: null, tag: null, imgs: IMG.ceramica },
  { id: "p1009", cat: "ceramica", es: "Tajín de Barro Pintado", en: "Painted Clay Tagine", desc_es: "Tajín en barro natural pintado con pigmentos de tierra. Apto para cocción directa al fuego. Diseño berebere del Alto Atlas.", desc_en: "Natural clay tagine painted with earth pigments. Suitable for direct fire cooking. Berber design from the High Atlas.", materials_es: "Barro natural · Pigmentos minerales", materials_en: "Natural clay · Mineral pigments", origin: "Marruecos · Alto Atlas", price: 65, old: null, tag: "new", imgs: IMG.ceramica },
  { id: "p1010", cat: "lamparas", es: "Farol de Latón Calado", en: "Pierced Brass Lantern", desc_es: "Farol de latón martillado y calado a mano. Proyecta constelaciones de luz sobre las paredes. Diseño moriscoandamusí.", desc_en: "Hammered and hand-pierced brass lantern. Projects constellations of light onto walls. Moorish-Andalusian design.", materials_es: "Latón martillado · Cristal ámbar", materials_en: "Hammered brass · Amber glass", origin: "Marruecos · Marrakech", price: 120, old: null, tag: null, imgs: IMG.lamparas },
  { id: "p1011", cat: "te", es: "Té Verde de Menta Nana", en: "Nana Mint Green Tea", desc_es: "Mezcla del mejor gunpowder marroquí con menta nana fresca deshidratada. El té de bienvenida del Albaycín.", desc_en: "Blend of the finest Moroccan gunpowder with fresh dehydrated nana mint. The welcoming tea of the Albaycín.", materials_es: "Té gunpowder · Menta nana", materials_en: "Gunpowder tea · Nana mint", origin: "Marruecos · Meknes", price: 18, old: null, tag: null, imgs: IMG.te },
  { id: "p1012", cat: "joyeria", es: "Collar de Plata y Ámbar", en: "Silver & Amber Necklace", desc_es: "Collar artesanal en plata 925 con colgante de ámbar báltico auténtico. Cada pieza es única, con piedra irrepetible.", desc_en: "Handcrafted sterling silver necklace with authentic Baltic amber pendant. Each piece is unique, with unrepeatable stone.", materials_es: "Plata 925 · Ámbar báltico", materials_en: "Sterling silver · Baltic amber", origin: "Marruecos · Tiznit", price: 210, old: null, tag: "new", imgs: IMG.joyeria },
  { id: "p1013", cat: "joyeria", es: "Mano de Fátima en Plata", en: "Silver Hand of Fatima", desc_es: "Khamsa repujada en plata marroquí con ojo de esmalte azul. Amuleto tradicional de protección, tamaño ideal para colgar.", desc_en: "Khamsa embossed in Moroccan silver with blue enamel eye. Traditional protection amulet, ideal hanging size.", materials_es: "Plata marroquí · Esmalte azul", materials_en: "Moroccan silver · Blue enamel", origin: "Marruecos · Fez", price: 56, old: 70, tag: "sale", imgs: IMG.joyeria },
  { id: "p1014", cat: "ropa", es: "Kaftan de Lino Bordado", en: "Embroidered Linen Kaftan", desc_es: "Kaftan en lino natural con bordado a mano en hilo de seda. Diseño tunecino contemporáneo. Cómodo, transpirable, elegant.", desc_en: "Natural linen kaftan with hand-embroidered silk thread. Contemporary Tunisian design. Comfortable, breathable, elegant.", materials_es: "Lino natural · Hilo de seda", materials_en: "Natural linen · Silk thread", origin: "Túnez · Sfax", price: 145, old: null, tag: null, imgs: IMG.ropa },
  { id: "p1015", cat: "cuero", es: "Cartera de Cuero Nappa", en: "Nappa Leather Wallet", desc_es: "Cartera slim en cuero nappa marroquí. Interior con 6 tarjetas, billetero y compartimento de monedas. Cosida a mano.", desc_en: "Slim wallet in Moroccan nappa leather. Interior with 6 card slots, banknote and coin compartment. Hand-stitched.", materials_es: "Cuero nappa · Hilo de seda", materials_en: "Nappa leather · Silk thread", origin: "Marruecos · Fez", price: 52, old: null, tag: null, imgs: IMG.cuero },
  { id: "p1016", cat: "perfumes", es: "Ámbar de Marrakech", en: "Marrakech Amber", desc_es: "Ámbar sólido en cofre de latón cincelado. Aroma cálido y resinoso, ideal para perfumar el cabello o la ropa.", desc_en: "Solid amber in a chiseled brass casket. Warm resinous aroma, perfect for hair and clothes.", materials_es: "Ámbar sólido · Latón cincelado", materials_en: "Solid amber · Chiseled brass", origin: "Marruecos · Marrakech", price: 38, old: null, tag: null, imgs: IMG.perfumes },
]

export const FEATURED = PRODUCTS.filter(p => ['p1001','p1004','p1006','p1010'].includes(p.id))
export const BEST = PRODUCTS.filter(p => ['p1002','p1007','p1009','p1012'].includes(p.id))
