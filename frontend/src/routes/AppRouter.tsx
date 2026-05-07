import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { I18nProvider } from '../contexts/I18nContext'
import { useLocalCart } from '../hooks/useLocalCart'
import { useWishlist } from '../hooks/useWishlist'

import AnnouncementBar from '../components/layout/AnnouncementBar'
import Header          from '../components/layout/Header'
import Footer          from '../components/layout/Footer'
import CartDrawer      from '../components/cart/CartDrawer'
import SearchModal     from '../components/search/SearchModal'

import ProtectedRoute from './ProtectedRoute'
import RoleRoute      from './RoleRoute'

import HomePage          from '../pages/public/HomePage'
import ShopPage          from '../pages/public/ShopPage'
import ProductDetailPage from '../pages/public/ProductDetailPage'
import LoginPage         from '../pages/auth/LoginPage'
import RegisterPage      from '../pages/auth/RegisterPage'
import CheckoutPage      from '../pages/client/CheckoutPage'
import OrdersPage        from '../pages/client/OrdersPage'
import WishlistPage      from '../pages/client/WishlistPage'
import DashboardPage     from '../pages/admin/DashboardPage'
import AdminProductsPage from '../pages/admin/AdminProductsPage'
import AdminOrdersPage   from '../pages/admin/AdminOrdersPage'

function AppShell() {
  const [cartOpen, setCartOpen]     = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const cart = useLocalCart()
  const wish = useWishlist()

  return (
    <>
      <AnnouncementBar />
      <Header
        cartCount={cart.count}
        wishCount={wish.count}
        onOpenCart={() => setCartOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
      />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart.items}
        count={cart.count}
        subtotal={cart.subtotal}
        updateQty={cart.updateQty}
        remove={cart.remove}
      />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />

      <Routes>
        <Route path="/"              element={<HomePage />} />
        <Route path="/tienda"        element={<ShopPage />} />
        <Route path="/producto/:slug" element={<ProductDetailPage />} />
        <Route path="/login"         element={<LoginPage />} />
        <Route path="/registro"      element={<RegisterPage />} />
        <Route path="/favoritos"     element={<WishlistPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/mis-pedidos" element={<OrdersPage />} />
          <Route path="/checkout"    element={<CheckoutPage />} />
        </Route>

        <Route element={<RoleRoute allowedRoles={['admin', 'employee']} />}>
          <Route path="/admin"           element={<DashboardPage />} />
          <Route path="/admin/productos" element={<AdminProductsPage />} />
          <Route path="/admin/pedidos"   element={<AdminOrdersPage />} />
        </Route>
      </Routes>

      <Footer />
    </>
  )
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <I18nProvider>
        <AppShell />
      </I18nProvider>
    </BrowserRouter>
  )
}
