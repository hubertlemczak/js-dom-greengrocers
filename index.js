const state = {
  items: [
    {
      id: '001-beetroot',
      name: 'beetroot',
      price: 0.25,
      type: 'veg',
    },
    {
      id: '002-carrot',
      name: 'carrot',
      price: 0.35,
      type: 'veg',
    },
    {
      id: '003-apple',
      name: 'apple',
      price: 0.4,
      type: 'fruit',
    },
    {
      id: '004-apricot',
      name: 'apricot',
      price: 0.2,
      type: 'fruit',
    },
    {
      id: '005-avocado',
      name: 'avocado',
      price: 0.7,
      type: 'fruit',
    },
    {
      id: '006-bananas',
      name: 'bananas',
      price: 0.2,
      type: 'fruit',
    },
    {
      id: '007-bell-pepper',
      name: 'bell pepper',
      price: 0.15,
      type: 'fruit',
    },
    {
      id: '008-berry',
      name: 'cherry',
      price: 0.5,
      type: 'fruit',
    },
    {
      id: '009-blueberry',
      name: 'blueberry',
      price: 0.6,
      type: 'fruit',
    },
    {
      id: '010-eggplant',
      name: 'eggplant',
      price: 0.9,
      type: 'fruit',
    },
  ],
  shopItems: [],
  cart: [],
  total: `£${(0).toFixed(2)}`,
  sort: {
    sortAlphabetically: {
      sort: false,
      type: null,
    },
    sortByType: {
      sort: false,
      type: 'all',
    },
    sortByPrice: {
      sort: false,
      type: null,
    },
  },
};

const setState = (newState) => {
  Object.keys(newState).forEach((key) => {
    state[key] = newState[key];
  });
  render();
};

const addItemToCart = (item) => {
  if (!isInCart(item.id)) {
    item.quantity = 1;
    const newCart = [...state.cart];
    newCart.push(item);
    setState({ cart: newCart });
  } else {
    item.quantity++;
    renderCart();
  }
};

const removeItemFromCart = (itemId) => {
  const newCart = [...state.cart].filter((item) => item.id !== itemId);
  setState({ cart: newCart });
};

const isInCart = (itemId) => {
  let result = false;
  state.cart.forEach((item) => {
    if (item.id === itemId) result = true;
  });
  return result;
};

const createStoreItem = (item) => {
  const li = document.createElement('li');
  const div = document.createElement('div');
  const img = document.createElement('img');
  const button = document.createElement('button');

  div.classList.add('store--item-icon');
  img.setAttribute('src', `./assets/icons/${item.id}.svg`);
  img.setAttribute('alt', `${item.name}`);
  button.addEventListener('click', () => addItemToCart(item));
  button.innerText = 'Add to cart';

  const storeProducts = document.querySelector('.store--item-list');
  storeProducts.append(li);
  li.append(div, button);
  div.append(img);
};

const createCartItem = (item) => {
  const li = document.createElement('li');
  const img = document.createElement('img');
  const p = document.createElement('p');
  const decrement = document.createElement('button');
  const span = document.createElement('span');
  const increment = document.createElement('button');

  img.classList.add('cart--item-icon');
  img.setAttribute('src', `./assets/icons/${item.id}.svg`);
  img.setAttribute('alt', `${item.name}`);

  p.innerText = `${item.name}`;

  decrement.addEventListener('click', () => {
    item.quantity--;
    if (item.quantity <= 0) removeItemFromCart(item.id);
    renderCart();
  });
  decrement.innerText = '-';
  decrement.classList.add('.quantity-btn', 'remove-btn', 'center');

  span.classList.add('.quantity-text', 'center');
  span.innerText = item.quantity;

  increment.addEventListener('click', () => {
    item.quantity++;
    renderCart();
  });
  increment.innerText = '+';
  increment.classList.add('.quantity-btn', 'add-btn', 'center');

  const cartProducts = document.querySelector('.cart--item-list');
  cartProducts.append(li);
  li.append(img, p, decrement, span, increment);
};

const calculateCartTotal = () => {
  let sum = 0;
  state.cart.forEach((item) => {
    sum += item.price * item.quantity;
  });
  return sum;
};

const filterListener = () => {
  const filterDropdown = document.querySelector('#filterSelect');
  filterDropdown.addEventListener('input', () => {
    const value = filterDropdown.value;
    const newState = { ...state.sort };
    if (value !== 'all') {
      newState.sortByType.sort = true;
      newState.sortByType.type = value;
    } else {
      newState.sortByType.sort = false;
      newState.sortByType.type = 'all';
    }
    setState({ sort: newState });
    setStoreItems();
  });
};

const sortListener = () => {
  const sortDropdown = document.querySelector('#sortSelect');
  sortDropdown.addEventListener('input', () => {
    const value = sortDropdown.value;
    const newState = { ...state.sort };
    if (value === 'A-Z' || value === 'Z-A') {
      newState.sortAlphabetically.sort = true;
      newState.sortAlphabetically.type = value;
      newState.sortByPrice.sort = false;
      newState.sortByPrice.type = null;
    } else if (value === 'Low-High' || value === 'High-Low') {
      newState.sortByPrice.sort = true;
      newState.sortByPrice.type = value;
      newState.sortAlphabetically.sort = false;
      newState.sortAlphabetically.type = null;
    } else {
      newState.sortAlphabetically.sort = false;
      newState.sortAlphabetically.type = null;
    }
    setState({ sort: newState });
    setStoreItems();
  });
};

const sortAlphabetically = () => {
  const items = [...state.shopItems];
  const sortedItems = items.sort((a, b) => (a.name > b.name ? 1 : -1));

  if (state.sort.sortAlphabetically.type === 'A-Z')
    setState({ shopItems: sortedItems });
  else setState({ shopItems: sortedItems.reverse() });
};

const sortByPrice = () => {
  const items = [...state.shopItems];
  const sortedItems = items.sort((a, b) => a.price - b.price);

  if (state.sort.sortByPrice.type === 'Low-High')
    setState({ shopItems: sortedItems });
  else setState({ shopItems: sortedItems.reverse() });
};

const sortByType = () => {
  const items = [...state.items];
  const sortedItems = items.filter(
    (item) => item.type === state.sort.sortByType.type
  );
  setState({ shopItems: sortedItems });
};

const setStoreItems = () => {
  if (state.sort.sortByType.sort === true) sortByType();
  else {
    const shopItems = [...state.items];
    setState({ shopItems: shopItems });
  }
  if (state.sort.sortAlphabetically.sort === true) sortAlphabetically();
  if (state.sort.sortByPrice.sort === true) sortByPrice();
};

const renderStoreItems = () => {
  const storeProducts = document.querySelector('.store--item-list');
  storeProducts.innerHTML = '';
  state.shopItems.forEach((item) => {
    createStoreItem(item);
  });
};

const renderCartItems = () => {
  const cartProducts = document.querySelector('.cart--item-list');
  cartProducts.innerHTML = '';
  state.cart.forEach((item) => {
    createCartItem(item);
  });
};

const renderTotal = () => {
  const cartTotal = calculateCartTotal();
  const total = document.querySelector('.total-number');
  state.total = `£${cartTotal.toFixed(2)}`;
  total.innerText = state.total;
};

const renderCart = () => {
  renderCartItems();
  renderTotal();
};

const render = () => {
  renderStoreItems();
  renderCart();
};

const init = () => {
  setStoreItems();
  filterListener();
  sortListener();
  render();
};

init();
