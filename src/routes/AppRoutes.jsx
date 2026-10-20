import { Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Home from '../pages/Home';
import HeroPage from '../pages/HeroPage';
import CategoriesPage from '../pages/CategoriesPage';
import FeaturedProductsPage from '../pages/FeaturedProductsPage';
import NewArrivalsPage from '../pages/NewArrivalsPage';
import OffersPage from '../pages/OffersPage';
import TestimonialsPage from '../pages/TestimonialsPage';
import ShopAllPage from '../pages/ShopAllPage';
import OurStoryPage from '../pages/OurStoryPage';
import ProductDetailsPage from '../pages/ProductDetailsPage';
import CartPage from '../pages/CartPage';
import NotFound from '../pages/NotFound';

import PersonalDetailsPage from '../pages/PersonalDetailsPage';
import MyOrdersPage from '../pages/MyOrdersPage';
import OrderDetailsPage from '../pages/OrderDetailsPage';
import AddressBookPage from '../pages/AddressBookPage';
import EditAddressPage from '../pages/EditAddressPage';
import SavedPiecesPage from '../pages/SavedPiecesPage';
import PreferencesPage from '../pages/PreferencesPage';
import HelpPage from '../pages/HelpPage';
import CheckoutPage from '../pages/CheckoutPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/hero" element={<HeroPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/featured-products" element={<FeaturedProductsPage />} />
        <Route path="/new-arrivals" element={<NewArrivalsPage />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/shop" element={<ShopAllPage />} />
        <Route path="/our-story" element={<OurStoryPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/account" element={<PersonalDetailsPage />} />
        <Route path="/account/orders" element={<MyOrdersPage />} />
        <Route path="/account/orders/:id" element={<OrderDetailsPage />} />
        <Route path="/account/addresses" element={<AddressBookPage />} />
        <Route path="/account/addresses/:id/edit" element={<EditAddressPage />} />
        <Route path="/account/addresses/new" element={<EditAddressPage />} />
        <Route path="/account/saved" element={<SavedPiecesPage />} />
        <Route path="/account/preferences" element={<PreferencesPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
