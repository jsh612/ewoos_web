export const headerTrigger = (pathname: string): boolean => {
  if (pathname.includes("myshop")) {
    return false;
  }
  return true;
};
