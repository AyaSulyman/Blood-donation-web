export async function getProductsHandler(request: any, reply: any) {
  return request.server.db.products;
}
export async function createProductHandler(request: any, reply: any) {
  const { name, price } = request.body;
  const newProduct = {
    id: request.server.db.products.length + 1,
    name,
    price,
  };
  request.server.db.products.push(newProduct);
  reply.code(201);
  return newProduct;
}
