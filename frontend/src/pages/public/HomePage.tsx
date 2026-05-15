import Hero from '../../components/home/Hero'
import CategoryGrid from '../../components/home/CategoryGrid'
import FeaturedCollections from '../../components/home/FeaturedCollections'
import ValuesStrip from '../../components/home/ValuesStrip'
import FeaturedProducts from '../../components/home/FeaturedProducts'
import Editorial from '../../components/home/Editorial'
import BoutiqueMap from '../../components/home/BoutiqueMap'
import CategoriasGrid from '../../components/home/CategoriasGrid'
import NewsletterBand from '../../components/home/NewsletterBand'
import MapErrorBoundary from '../../components/ui/MapErrorBoundary'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <CategoryGrid />
      <FeaturedCollections />
      <ValuesStrip />
      <FeaturedProducts />
      <Editorial />
      <MapErrorBoundary>
        <BoutiqueMap />
      </MapErrorBoundary>
      <CategoriasGrid />
      <NewsletterBand />
    </main>
  )
}
