'use client';

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import type { CreateOrderData, CreateOrderActions, OnApproveData, OnApproveActions } from '@paypal/paypal-js';

import { paypalCheckPayment, setTransactionId } from '@/actions';

interface Props {
  orderId: string;
  amount: number;
}

export const PaypalButton = ({ orderId, amount }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer();

  const rountedAmount = (Math.round(amount * 100) / 100).toString();

  if (isPending) {
    return (
      <div className="animate-pulse mb-16">
        <div className="h-12 bg-gray-200 rounded"></div>
        <div className="h-12 bg-gray-200 rounded mt-2"></div>
      </div>
    );
  }

  const createOrder = async (_: CreateOrderData, actions: CreateOrderActions): Promise<string> => {
    const transactionId = await actions.order.create({
      intent: 'CAPTURE',
      purchase_units: [
        {
          invoice_id: orderId,
          amount: {
            value: rountedAmount,
            currency_code: 'USD',
          },
        },
      ],
    });

    const { ok, message } = await setTransactionId(orderId, transactionId);

    if (!ok) {
      throw new Error(message);
    }

    return transactionId;
  };

  const onApprove = async (_: OnApproveData, actions: OnApproveActions) => {
    const details = await actions.order?.capture();

    if (!details) return;

    await paypalCheckPayment(details.id!);
  };

  return (
    <>
      <PayPalButtons createOrder={createOrder} onApprove={onApprove} style={{ color: 'blue' }} />
    </>
  );
};
