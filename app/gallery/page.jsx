import Link from "next/link";
import PageInteractiveHandler from "@/components/PageInteractiveHandler";

export const metadata = {
  "title": "Gallery | Netcoder Technology - Explore Our IT Training, workshops, activities Moments",
  "description": "Explore the Netcoder Technology gallery to see highlights from our IT training programs, student projects, workshops, and events in Dharamshala. Discover the vibrant learning community we foster",
  "openGraph": {
    "title": "Gallery | Netcoder Technology - Explore Our IT Training, workshops, activities Moments",
    "description": "Explore the Netcoder Technology gallery to see highlights from our IT training programs, student projects, workshops, and events in Dharamshala. Discover the vibrant learning community we foster",
    "url": "https://www.netcoder.in/gallery",
    "siteName": "Netcoder Technology",
    "type": "website"
  },
  "alternates": {
    "canonical": "https://www.netcoder.in/gallery"
  }
};

export default function GalleryPage() {
  return (
    <>
      <PageInteractiveHandler pageSlug="gallery" />

      <section className="page-hero">
                <ul className="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
          </ul>
                <div className="page-title">
                    <div>GALLERY</div>
                    <p>HOME /             <b>Gallery</b></p>
          </div>
        </section>

      
      <div className="container gallery-card">
                <div>
                    <img src="/images/netcoder classroom.jpg" alt="Netcoder Classroom" loading="lazy" decoding="async" />
          </div>
                <div>
                    <img src="/images/netcoder lab.jpg" alt="Netcoder Lab" loading="lazy" decoding="async" />
          </div>
                <div>
                    <img src="/images/Event-Netcoder.jpg" alt="Netcoder Event" loading="lazy" decoding="async" />
          </div>
                <div>
                    <img src="/images/Award- netcoder.jpg" alt="Netcoder Award" loading="lazy" decoding="async" />
          </div>
                <div>
                    <img src="/images/img-NT.jpg" alt="Netcoder Training" loading="lazy" decoding="async" />
          </div>
                <div>
                    <img src="/images/Int-Netcoder.jpg" alt="Netcoder Internship Certificate" loading="lazy" decoding="async" />
          </div>
                <div>
                    <img src="/images/Internship- Netcoder.png" alt="Netcoder Internship" loading="lazy" decoding="async" />
          </div>
                <div>
                    <img src="/images/Internship-Students.jpg" alt="Netcoder Students" loading="lazy" decoding="async" />
          </div>
                <div>
                    <img src="/images/Workshop-Netcoder.jpg" alt="Netcoder Workshop" loading="lazy" decoding="async" />
          </div>
                <div>
                    <img src="/images/06.jpg" alt="Netcoder Activity" loading="lazy" decoding="async" />
          </div>
        </div>

      
    </>
  );
}
