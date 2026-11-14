import { Order } from '../types';

export const printSingleOrderSlip = (ord: Order) => {
  const printWindow = window.open('', '_blank', 'width=800,height=900');
  if (!printWindow) {
    alert("Please allow popups to print the order slip.");
    return;
  }

  const itemsHtml = ord.items.map((it, idx) => `
    <tr>
      <td style="padding: 9px 10px; border-bottom: 1px solid #e7dfd5; text-align: center; font-mono; font-size: 11px;">${idx + 1}</td>
      <td style="padding: 9px 10px; border-bottom: 1px solid #e7dfd5;">
        <strong style="color: #1c1917; font-size: 13px;">${it.productName}</strong> ${it.volume ? '<span style="color: #78716c; font-size: 11px;">(' + it.volume + ')</span>' : ''}
      </td>
      <td style="padding: 9px 10px; border-bottom: 1px solid #e7dfd5; text-align: center; font-weight: bold; font-size: 12px;">${it.quantity}</td>
      <td style="padding: 9px 10px; border-bottom: 1px solid #e7dfd5; text-align: right; font-size: 12px;">₹${it.price}</td>
      <td style="padding: 9px 10px; border-bottom: 1px solid #e7dfd5; text-align: right; font-weight: bold; font-size: 13px; color: #1c1917;">₹${it.price * it.quantity}</td>
    </tr>
  `).join('');

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Z NATURALS Dispatch Slip - ${ord.id}</title>
        <meta charset="utf-8" />
        <style>
          @page {
            size: A4 portrait;
            margin: 10mm;
          }
          * {
            box-sizing: border-box;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            margin: 0;
            padding: 16px;
            color: #1c1917;
            background: #fff;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .container {
            max-width: 680px;
            margin: 0 auto;
            border: 2px solid #263D32;
            border-radius: 12px;
            padding: 20px 24px;
            background: #ffffff;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            border-bottom: 2px solid #C5A16B;
            padding-bottom: 14px;
            margin-bottom: 16px;
          }
          .brand-title {
            font-size: 22px;
            font-weight: 800;
            color: #263D32;
            margin: 0;
            letter-spacing: 1.5px;
            font-family: Georgia, serif;
          }
          .brand-subtitle {
            font-size: 11px;
            text-transform: uppercase;
            color: #854d0e;
            letter-spacing: 1px;
            margin: 3px 0 0;
            font-weight: bold;
          }
          .hub-info {
            font-size: 10px;
            color: #78716c;
            margin-top: 3px;
          }
          .order-pill {
            background: #263D32;
            color: #F5F0E6;
            padding: 8px 14px;
            border-radius: 8px;
            text-align: right;
          }
          .order-id {
            font-size: 15px;
            font-weight: bold;
            font-family: monospace;
            letter-spacing: 0.5px;
          }
          .slot-tag {
            font-size: 10px;
            color: #C5A16B;
            margin-top: 3px;
            font-weight: 600;
          }
          .details-grid {
            display: grid;
            grid-template-columns: 1.2fr 0.8fr;
            gap: 14px;
            margin-bottom: 16px;
            font-size: 12px;
          }
          .box {
            background: #faf8f5;
            border: 1px solid #e7dfd5;
            border-radius: 8px;
            padding: 10px 12px;
          }
          .box-title {
            font-size: 10px;
            font-weight: bold;
            text-transform: uppercase;
            color: #78716c;
            margin-bottom: 6px;
            letter-spacing: 0.8px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 14px;
            font-size: 12px;
          }
          th {
            background: #263D32;
            color: #F5F0E6;
            text-align: left;
            padding: 8px 10px;
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 0.8px;
          }
          .total-section {
            border-top: 2px solid #263D32;
            padding-top: 10px;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 16px;
          }
          .grand-total {
            font-size: 20px;
            font-weight: 800;
            color: #263D32;
          }
          .footer-signatures {
            display: flex;
            justify-content: space-between;
            margin-top: 24px;
            padding-top: 14px;
            border-top: 1px dashed #d6d3d1;
            font-size: 10px;
            color: #78716c;
          }
          .footer-note {
            text-align: center;
            font-size: 9px;
            color: #a8a29e;
            margin-top: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          @media print {
            body {
              padding: 0;
            }
            .container {
              border: 1.5px solid #000;
              border-radius: 0;
              max-width: 100%;
              page-break-inside: avoid;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div>
              <h1 class="brand-title">Z NATURALS</h1>
              <p class="brand-subtitle">Chettinad Botanical Beauty & Personal Care</p>
              <div class="hub-info">Karaikudi Central Operations Hub • Sekkalai Road • Helpline: +91 9344087944</div>
            </div>
            <div class="order-pill">
              <div class="order-id">${ord.id}</div>
              <div class="slot-tag">${ord.deliverySlot || ord.zone || 'Karaikudi Doorstep COD'}</div>
            </div>
          </div>

          <div class="details-grid">
            <div class="box">
              <div class="box-title">Deliver To Customer:</div>
              <strong style="font-size: 14px; color: #263D32;">${ord.customerName}</strong><br/>
              <span style="font-family: monospace; font-size: 12px; font-weight: bold; color: #1c1917;">📞 +91 ${ord.phone}</span><br/>
              <div style="margin-top: 4px; line-height: 1.4; color: #44403c;">
                ${ord.address}<br/>
                ${ord.landmark ? '<strong>Landmark:</strong> ' + ord.landmark + '<br/>' : ''}
                <strong>${ord.city}, ${ord.state} - ${ord.pincode}</strong>
              </div>
            </div>
            
            <div class="box">
              <div class="box-title">Order & Payment Info:</div>
              <div style="line-height: 1.5; color: #44403c;">
                <strong>Booked:</strong> ${new Date(ord.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })}<br/>
                <strong>Payment Mode:</strong> ${ord.paymentMethod}<br/>
                <strong>Payment Status:</strong> 
                <span style="color: ${ord.paymentStatus === 'Paid (Online)' ? '#15803d' : '#b45309'}; font-weight: bold;">
                  ${ord.paymentStatus}
                </span><br/>
                ${ord.upiUtr ? '<strong>Ref / UTR:</strong> <span style="font-family: monospace;">' + ord.upiUtr + '</span><br/>' : ''}
                <strong>Route Zone:</strong> ${ord.zone}
              </div>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th style="width: 25px; text-align: center;">#</th>
                <th>Item Description</th>
                <th style="text-align: center; width: 50px;">Qty</th>
                <th style="text-align: right; width: 80px;">Rate</th>
                <th style="text-align: right; width: 90px;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <div class="total-section">
            <div style="font-size: 11px; line-height: 1.5;">
              <span style="color: #57534e;">Parcel Weight: ${ord.totalWeightGrams}g | Shipping: <strong>${ord.shippingFee === 0 ? 'FREE' : '₹' + ord.shippingFee}</strong></span><br/>
              ${ord.paymentStatus !== 'Paid (Online)' 
                ? '<strong style="color: #b45309; font-size: 12px; background: #fef3c7; padding: 2px 6px; border-radius: 4px; display: inline-block; margin-top: 4px;">⚠️ CASH / UPI TO COLLECT AT DOORSTEP</strong>' 
                : '<strong style="color: #15803d; font-size: 12px; background: #dcfce7; padding: 2px 6px; border-radius: 4px; display: inline-block; margin-top: 4px;">✓ FULLY PAID ONLINE (DO NOT COLLECT CASH)</strong>'}
            </div>
            <div style="text-align: right;">
              <span style="font-size: 11px; color: #78716c; text-transform: uppercase; font-weight: bold;">Total Amount:</span><br/>
              <span class="grand-total">₹${ord.total}</span>
            </div>
          </div>

          <div class="footer-signatures">
            <div>
              Dispatch Rider Sign: ___________________________
            </div>
            <div>
              Customer Received Sign: ___________________________
            </div>
          </div>
          
          <div class="footer-note">
            Authentic Chettinad Botanical Care • Handcrafted in Small Fresh Batches • 100% Satisfaction Guarantee
          </div>
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 300);
          };
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
};
