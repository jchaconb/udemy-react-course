const initialStateCustomer = {
  fullName: '',
  nationalID: '',
  createdAt: '',
};

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

const createCustomer = (fullName, nationalID) => ({
  type: 'customer/createCustomer',
  payload: { fullName, nationalID, createdAt: new Date().toISOString() },
});

const updateCustomer = fullName => ({
  type: 'customer/updateCustomer',
  payload: { fullName },
});

export default customerReducer;
export { createCustomer, updateCustomer };
