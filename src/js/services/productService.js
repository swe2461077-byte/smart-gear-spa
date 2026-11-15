let cachedProducts = null;

export async function getProducts() {
  if (cachedProducts) {
    return cachedProducts;
  }
  const response = await fetch("./data/products.json");
  if (!response.ok) {
    throw new Error("Бүтээгдэхүүний өгөгдлийг ачаалж чадсангүй");
  }
  cachedProducts = await response.json();
  return cachedProducts;
}
