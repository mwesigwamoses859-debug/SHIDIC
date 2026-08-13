import fs from 'fs';
let content = fs.readFileSync('src/components/BookingSection.tsx', 'utf8');

const target = `      // Listen for actual driver assignment
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

const replacement = `      // Simulate driver finding for demo purposes if no driver picks it up, but also listen
      const { onSnapshot } = await import('firebase/firestore');
      const unsub = onSnapshot(doc(db, "bookings", docRef.id), (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          if (data.status === 'accepted' || data.status === 'ongoing') {
            setDriverStatus("assigned");
          }
        }
      });
      // Fallback visual for the demo if nobody is on the Driver page
      setTimeout(() => {
        setDriverStatus(prev => prev === "assigning" ? "assigned" : prev);
      }, 5000);
`;

content = content.replace(target, replacement);

fs.writeFileSync('src/components/BookingSection.tsx', content);
