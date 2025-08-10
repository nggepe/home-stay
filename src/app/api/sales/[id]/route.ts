import { PageProps } from '@/shared/types/page-types';
import { NextRequest } from 'next/server';
import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs/promises';
import { getSalesById } from '@/repositories/sales-repository';
import { idDate } from '@/utils/date';
import { $Enums } from '@/generated/prisma';

type SalesLine = {
  product: {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    price: number;
    type: $Enums.ProductType;
    description: string | null;
  };
} & {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  salesId: number;
  productId: number;
  quantity: number;
  price: number;
  subtotal: number;
  checkInAt: Date | null;
  checkOutAt: Date | null;
};

type SalesPayment = {
  date: Date;
  amount: number;
};

export async function GET(req: NextRequest, { params }: PageProps<{ id: string }>) {
  const { id } = await params;
  const sales = await getSalesById(Number(id));
  if (!sales) {
    return new Response('Sales not found', { status: 404 });
  }

  const imageDataUri = await logo();

  const html = `<html>
    <head>
      <title>Nota ${sales.customer.name}</title>
    </head>
    <body>
      ${header(imageDataUri)}
      ${customer(sales.code, sales.customer.name, sales.bookedAt)}
      ${lines(sales.sales_line, sales.grandTotal, sales.sales_payment, sales.totalPayment)}
    </body>
  </html>`;

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  const pdfBuffer = await page.pdf({ format: 'A4' });
  await browser.close();

  return new Response(Buffer.from(pdfBuffer), {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="sales-${id}.pdf"`,
    },
  });
}
async function logo() {
  const logoPath = path.join(process.cwd(), 'public', 'android-chrome-192x192.png');

  const imageBuffer = await fs.readFile(logoPath);
  const base64Image = imageBuffer.toString('base64');
  const imageDataUri = `data:image/png;base64,${base64Image}`;
  return imageDataUri;
}

function header(imageDataUri: string) {
  return `<div style="display: flex; justify-content: start; align-items: center; gap: 2rem;">
        <img src="${imageDataUri}" alt="Logo" style="width:100px;" />
        <div style="display: flex; flex-direction: column; justify-content: start;">
          <h1 style="margin-bottom: 0.5rem; margin-top: 0px;">HS32 Malang</h1>
          <div>Jln. Simpang Ijen Blok B No. 32, Oro-oro Dowo, Klojen, Kota Malang</div>
          <div>0877-7763-2487</div>
        </div>
      </div>
      <hr>`;
}

function customer(code: string, name: string = '', bookedAt?: Date | null) {
  return `
  <table style="margin: 2rem 0;">
    <tr>
      <td>Nomor Nota</td>
      <td>:</td>
      <td>${code}</td>
    </tr>
    <tr>
      <td>Customer</td>
      <td>:</td>
      <td>${name}</td>
    </tr>
    <tr>
      <td>Di Pesan Pada</td>
      <td>:</td>
      <td>${idDate(bookedAt)}</td>
    </tr>
  </table>
  `;
}

function lines(lines: SalesLine[], grandTotal: number, payments: SalesPayment[], totalPayment: number) {
  return `
  <table style="width: 100%; border-collapse: collapse;">
    <thead>
      <tr style="border-bottom: 1px solid black;">
        <th style="text-align:left; padding: 8px 0;">No</th>
        <th style="text-align:left; padding: 8px 0;">Pesanan</th>
        <th style="text-align:right; padding: 8px 0;">Jumlah</th>
        <th style="text-align:right; padding: 8px 0;">Harga</th>
        <th style="text-align:right; padding: 8px 0;">Total</th>
      </tr>
    </thead>
    <tbody>
      ${lines.map((data, index) => line(data, index)).join('')}
      <tr>
        <td colspan="4" style="text-align:right; padding: 8px 0;">Total</td>
        <td style="text-align:right; padding: 8px 0;">${grandTotal}</td>
      </tr>
      ${payments.map((data, index) => payment(data, index)).join('')}
      <tr>
        <td colspan="4" style="text-align:right; padding: 8px 0;">Total Pembayaran</td>
        <td style="text-align:right; padding: 8px 0;">${totalPayment}</td>
      </tr>
      <tr>
        <td colspan="4" style="text-align:right; padding: 8px 0;">Sisa</td>
        <td style="text-align:right; padding: 8px 0;">${grandTotal - totalPayment}</td>
      </tr>
    </tbody>
  </table>
  `;
}

function line(line: SalesLine, index: number) {
  let check = '';
  if (line.product.type == 'ROOM') {
    check = `
    <small>(${idDate(line.checkInAt)} sd. ${idDate(line.checkOutAt)})</small>
    `;
  }
  return `
    <tr style="border-bottom: 1px solid #ccc;">
      <td style="padding: 8px 0;">${index + 1}</td>
      <td style="padding: 8px 0;">
        ${line.product.name}
        <br>
        <small>${line.product.type == 'ROOM' ? 'Kamar' : 'Layanan'}</small>
      </td>
      <td style="text-align:right; padding: 8px 0;">
        ${line.quantity}
        <br>
        ${check}
      </td>
      <td style="text-align:right; padding: 8px 0;">${line.price}</td>
      <td style="text-align:right; padding: 8px 0;">${line.subtotal}</td>
    </tr>
  `;
}

function payment(data: SalesPayment, index: number) {
  if (index == 0)
    return `<tr>
      <td colspan="4" style="text-align:right; padding: 8px 0;">Pembayaran</td>
      <td style="text-align:right; padding: 8px 0;"><small>${idDate(data.date)}</small> - ${data.amount}</td>
    </tr>`;
}
