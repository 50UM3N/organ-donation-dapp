export enum UserActionType {
  USER_ADD="USER_ADD",
  USER_REMOVE="USER_REMOVE",
}

export const userRemove = () => {
  return {
    type: UserActionType.USER_REMOVE,
  };
};
export const userAdd = (user: object) => {
  return {
    type: UserActionType.USER_ADD,
    payload: user,
  };
};
