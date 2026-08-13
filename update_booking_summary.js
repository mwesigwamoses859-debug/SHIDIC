import fs from 'fs';
let content = fs.readFileSync('src/components/BookingSection.tsx', 'utf8');

// The submit handler
content = content.replace(
  'setBookingId(docRef.id.slice(0, 8).toUpperCase());',
  'setBookingId(docRef.id.slice(0, 8).toUpperCase());\n                    setIsSuccess(true);'
);

content = content.replace(
  'setIsSubmitting(false);\n                  }\n                }}',
  'setIsSubmitting(false);\n                  }\n                }}'
);

// We need to fix the Trip Summary Card to conditionally render
const tripSummaryRegex = /\{\/\* Trip Summary Card \*\/\}[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;

const newTripSummary = `{/* Trip Summary Card */}
              {isSuccess && bookingId && (
                <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm flex flex-col gap-3">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <h4 className="font-bold text-gray-900 flex items-center gap-2">
                      <FileText size={18} className="text-[#FFC700]" /> Trip Summary
                    </h4>
                    <span className="bg-green-100 text-green-700 font-bold text-[10px] px-2 py-1 rounded-full uppercase tracking-wide">
                      Confirmed
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 divide-x divide-gray-100">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">
                        Booking ID
                      </span>
                      <span className="font-black text-gray-900 text-sm">
                        #SHD-{bookingId}
                      </span>
                    </div>
                    <div className="flex flex-col pl-3">
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">
                        Est. Cost
                      </span>
                      <span className="font-black text-gray-900 text-sm">
                        {estimatedPrice.toLocaleString()} UGX
                      </span>
                    </div>
                    <div className="flex flex-col pl-3 hidden md:flex">
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">
                        Driver
                      </span>
                      <span className="font-black text-gray-900 text-sm">
                        Assigning...
                      </span>
                    </div>
                  </div>
                </div>
              )}`;

content = content.replace(tripSummaryRegex, newTripSummary);

// After the form is successfully submitted, we might want to show a success message on the left side instead of the form.
const formRegex = /<form[\s\S]*?<\/form>/;
const formMatch = content.match(formRegex);
if (formMatch) {
    const successView = `{isSuccess ? (
                <div className="flex-grow flex flex-col items-center justify-center p-12 text-center bg-gray-50 rounded-b-3xl">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 mb-2">Request Confirmed!</h3>
                  <p className="text-gray-600 font-medium max-w-md mb-8">
                    Your ride has been successfully booked. Finding a driver near your pickup location.
                  </p>
                  <button
                    onClick={() => {
                        setIsSuccess(false);
                        setBookingId(null);
                        setPickup("");
                        setDropoff("");
                        setDistance(0);
                    }}
                    className="bg-black text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors"
                  >
                    Book Another Ride
                  </button>
                </div>
              ) : (\n                ${formMatch[0]}\n              )}`;
    
    content = content.replace(formRegex, successView);
}

fs.writeFileSync('src/components/BookingSection.tsx', content);
