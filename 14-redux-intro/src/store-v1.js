import { combineReducers, createStore } from 'redux';

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
};

const initialStateCustomer = {
  fullName: '',
  nationalID: '',
  createdAt: '',
};

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case 'account/deposit':
      return { ...state, balance: state.balance + action.payload };
    case 'account/withdraw':
      return { ...state, balance: state.balance - action.payload };
    case 'account/requestLoan':
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case 'account/payLoan':
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
        loanPurpose: '',
      };
    default:
      return state;
  }
}

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case 'customer/createCustomer':
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case 'customer/updateCustomer':
      return { ...state, fullName: action.payload.fullName };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

const deposit = amount => ({ type: 'account/deposit', payload: amount });

const withdraw = amount => ({ type: 'account/withdraw', payload: amount });

const requestLoan = (amount, purpose) => ({
  type: 'account/requestLoan',
  payload: { amount, purpose },
});

const payLoan = () => ({ type: 'account/payLoan' });

const createCustomer = (fullName, nationalID) => ({
  type: 'customer/createCustomer',
  payload: { fullName, nationalID, createdAt: new Date().toISOString() },
});

const updateCustomer = fullName => ({
  type: 'customer/updateCustomer',
  payload: { fullName },
});

// Dispatch actions
store.dispatch(deposit(500));
console.log(store.getState());

store.dispatch(withdraw(200));
console.log(store.getState());

store.dispatch(requestLoan(1000, 'buy a car'));
console.log(store.getState());

store.dispatch(payLoan());
console.log(store.getState());

store.dispatch(createCustomer('Jose Chacon', '2172626627'));
console.log(store.getState());

store.dispatch(updateCustomer('Alberto Chacon'));
console.log(store.getState());
