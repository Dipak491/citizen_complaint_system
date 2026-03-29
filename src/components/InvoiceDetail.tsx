import React from 'react';
import { Invoice } from '../types';
import { Printer, Download } from 'lucide-react';

interface InvoiceDetailProps {
  invoice: Invoice;
}

const InvoiceDetail: React.FC<InvoiceDetailProps> = ({ invoice }) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">INVOICE</h2>
          <p className="text-gray-500">{invoice.id}</p>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-100">
            <Printer size={20} />
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-100">
            <Download size={20} />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase mb-2">Bill To</h3>
          <p className="text-gray-800 font-medium">{invoice.customerName}</p>
          <p className="text-gray-600">{invoice.customerPhone}</p>
        </div>
        <div className="text-right">
          <div className="mb-2">
            <h3 className="text-sm font-medium text-gray-500 uppercase mb-1">Invoice Date</h3>
            <p className="text-gray-800">{formatDate(invoice.date)}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase mb-1">Payment Method</h3>
            <p className="text-gray-800 capitalize">{invoice.paymentMethod}</p>
          </div>
        </div>
      </div>
      
      <table className="min-w-full mb-8">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Item</th>
            <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
            <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Total</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="py-4 px-4">
                <p className="text-gray-800 font-medium">{item.product.name}</p>
                <p className="text-gray-500 text-sm">{item.product.category}</p>
              </td>
              <td className="py-4 px-4 text-right text-gray-800">${item.product.price.toFixed(2)}</td>
              <td className="py-4 px-4 text-right text-gray-800">{item.quantity}</td>
              <td className="py-4 px-4 text-right text-gray-800 font-medium">
                ${(item.product.price * item.quantity).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="border-t border-gray-200 pt-4 pb-2">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-800">${invoice.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Tax (18%)</span>
          <span className="text-gray-800">${invoice.tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between border-t border-gray-200 pt-2 mt-2">
          <span className="text-lg font-bold text-gray-800">Total</span>
          <span className="text-lg font-bold text-purple-600">${invoice.total.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
        <p>Thank you for your business!</p>
      </div>
    </div>
  );
};

export default InvoiceDetail;