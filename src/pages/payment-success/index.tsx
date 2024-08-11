import { useRouter } from 'next/router';
import { useStateService } from "@/shared/StateService";

const PaymentSuccess = () => {
  const router = useRouter();
  const { amount } = router.query;
  const { state } = useStateService();
  
  return (
    <div className={`flex flex-col justify-center h-full text-center ${state.text_color}`}>
      <h3>Payment Successful</h3>
      {amount && <p>Amount: ${amount}</p>}
    </div>
  );
};

export default PaymentSuccess;
