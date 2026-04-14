import cartReducer, {
  reconcileWithProducts,
  type CartState,
} from "./cartSlice";
//TESTING reconcileWithProducts Redux action
describe("cartSlice - reconcileWithProducts", () => {
  const initialState: CartState = {
    items: [
      {
        id: 1,
        title: "Product 1",
        price: 100,
        quantity: 2,
        selectedSize: null,
        itemKey: "1-default",
      },
      {
        id: 2,
        title: "Product 2",
        price: 50,
        quantity: 1,
        selectedSize: null,
        itemKey: "2-default",
      },
    ],
    totalQuantity: 3,
    totalPrice: 250,
    cartEvents: 0,
    storageKey: "cart:guest",
  };

  it("marks items as unavailable when product stock is Sold out", () => {
    const action = reconcileWithProducts([
      { id: 1, stock: "Sold out" },
      { id: 2, stock: "In stock" },
    ]);

    const state = cartReducer(initialState, action);

    expect(state.items).toEqual([
      {
        ...initialState.items[0],
        unavailable: true,
      },
      {
        ...initialState.items[1],
        unavailable: false,
      },
    ]);
  });

  it("sets unavailable to false when product is in stock", () => {
    const action = reconcileWithProducts([
      { id: 1, stock: "In stock" },
      { id: 2, stock: "In stock" },
    ]);

    const state = cartReducer(initialState, action);

    expect(state.items.every((item) => item.unavailable === false)).toBe(true);
  });

  it("keeps items unchanged except unavailable field", () => {
    const action = reconcileWithProducts([{ id: 1, stock: "Sold out" }]);

    const state = cartReducer(initialState, action);

    expect(state.items[0]).toMatchObject({
      id: 1,
      quantity: 2,
      price: 100,
      unavailable: true,
    });
  });
});