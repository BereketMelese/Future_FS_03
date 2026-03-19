"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Button from "@/src/components/ui/Button";
import ProductCard from "@/src/features/menu/components/ProductCard";
import { products, testimonials } from "@/src/features/menu/data/menu.data";
import { resolveProductImageUrl } from "@/src/lib/image-url";

const FEATURED_ITEMS_COUNT = 4;
const FEATURED_ROTATION_MS = 20_000;

function getShuffledProducts(items) {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[index],
    ];
  }

  return shuffled;
}

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export default function HomePage() {
  const [featured, setFeatured] = useState(() =>
    products.slice(0, FEATURED_ITEMS_COUNT),
  );

  const marqueeProducts = useMemo(() => [...products, ...products], []);
  const [marqueeImageFallbacks, setMarqueeImageFallbacks] = useState({});

  useEffect(() => {
    setFeatured(getShuffledProducts(products).slice(0, FEATURED_ITEMS_COUNT));

    const rotationTimer = setInterval(() => {
      setFeatured(getShuffledProducts(products).slice(0, FEATURED_ITEMS_COUNT));
    }, FEATURED_ROTATION_MS);

    return () => clearInterval(rotationTimer);
  }, []);

  return (
    <div className="space-y-20 pb-6">
      <section className="section-shell">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hero-image glass-panel overflow-hidden rounded-3xl"
        >
          <div className="px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
            <p className="mb-4 text-sm uppercase tracking-[0.35em] text-(--muted)">
              Addis Cup Coffee House
            </p>
            <h1 className="max-w-2xl text-4xl leading-tight sm:text-5xl lg:text-6xl">
              Crafted Coffee. Perfect Moments.
            </h1>
            <p className="mt-6 max-w-xl text-base text-[rgba(245,233,220,0.82)] sm:text-lg">
              A refined coffee ritual in the heart of the city. Slow-brewed
              beans, warm lights, and conversations that linger.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/menu">Explore Menu</Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <Link href="/about">Our Story</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      <motion.section {...fadeUp} className="section-shell space-y-8">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-3xl sm:text-4xl">Featured Picks</h2>
          <Link
            href="/menu"
            className="text-sm text-(--accent) hover:underline"
          >
            Explore all offerings
          </Link>
        </div>

        <div className="menu-marquee-shell">
          <div className="menu-marquee-track">
            {marqueeProducts.map((item, index) => (
              <article
                key={`${item.id}-${index}`}
                className="menu-marquee-item"
              >
                <Image
                  src={
                    marqueeImageFallbacks[item.id]
                      ? item.image
                      : resolveProductImageUrl(item.image)
                  }
                  alt={item.name}
                  width={44}
                  height={44}
                  onError={() =>
                    setMarqueeImageFallbacks((current) => ({
                      ...current,
                      [item.id]: true,
                    }))
                  }
                  className="h-11 w-11 rounded-full border border-[rgba(245,233,220,0.16)] object-cover"
                />
                <p className="text-sm uppercase tracking-[0.08em] text-[rgba(245,233,220,0.9)]">
                  {item.name}
                </p>
                <p className="rounded-full bg-[rgba(198,139,89,0.18)] px-2 py-1 text-xs text-(--accent)">
                  {item.price.toFixed(0)} ETB
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </motion.section>

      <motion.section
        {...fadeUp}
        className="section-shell grid items-center gap-8 rounded-3xl border border-[rgba(245,233,220,0.1)] bg-[rgba(35,35,35,0.85)] p-6 sm:p-10 lg:grid-cols-2"
      >
        <div>
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-(--muted)">
            About Addis Cup
          </p>
          <h2 className="text-3xl sm:text-4xl">
            Where Coffee Meets Quiet Luxury
          </h2>
          <p className="mt-5 text-muted">
            We source beans from traceable farms, roast in small batches, and
            train every barista to craft every cup like a signature dish. Our
            house is designed for both quick inspiration and long, meaningful
            pauses.
          </p>
          <Button asChild className="mt-7">
            <Link href="/about">Read Our Story</Link>
          </Button>
        </div>
        <div className="h-85 rounded-2xl border border-[rgba(245,233,220,0.15)] bg-[url('/images/coff-beans.jpg')] bg-cover bg-center" />
      </motion.section>

      <motion.section {...fadeUp} className="section-shell space-y-8">
        <h2 className="text-3xl sm:text-4xl">What Guests Say</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.45 }}
              className="glass-panel rounded-2xl p-6"
            >
              <p className="text-lg leading-relaxed text-(--secondary)">
                "{item.quote}"
              </p>
              <p className="mt-5 text-sm text-(--accent)">{item.name}</p>
              <p className="text-xs text-muted">{item.role}</p>
            </motion.article>
          ))}
        </div>
      </motion.section>

      <motion.section
        {...fadeUp}
        className="section-shell rounded-3xl border border-[rgba(245,233,220,0.1)] bg-[rgba(32,32,32,0.86)] p-6 sm:p-8"
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="text-3xl">Find Us</h2>
            <p className="mt-4 text-muted">
              Alemgena. Open daily from 7:00 AM to 11:00 PM. Walk-ins welcome,
              reservations optional.
            </p>
            <p className="mt-5 text-sm text-(--accent)">+251 93 788 12 56</p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-[rgba(245,233,220,0.1)]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d993.0482184980007!2d38.66481025533502!3d8.93517466365527!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b81cbb2f2047b%3A0x106cccdf3d02bf6f!2z4Yuo4YuL4YqV4YyL4YiqIOGKoOGKreGIsuGLjuGKlSDhiJvhiIXhiaDhiK0g4YiF4YqV4Yy7IFlld2FuZ2FyaQ!5e1!3m2!1sen!2set!4v1773924811972!5m2!1sen!2set"
              className="h-70 w-full"
              loading="lazy"
              title="Addis Cup location map"
            />
          </div>
        </div>
      </motion.section>
    </div>
  );
}
