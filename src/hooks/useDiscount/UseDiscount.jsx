import { useMemo } from "react";

const UseDiscount = (totalPrice, paymentMethod) => {
  const discountRate = paymentMethod === "bank transfer" ? 10 : 0;

  const finalPrice = useMemo(() => {
    return totalPrice - totalPrice * (discountRate / 100);
  }, [totalPrice, discountRate]);

  return {
    finalPrice,
    discountRate,
    hasDiscount: discountRate > 0,
  };
};
export default UseDiscount