import { ThreeDPhotoCarousel } from "@/components/ui/3d-carousel";

export function ThreeDPhotoCarouselDemo() {
  return (
    <div className="w-full max-w-4xl">
      <div className="min-h-[500px] space-y-4 rounded-lg border border-dashed">
        <div className="p-2">
          <ThreeDPhotoCarousel
            images={[
              "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=80",
              "https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?auto=format&fit=crop&w=900&q=80",
            ]}
          />
        </div>
      </div>
    </div>
  );
}
