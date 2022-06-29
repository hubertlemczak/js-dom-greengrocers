const state = {
  items: [
    {
      id: '001-beetroot',
      name: 'beetroot',
      price: 0.35,
    },
    {
      id: '002-carrot',
      name: 'carrot',
      price: 0.35,
    },
    {
      id: '003-apple',
      name: 'apple',
      price: 0.35,
    },
    {
      id: '004-apricot',
      name: 'apricot',
      price: 0.35,
    },
    {
      id: '005-avocado',
      name: 'avocado',
      price: 0.35,
    },
    {
      id: '006-bananas',
      name: 'bananas',
      price: 0.35,
    },
    {
      id: '007-bell-pepper',
      name: 'bell pepper',
      price: 0.35,
    },
    {
      id: '008-berry',
      name: 'berry',
      price: 0.35,
    },
    {
      id: '009-blueberry',
      name: 'blueberry',
      price: 0.35,
    },
    {
      id: '010-eggplant',
      name: 'eggplant',
      price: 0.35,
    },
  ],
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
    render();
  }
  console.log(state.cart);
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
  button.addEventListener('click', () => {
    console.log(`adding ${item.name} to cart`);
    addItemToCart(item);
  });
  button.innerText = 'Add to cart';

  const storeProducts = document.querySelector('.store--item-list');
  storeProducts.append(li);
  li.append(div);
  div.append(img);
  li.append(button);
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
    render();
  });
  decrement.innerText = '-';
  decrement.classList.add('.quantity-btn', 'remove-btn', 'center');

  span.classList.add('.quantity-text', 'center');
  span.innerText = item.quantity;

  increment.addEventListener('click', () => {
    item.quantity++;
    render();
  });
  increment.innerText = '+';
  increment.classList.add('.quantity-btn', 'add-btn', 'center');

  const cartProducts = document.querySelector('.cart--item-list');
  cartProducts.append(li);
  li.append(img);
  li.append(p);
  li.append(decrement);
  li.append(span);
  li.append(increment);
};

const calculateCartTotal = () => {
  let sum = 0;
  state.cart.forEach((item) => {
    sum += item.price * item.quantity;
  });
  return sum;
};

const sortByTypeListener = () => {
  const sortByTypeDropdown = document.querySelector('#fiterByTypeSelect');
  sortByTypeDropdown.addEventListener('input', () => {
    const value = sortByTypeDropdown.value;
    if (value !== 'all') {
      state.sort.sortByType.sort = true;
      state.sort.sortByType.type = value;
    } else {
      state.sort.sortByType.sort = false;
      state.sort.sortByType.type = 'all';
    }
  });
};

const sortAlphabeticallyListener = () => {
  const sortAlphabeticallyDropdown = document.querySelector(
    '#fiterAlphabeticallySelect'
  );
  sortAlphabeticallyDropdown.addEventListener('input', () => {
    const value = sortAlphabeticallyDropdown.value;
    if (value === 'A-Z' || value === 'Z-A') {
      state.sort.sortAlphabetically.sort = true;
      state.sort.sortAlphabetically.type = value;
    } else {
      state.sort.sortAlphabetically.sort = false;
      state.sort.sortAlphabetically.type = null;
    }
    console.log(state);
    render();
  });
};

const renderStoreItems = () => {
  const storeProducts = document.querySelector('.store--item-list');
  storeProducts.innerHTML = '';
  state.items.forEach((item) => {
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

const render = () => {
  renderStoreItems();
  renderCartItems();
  renderTotal();
};

const init = () => {
  sortByTypeListener();
  sortAlphabeticallyListener();
  render();
};

init();
