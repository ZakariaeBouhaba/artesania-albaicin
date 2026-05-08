import Hero from '../../components/home/Hero'
import CategoryGrid from '../../components/home/CategoryGrid'
import ValuesStrip from '../../components/home/ValuesStrip'
import FeaturedProducts from '../../components/home/FeaturedProducts'
import Editorial from '../../components/home/Editorial'
import BoutiqueMap from '../../components/home/BoutiqueMap'
import NewsletterBand from '../../components/home/NewsletterBand'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <CategoryGrid />
      <ValuesStrip />
      <FeaturedProducts />
      <Editorial />
      <BoutiqueMap />
      <NewsletterBand />
    </main>
  )
}
