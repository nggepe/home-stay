// app/sales/[id]/pdf/route.ts

import { PageProps } from '@/shared/types/page-types';
import { NextRequest } from 'next/server';
import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs/promises';
import { getSalesById } from '@/repositories/sales-repository';

export async function GET(req: NextRequest, { params }: PageProps<{ id: string }>) {
  const { id } = await params;
  const sales = await getSalesById(Number(id));
  if (!sales) {
    return new Response('Sales not found', { status: 404 });
  }

  const imageDataUri = await logo();

  // Buat konten HTML untuk PDF (bisa diganti dengan fetch ke page HTML)
  const html = `<html>
    <head>
      <title>Nota ${sales.customer.name}</title>
    </head>
    <body>
      <div style="display: flex; justify-content: start; align-items: center; gap: 2rem;">
        <img src="${imageDataUri}" alt="Logo" style="width:100px;" />
        <div>
          <h1 style="margin: 0;">HS32 Malang</h1>
          <div>Jln. Simpang Ijen Blok B No. 32, Oro-oro Dowo, Klojen, Kota Malang</div>
          <div>0877-7763-2487</div>
        </div>
      </div>
      <p>Generated at ${new Date().toLocaleString()}</p>
    </body>
  </html>`;

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'], // penting di VPS
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  const pdfBuffer = await page.pdf({ format: 'A4' });
  await browser.close();

  return new Response(pdfBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="sales-${id}.pdf"`,
    },
  });
}
async function logo() {
  const logoPath = path.join(process.cwd(), 'public', 'android-chrome-192x192.png');

  // Baca file dan encode ke base64
  const imageBuffer = await fs.readFile(logoPath);
  const base64Image = imageBuffer.toString('base64');
  const imageDataUri = `data:image/png;base64,${base64Image}`;
  return imageDataUri;
}
