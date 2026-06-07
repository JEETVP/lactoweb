export const CART_STORAGE_KEY = 'donJuanCart';

export function getCartItems() {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);
    return storedCart ? JSON.parse(storedCart) : [];
  } catch {
    return [];
  }
}

export function saveCartItems(items) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event('donjuan:cart-updated'));
}

export function addCartItem(product, quantity = 1) {
  const nextQuantity = Math.max(1, Number(quantity) || 1);
  const id = `${product.slug || product.name}-${product.presentation || 'unidad'}`.toLowerCase();
  const cartItem = {
    id,
    slug: product.slug,
    name: product.name,
    presentation: product.presentation || '3 kg',
    pricePerKg: Number(product.price) || 0,
    quantity: nextQuantity,
    imageSrc: product.imageSrc,
  };
  const items = getCartItems();
  const existingItem = items.find((item) => item.id === id);
  const nextItems = existingItem
    ? items.map((item) => (item.id === id ? { ...item, quantity: item.quantity + nextQuantity } : item))
    : [...items, cartItem];

  saveCartItems(nextItems);
  return nextItems;
}
