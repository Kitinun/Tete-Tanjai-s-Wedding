import dynamic from 'next/dynamic';
import HeroSection from '@/components/HeroSection';

// Lazy loaded components for below-the-fold content
const InvitationSection = dynamic(() => import('@/components/InvitationSection'), { ssr: true });
const MapSection = dynamic(() => import('@/components/MapSection'), { ssr: true });
const GallerySection = dynamic(() => import('@/components/GallerySection'), { ssr: true });
const SeatingSection = dynamic(() => import('@/components/SeatingSection'), { ssr: true });
const GuestbookSection = dynamic(() => import('@/components/GuestbookSection'), { ssr: true });
const GiftingSection = dynamic(() => import('@/components/GiftingSection'), { ssr: true });
const RsvpSection = dynamic(() => import('@/components/RsvpSection'), { ssr: true });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white overflow-x-hidden selection:bg-[#94C0D5] selection:text-white">
      <HeroSection />
      <InvitationSection />
      <MapSection />
      <GallerySection />
      <SeatingSection />
      <GuestbookSection />
      <GiftingSection />
      <RsvpSection />
    </main>
  );
}
