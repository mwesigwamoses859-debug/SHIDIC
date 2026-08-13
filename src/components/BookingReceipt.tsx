import { Printer, X, Download } from 'lucide-react';

export function BookingReceipt({ booking, onClose }: { booking: any, onClose: () => void }) {
  const handlePrint = () => {
    window.print();
  };

  if (!booking) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 print:bg-white print:p-0 print:static print:z-auto">
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-receipt, #printable-receipt * {
            visibility: visible;
          }
          #printable-receipt {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
      
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl print:shadow-none print:w-full print:max-w-none">
        
        <div className="flex justify-between items-center p-4 bg-gray-50 border-b border-gray-100 print:hidden">
          <h3 className="font-bold text-gray-900">Booking Receipt</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-8 print:p-0" id="printable-receipt">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-[#FFC700] tracking-tighter leading-none">SHIDIC</h1>
            <p className="text-[10px] font-bold tracking-widest text-black">TRANSPORTERS</p>
            <div className="mt-4 text-gray-500 text-sm font-bold">Official Booking Confirmation</div>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-end border-b border-gray-100 pb-4">
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Booking ID</p>
                <p className="text-xl font-black text-gray-900">#SHD-{booking.shortId}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Date Issued</p>
                <p className="text-sm font-bold text-gray-900">{new Date().toLocaleDateString()}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-b border-gray-100 pb-4">
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Passenger</p>
                <p className="text-sm font-bold text-gray-900">{booking.name}</p>
                <p className="text-sm font-medium text-gray-600 mt-1">{booking.phone}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Service Type</p>
                <p className="text-sm font-bold text-gray-900 capitalize">{booking.type} - {booking.vehicleType || 'Standard'}</p>
                <p className="text-sm font-medium text-gray-600 mt-1">{booking.date} at {booking.time}</p>
              </div>
            </div>

            <div className="border-b border-gray-100 pb-4 space-y-3">
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Pickup Location</p>
                <p className="text-sm font-bold text-gray-900">{booking.pickup}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Dropoff Location</p>
                <p className="text-sm font-bold text-gray-900">{booking.dropoff}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Calculated Distance</p>
                <p className="text-sm font-bold text-gray-900">{booking.distance} km</p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <p className="text-sm uppercase font-black text-gray-900">Estimated Total</p>
              <p className="text-2xl font-black text-green-600">{booking.estimatedPrice?.toLocaleString()} UGX</p>
            </div>
          </div>

          <div className="mt-12 text-center text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            Thank you for choosing Shidic Transporters!
          </div>
        </div>

        <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-3 print:hidden">
          <button 
            onClick={handlePrint}
            className="flex-1 flex items-center justify-center gap-2 bg-black text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors"
          >
            <Printer size={18} /> Print / Save PDF
          </button>
        </div>

      </div>
    </div>
  );
}
