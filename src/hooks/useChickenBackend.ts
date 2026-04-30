import { useMemo, useState } from "react";
import { db, menuItems, type Order, type User } from "../lib/store";

export function useChickenBackend() {
  const [user, setUser] = useState<User | null>(() => db.getUser());
  const [orders, setOrders] = useState<Order[]>(() => db.getOrders());
  const [cart, setCart] = useState<Record<string, number>>({
    "menu-1": 1,
    "mix-bucket": 1,
  });

  const total = useMemo(
    () =>
      menuItems.reduce((sum, item) => sum + (cart[item.id] ?? 0) * item.price, 0),
    [cart],
  );

  const add = (id: string) =>
    setCart((current) => ({ ...current, [id]: (current[id] ?? 0) + 1 }));

  const remove = (id: string) =>
    setCart((current) => ({ ...current, [id]: Math.max((current[id] ?? 0) - 1, 0) }));

  const signIn = (name: string, phone: string) => setUser(db.signIn(name, phone));

  const checkout = (address: string) => {
    const activeUser = user ?? db.signIn("Invité Chicken Master", "+221 77 000 00 00");
    setUser(activeUser);
    const order = db.saveOrder({
      user: activeUser,
      address,
      total,
      items: Object.entries(cart)
        .filter(([, qty]) => qty > 0)
        .map(([id, qty]) => ({ id, qty })),
    });
    setOrders(db.getOrders());
    return order;
  };

  return { user, orders, cart, total, add, remove, signIn, checkout };
}
