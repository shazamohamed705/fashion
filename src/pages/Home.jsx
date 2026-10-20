import HeroSection from '../components/home/HeroSection';
import CategoriesSection from '../components/home/CategoriesSection';
import OurStorySection from '../components/home/OurStorySection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import NewArrivals from '../components/home/NewArrivals';
import LinenEditBanner from '../components/home/LinenEditBanner';
import OffersSection from '../components/home/OffersSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import NewsletterSection from '../components/home/NewsletterSection';
import EditorialCategoriesSection from '../components/home/EditorialCategoriesSection';
import RealLifeTestimonials from '../components/home/RealLifeTestimonials';
import DetailsSection from '../components/home/DetailsSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <OurStorySection />
      <NewArrivals />
      <LinenEditBanner />
      <EditorialCategoriesSection />
      <RealLifeTestimonials />
      <NewsletterSection />
    </>
  );
}
