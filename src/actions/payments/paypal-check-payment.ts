'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

import { PaypalOrderStatusResponse } from '@/interfaces';

export async function paypalCheckPayment(paypalTransactionId: string) {

  const authToken = await getPaypalBeareToken();
  console.log({ authToken });

  if (!authToken) {
    return {
      ok: false,
      message: 'No se pudo obtener  token de verificación',
    };
  }

  const resp = await verifyPaypalPayment(paypalTransactionId, authToken);

  if (!resp) {
    return {
      ok: false,
      message: 'Error al verificar  el pago',
    };
  }

  const { status, purchase_units } = resp;
  const { invoice_id: orderId } = purchase_units[0]; // Todo: invoice ID

  if (status !== 'COMPLETED') {
    return {
      ok: false,
      message: 'Aún no se ha pagado en paypal',
    };
  }

  // TODOD: Realizar la actualización en nuestra base de datos
  try {
    await prisma.order.update({
      where: { id: orderId },
      data: {
        isPaid: true,
        paidAt: new Date(),
      },
    });

    // Todo: Revalidar path
    revalidatePath(`/orders/${orderId}`);

    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: '500 - No se pudo actualizar la orden',
    };
  }
};

async function getPaypalBeareToken(): Promise<string | null> {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPLA_SECRET = process.env.PAYPLA_SECRET;
  const oauth2Url = process.env.PAYPAL_OAUTH_URL ?? '';

  const base64Token = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPLA_SECRET}`, 'utf-8').toString('base64');

  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Basic ${base64Token}`);
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

  const urlencoded = new URLSearchParams();
  urlencoded.append('grant_type', 'client_credentials');

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    cache: 'no-store',
  };

  try {
    const result = await fetch(oauth2Url, requestOptions).then((r) => r.json());

    return result.access_token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

async function verifyPaypalPayment(
  paypalTransactionId: string,
  bearerToken: string
): Promise<PaypalOrderStatusResponse | null> {
  const paypalOrderUrl = `${process.env.PAYPAL_ORDERS_URL}/${paypalTransactionId}`;
  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${bearerToken}`);

  const requestOptions: RequestInit = {
    method: 'GET',
    headers: myHeaders,
    cache: 'no-store',
  };

  try {
    const resp = await fetch(paypalOrderUrl, requestOptions).then((r) => r.json());
    return resp;
  } catch (error) {
    console.log(error);
    return null;
  }
};
