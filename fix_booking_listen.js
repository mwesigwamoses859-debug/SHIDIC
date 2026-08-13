import fs from 'fs';
let content = fs.readFileSync('src/components/BookingSection.tsx', 'utf8');

const target = `      // Simulate driver finding
      setTimeout(() => {
        setDriverStatus("assigned");
      }, 4000);`;

const replacement = `      // Listen for actual driver assignment
      import('firebase/firestore').then(({ onSnapshot, doc }) => {
        onSnapshot(doc(db, "bookings", docRef.id), (snap) => {
          if (snap.exists()) {
            const data = snap.data();
            if (data.status === 'accepted' || data.status === 'ongoing') {
              setDriverStatus("assigned");
            }
          }
        });
      });`;

content = content.replace(target, replacement);
fs.writeFileSync('src/components/BookingSection.tsx', content);
