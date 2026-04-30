export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "Menus" | "Sandwichs" | "Burgers" | "Fried Chicken" | "Snacks" | "Boissons";
  badge: "Best-seller" | "Classique" | "Croustillant" | "Frais";
  image: string;
};

export type User = {
  id: string;
  name: string;
  phone: string;
};

export type Order = {
  id: string;
  user: User;
  items: Array<{ id: string; qty: number }>;
  address: string;
  total: number;
  createdAt: string;
};

const keys = {
  user: "chicken-master:user",
  orders: "chicken-master:orders",
};

const ASSET_VERSION = "20260430-0531";
const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}?v=${ASSET_VERSION}`;

export const menuItems: MenuItem[] = [
  {
    id: "menu-1",
    name: "Menu 1",
    description: "Big Burger + 2 ailes + frites + boisson.",
    price: 3800,
    category: "Menus",
    badge: "Best-seller",
    image: asset("real-menu-1-cut.webp"),
  },
  {
    id: "menu-2",
    name: "Menu 2",
    description: "Big Burger + frites + boisson.",
    price: 2800,
    category: "Menus",
    badge: "Classique",
    image: asset("real-menu-2-cut.webp"),
  },
  {
    id: "burger-double",
    name: "Burger Poulet Double",
    description: "Double portion de poulet, fromage, salade, tomate, mayonnaise.",
    price: 3000,
    category: "Burgers",
    badge: "Best-seller",
    image: asset("real-burger-double-cut.webp"),
  },
  {
    id: "mix-bucket",
    name: "Mix Bucket",
    description: "Le bucket Chicken Master pour partager.",
    price: 6000,
    category: "Fried Chicken",
    badge: "Croustillant",
    image: asset("chicken-master-bucket-ai.webp"),
  },
  {
    id: "crispy-chicken",
    name: "Crispy Chicken",
    description: "Poulet pane, epice, croustillant et genereux.",
    price: 6000,
    category: "Fried Chicken",
    badge: "Croustillant",
    image: asset("real-crispy-chicken-cut.webp"),
  },
  {
    id: "wings-6",
    name: "Ailes de Poulet 6Pcs",
    description: "Six ailes de poulet panees et epicees.",
    price: 3500,
    category: "Fried Chicken",
    badge: "Croustillant",
    image: asset("real-wings-6-cut.webp"),
  },
  {
    id: "chawarma-poulet",
    name: "Chawarma Poulet",
    description: "Filet de poulet + frites + salade + mayonnaise.",
    price: 2000,
    category: "Sandwichs",
    badge: "Classique",
    image: asset("real-chawarma-cut.webp"),
  },
  {
    id: "frites",
    name: "Frites",
    description: "Frites dorees, simples et efficaces.",
    price: 500,
    category: "Snacks",
    badge: "Frais",
    image: asset("real-fries-cut.webp"),
  },
];

function read<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export const db = {
  getUser: () => read<User | null>(keys.user, null),
  signIn: (name: string, phone: string) => {
    const user = { id: crypto.randomUUID(), name, phone };
    write(keys.user, user);
    return user;
  },
  signOut: () => localStorage.removeItem(keys.user),
  getOrders: () => read<Order[]>(keys.orders, []),
  saveOrder: (order: Omit<Order, "id" | "createdAt">) => {
    const next: Order = {
      ...order,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    write(keys.orders, [next, ...db.getOrders()]);
    return next;
  },
};
