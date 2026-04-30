import { motion } from "framer-motion";
import { ArrowRight, Clock, Flame, MapPin, Minus, Phone, Plus, ShieldCheck, ShoppingBag, Sparkles, Star, UserRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "./components/Button";
import { useChickenBackend } from "./hooks/useChickenBackend";
import { menuItems } from "./lib/store";

gsap.registerPlugin(ScrollTrigger);

const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;

const assets = {
  heroVideo: asset("chicken-hero.mp4"),
  logo: asset("chicken-master-logo-true.webp"),
  aiBucket: asset("chicken-master-bucket-ai.webp"),
  roast: asset("spice-roast.jpg"),
  fryer: asset("fryer.jpg"),
  experience: asset("experience.jpg"),
  renaissance: asset("renaissance.jpg"),
  box: asset("chicken-master-bucket-ai.webp"),
  frites: asset("real-fries-cut.webp"),
};

const story = [
  {
    n: "01",
    title: "Frit sur commande",
    body: "Chaque pièce est préparée à la commande, panée à la main et servie chaude.",
    image: assets.roast,
    icon: Flame,
  },
  {
    n: "02",
    title: "Poulet croustillant",
    body: "Ailes dorées, crispy généreux, buckets à partager, burgers, chawarma et frites.",
    image: assets.fryer,
    icon: Sparkles,
  },
  {
    n: "03",
    title: "Menus Dakar",
    body: "Menus complets de 2 800 Fr à 4 300 Fr, avec burger, ailes, frites et boisson.",
    image: assets.box,
    icon: ShoppingBag,
  },
  {
    n: "04",
    title: "Fass et Yoff",
    body: "Deux adresses à Dakar, ouvertes de 9h à minuit, avec commande par WhatsApp.",
    image: assets.renaissance,
    icon: MapPin,
  },
];

const mapEmbeds = [
  {
    title: "Chicken Master Cheikh Anta Diop",
    src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3858.8!2d-17.4677!3d14.6937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDQxJzM3LjQiTiAxN8KwMjgnMDMuNyJX!5e0!3m2!1sfr!2ssn!4v1",
  },
  {
    title: "Chicken Master Yoff",
    src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3858.4!2d-17.4833!3d14.7597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDQ1JzM0LjkiTiAxN8KwMjgnNTkuOSJX!5e0!3m2!1sfr!2ssn!4v1",
  },
];

const locations = [
  {
    name: "Cheikh Anta Diop",
    address: "Avenue Cheikh Anta Diop, Fass, Dakar",
    phone: "+221 78 423 59 59",
    href: "tel:+221784235959",
    whatsapp: "https://wa.me/221784235959?text=Bonjour%2C%20je%20souhaite%20passer%20une%20commande%20chez%20Chicken%20Master%20Fass",
  },
  {
    name: "Yoff",
    address: "Avenue Seydina Limamoulaye, Dakar",
    phone: "+221 77 357 85 44",
    href: "tel:+221773578544",
    whatsapp: "https://wa.me/221773578544?text=Bonjour%2C%20je%20souhaite%20passer%20une%20commande%20chez%20Chicken%20Master%20Yoff",
  },
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("fr-SN").format(price) + " FCFA";
}

function App() {
  const backend = useChickenBackend();
  const root = useRef<HTMLDivElement>(null);
  const [name, setName] = useState("Ami du Master");
  const [phone, setPhone] = useState("+221 ");
  const [address, setAddress] = useState("Plateau, Dakar");
  const [lastOrder, setLastOrder] = useState<string | null>(null);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".nav-item", {
        y: -22,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: "power3.out",
      });
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 72, opacity: 0, filter: "blur(14px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 82%" },
          },
        );
      });
      gsap.utils.toArray<HTMLElement>(".pan-shot").forEach((el) => {
        gsap.to(el, {
          backgroundPosition: "62% center",
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1.1 },
        });
      });
      gsap.fromTo(
        ".hero-word",
        { yPercent: 115, rotate: 3 },
        { yPercent: 0, rotate: 0, duration: 1.05, stagger: 0.13, ease: "power4.out" },
      );
      gsap.to(".hero-kicker", {
        xPercent: -50,
        duration: 16,
        repeat: -1,
        ease: "none",
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const submitOrder = () => {
    if (!backend.user) backend.signIn(name, phone);
    const order = backend.checkout(address);
    setLastOrder(order.id.slice(0, 8).toUpperCase());
  };

  return (
    <div ref={root} className="relative min-h-screen overflow-hidden bg-coal text-cream">
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/45 backdrop-blur-xl">
        <nav className="mx-auto flex h-24 max-w-7xl items-center justify-between px-5">
          <a href="#home" className="nav-item flex items-center gap-3">
            <span className="block h-20 w-20 overflow-hidden bg-transparent">
              <img className="h-full w-full object-contain" src={assets.logo} alt="Chicken Master" />
            </span>
            <span className="hidden font-display text-2xl uppercase leading-none sm:block">
              Chicken <span className="block text-ember">Master</span>
            </span>
          </a>
          <div className="nav-item hidden items-center gap-8 text-xs font-black uppercase md:flex">
            <a href="#menu">Menu</a>
            <a href="#experience">Experience</a>
            <a href="#adresses">Adresses</a>
            <a href="#commande">Commander</a>
          </div>
          <Button className="nav-item h-11" onClick={() => document.querySelector("#commande")?.scrollIntoView({ behavior: "smooth" })}>
            Commander <ArrowRight size={16} />
          </Button>
        </nav>
      </header>

      <main className="relative z-10">
        <section id="home" className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_78%_25%,rgba(245,158,11,0.34),transparent_28%),radial-gradient(circle_at_18%_78%,rgba(239,78,34,0.22),transparent_32%),linear-gradient(135deg,#090705_0%,#180d08_46%,#050403_100%)]">
          <motion.video
            initial={{ scale: 1.04, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.58 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={assets.aiBucket}
            src={assets.heroVideo}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,7,5,0.96)_0%,rgba(9,7,5,0.82)_43%,rgba(9,7,5,0.34)_100%),radial-gradient(circle_at_78%_36%,rgba(245,158,11,0.28),transparent_30%)]" />
          <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(90deg,#fff_1px,transparent_1px),linear-gradient(#fff_1px,transparent_1px)] [background-size:64px_64px]" />
          <div className="absolute -right-32 top-20 h-96 w-96 rounded-full border border-ember/25" />
          <div className="absolute -right-16 top-36 h-64 w-64 rounded-full border border-flame/25" />
          <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-5 pb-16 pt-32 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-ember/35 bg-black/35 px-4 py-2 text-xs font-black uppercase text-ember">
                <Star size={15} fill="currentColor" /> Note 4.1/5 - Dakar, Senegal
              </div>
              <h1 className="font-display text-[clamp(4rem,12vw,10.5rem)] uppercase leading-[0.82] text-white drop-shadow-[0_8px_28px_rgba(0,0,0,0.85)]">
                <span className="block overflow-hidden pb-2">
                  <span className="hero-word block">Chicken</span>
                </span>
                <span className="block overflow-hidden pb-2 text-ember">
                  <span className="hero-word block">Master</span>
                </span>
              </h1>
              <div className="mt-3 max-w-xl overflow-hidden border-y border-ember/30 py-2 text-sm font-black uppercase text-ember">
                <div className="hero-kicker flex w-[200%] gap-6 whitespace-nowrap">
                  <span>Frit sur commande</span>
                  <span>Big Burger</span>
                  <span>Mix Bucket</span>
                  <span>Ailes épicées</span>
                  <span>Fass</span>
                  <span>Yoff</span>
                  <span>Frit sur commande</span>
                  <span>Big Burger</span>
                  <span>Mix Bucket</span>
                  <span>Ailes épicées</span>
                  <span>Fass</span>
                  <span>Yoff</span>
                </div>
              </div>
              <p className="mt-6 max-w-xl text-lg font-semibold leading-8 text-white drop-shadow-[0_3px_14px_rgba(0,0,0,0.75)]">
                Le meilleur poulet frit de Dakar. Fass et Yoff, ouvert de 9h à minuit, commande rapide par WhatsApp.
              </p>
              <div className="mt-6 grid max-w-xl gap-3 text-sm font-bold text-white sm:grid-cols-3">
                <span className="rounded-md border border-ember/25 bg-black/55 px-3 py-3 backdrop-blur">Fass CAD</span>
                <span className="rounded-md border border-ember/25 bg-black/55 px-3 py-3 backdrop-blur">Yoff VDN</span>
                <span className="rounded-md border border-ember/25 bg-black/55 px-3 py-3 backdrop-blur">Livraison</span>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button onClick={() => document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" })}>
                  Voir le menu <ShoppingBag size={18} />
                </Button>
                <Button variant="outline" onClick={() => window.open(locations[0].whatsapp, "_blank", "noopener,noreferrer")}>
                  WhatsApp <Phone size={18} />
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25, duration: 0.9 }}
              className="grid gap-4"
            >
              <div className="overflow-visible rounded-lg border border-white/10 bg-[radial-gradient(circle_at_50%_30%,rgba(245,158,11,0.28),rgba(0,0,0,0.62)_48%,rgba(0,0,0,0.9)_100%)] p-3 shadow-ember sm:p-6">
                <img className="h-auto max-h-[430px] w-full object-contain drop-shadow-[0_24px_42px_rgba(0,0,0,0.75)]" src={assets.aiBucket} alt="Bucket Chicken Master" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[assets.experience, assets.roast, assets.frites].map((image) => (
                  <motion.img
                    key={image}
                    whileHover={{ y: -8, scale: 1.04 }}
                    className="h-28 w-full rounded-lg border border-white/10 bg-black/45 object-contain p-2 drop-shadow-[0_12px_24px_rgba(0,0,0,0.65)]"
                    src={image}
                    alt=""
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-ember py-4 text-coal">
          <div className="flex w-[200%] animate-marquee gap-8 whitespace-nowrap font-display text-4xl uppercase">
            {Array.from({ length: 10 }).map((_, index) => (
              <span key={index}>Crispy Dakar • Sauce Master • Livraison chaude • Poulet feu •</span>
            ))}
          </div>
        </section>

        <section id="experience" className="relative">
          {story.map((item, index) => {
            const Icon = item.icon;
            return (
              <article
                key={item.n}
                className="pan-shot reveal grid min-h-[520px] border-b border-white/10 bg-cover bg-center lg:grid-cols-[0.48fr_0.52fr]"
                style={{ backgroundImage: `linear-gradient(90deg,#090705 0%,rgba(9,7,5,0.93) 35%,rgba(9,7,5,0.25) 100%),url(${item.image})` }}
              >
                <div className="flex flex-col justify-center px-6 py-16 sm:px-12 lg:px-20">
                  <div className="mb-8 flex items-center gap-4 text-white/22">
                    <span className="font-display text-7xl">{item.n}</span>
                    <span className="h-px w-20 bg-white/25" />
                  </div>
                  <Icon className="mb-5 text-ember" size={34} />
                  <h2 className="font-display text-5xl uppercase leading-none text-white sm:text-6xl">
                    {item.title.split(" ")[0]} <span className="block text-ember">{item.title.split(" ").slice(1).join(" ")}</span>
                  </h2>
                  <p className="mt-6 max-w-sm text-base leading-7 text-white/76">{item.body}</p>
                  {index === 2 && (
                    <Button className="mt-7 w-fit" onClick={() => document.querySelector("#commande")?.scrollIntoView({ behavior: "smooth" })}>
                      Je commande <ArrowRight size={17} />
                    </Button>
                  )}
                </div>
              </article>
            );
          })}
        </section>

        <section id="menu" className="mx-auto max-w-7xl px-5 py-24">
          <div className="reveal mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase text-ember">Vraie carte Chicken Master</p>
              <h2 className="mt-3 font-display text-6xl uppercase leading-none text-white">Les classiques</h2>
            </div>
              <p className="max-w-md text-white/65">Burgers, buckets, ailes croustillantes, frites dorées et boissons fraîches, préparés pour les grosses faims de Dakar.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {menuItems.map((item) => (
              <motion.article
                key={item.id}
                whileHover={{ y: -6, scale: 1.01 }}
                className="reveal overflow-hidden rounded-lg border border-white/10 bg-white/[0.055] backdrop-blur"
              >
                <div className="h-56 overflow-hidden bg-[radial-gradient(circle_at_50%_30%,rgba(245,158,11,0.24),rgba(0,0,0,0.35)_44%,rgba(0,0,0,0.82)_100%)] p-4">
                  <motion.img
                    whileHover={{ scale: 1.08, rotate: -1 }}
                    transition={{ duration: 0.7 }}
                    className="h-full w-full object-contain drop-shadow-[0_20px_34px_rgba(0,0,0,0.72)]"
                    src={item.image}
                    alt=""
                  />
                </div>
                <div className="p-5">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-3xl uppercase text-white">{item.name}</h3>
                      <p className="mt-1 text-xs font-black uppercase text-ember/80">{item.category}</p>
                      <p className="mt-2 text-sm leading-6 text-white/66">{item.description}</p>
                    </div>
                    <span className="rounded-full bg-ember px-3 py-1 text-xs font-black uppercase text-coal">
                      {item.badge}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <strong className="text-xl text-ember">{formatPrice(item.price)}</strong>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" className="h-10 w-10 px-0" onClick={() => backend.remove(item.id)} aria-label="Retirer">
                        <Minus size={16} />
                      </Button>
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-black/40 font-black">{backend.cart[item.id] ?? 0}</span>
                      <Button className="h-10 w-10 px-0" onClick={() => backend.add(item.id)} aria-label="Ajouter">
                        <Plus size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="reveal relative min-h-[520px] overflow-hidden">
          <img className="absolute inset-0 h-full w-full object-cover" src={assets.experience} alt="" />
          <div className="absolute inset-0 bg-gradient-to-r from-coal via-coal/72 to-transparent" />
          <div className="relative mx-auto flex min-h-[520px] max-w-7xl items-center px-5">
            <div className="max-w-xl">
              <ShieldCheck className="mb-5 text-ember" size={42} />
              <h2 className="font-display text-6xl uppercase leading-none text-white">Le goût qui réveille Dakar</h2>
              <p className="mt-6 text-lg leading-8 text-white/72">
                Une panure dorée, des pièces servies chaudes, des sauces généreuses et cette odeur de poulet frit qui donne envie de commander tout de suite.
              </p>
            </div>
          </div>
        </section>

        <section id="adresses" className="mx-auto max-w-7xl px-5 py-24">
          <div className="reveal mb-12">
            <p className="text-sm font-black uppercase text-ember">Retrouvez-nous</p>
            <h2 className="mt-3 font-display text-6xl uppercase leading-none text-white">Fass & Yoff</h2>
            <p className="mt-5 max-w-2xl text-white/65">Deux adresses à Dakar, ouvertes tous les jours de 9h à 00h. Commande directe par téléphone ou WhatsApp.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {locations.map((location) => (
              <article key={location.name} className="reveal rounded-lg border border-white/10 bg-white/[0.055] p-6 backdrop-blur">
                <MapPin className="mb-5 text-ember" size={34} />
                <h3 className="font-display text-4xl uppercase text-white">{location.name}</h3>
                <p className="mt-3 text-white/70">{location.address}</p>
                <div className="mt-5 flex flex-wrap gap-3 text-sm text-white/68">
                  <span className="inline-flex items-center gap-2 rounded-full bg-black/30 px-4 py-2">
                    <Clock size={15} /> 9h - 00h
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-black/30 px-4 py-2">
                    <Phone size={15} /> {location.phone}
                  </span>
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button onClick={() => window.open(location.whatsapp, "_blank", "noopener,noreferrer")}>
                    WhatsApp <ArrowRight size={16} />
                  </Button>
                  <Button variant="outline" onClick={() => window.open(location.href, "_self")}>
                    Appeler
                  </Button>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {mapEmbeds.map((map) => (
              <div key={map.title} className="reveal overflow-hidden rounded-lg border border-white/10 bg-black/45">
                <iframe
                  className="h-[360px] w-full"
                  src={map.src}
                  title={map.title}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            ))}
          </div>
        </section>

        <section id="commande" className="mx-auto grid max-w-7xl gap-8 px-5 py-24 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="reveal rounded-lg border border-white/10 bg-white/[0.055] p-6 backdrop-blur-xl">
            <div className="mb-6 flex items-center gap-3">
              <UserRound className="text-ember" />
              <h2 className="font-display text-4xl uppercase text-white">Compte express</h2>
            </div>
            <label className="mb-4 block text-xs font-black uppercase text-white/50">Nom</label>
            <input className="mb-5 h-12 w-full rounded-md border border-white/10 bg-black/35 px-4 text-white outline-none focus:border-ember" value={name} onChange={(e) => setName(e.target.value)} />
            <label className="mb-4 block text-xs font-black uppercase text-white/50">Téléphone</label>
            <input className="mb-5 h-12 w-full rounded-md border border-white/10 bg-black/35 px-4 text-white outline-none focus:border-ember" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <Button variant="outline" onClick={() => backend.signIn(name, phone)}>
              {backend.user ? "Compte enregistré" : "Créer mon compte"}
            </Button>
            <div className="mt-7 border-t border-white/10 pt-5 text-sm text-white/62">
              {backend.orders.length} commande{backend.orders.length > 1 ? "s" : ""} en mémoire locale.
            </div>
          </div>

          <div className="reveal rounded-lg border border-ember/35 bg-black/55 p-6 shadow-ember backdrop-blur-xl">
            <h2 className="font-display text-5xl uppercase text-white">Commande Master</h2>
            <div className="mt-6 space-y-3">
              {menuItems
                .filter((item) => (backend.cart[item.id] ?? 0) > 0)
                .map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-4 border-b border-white/10 py-3">
                    <div>
                      <p className="font-black uppercase text-white">{item.name}</p>
                      <p className="text-sm text-white/55">x{backend.cart[item.id]}</p>
                    </div>
                    <strong className="text-ember">{formatPrice(item.price * (backend.cart[item.id] ?? 0))}</strong>
                  </div>
                ))}
            </div>
            <label className="mb-4 mt-7 block text-xs font-black uppercase text-white/50">Adresse de livraison</label>
            <input className="h-12 w-full rounded-md border border-white/10 bg-black/35 px-4 text-white outline-none focus:border-ember" value={address} onChange={(e) => setAddress(e.target.value)} />
            <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase text-white/45">Total</p>
                <p className="font-display text-5xl text-ember">{formatPrice(backend.total)}</p>
              </div>
              <Button onClick={submitOrder} disabled={backend.total === 0}>
                Valider <ArrowRight size={18} />
              </Button>
            </div>
            {lastOrder && <p className="mt-5 rounded-md bg-palm/30 p-4 text-sm font-bold text-white">Commande #{lastOrder} reçue. Préparation lancée.</p>}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
