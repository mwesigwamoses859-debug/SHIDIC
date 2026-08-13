import fs from 'fs';
let trackerContent = fs.readFileSync('src/components/BookingTracker.tsx', 'utf8');

trackerContent = trackerContent.replace(
  'export function BookingTracker() {',
  'export function BookingTracker({ onBookingFound }: { onBookingFound?: (pickup: string, dropoff: string) => void }) {'
);

trackerContent = trackerContent.replace(
  'setBooking(b);',
  'setBooking(b);\n        if (onBookingFound && b.pickup && b.dropoff) {\n          onBookingFound(b.pickup, b.dropoff);\n        }'
);

fs.writeFileSync('src/components/BookingTracker.tsx', trackerContent);

let sectionContent = fs.readFileSync('src/components/BookingSection.tsx', 'utf8');

sectionContent = sectionContent.replace(
  'activeTab === "track" ? <BookingTracker /> : (',
  'activeTab === "track" ? <BookingTracker onBookingFound={(p, d) => { setPickup(p); setDropoff(d); }} /> : ('
);

fs.writeFileSync('src/components/BookingSection.tsx', sectionContent);
