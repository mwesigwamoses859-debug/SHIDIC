import fs from 'fs';

let content = fs.readFileSync('src/components/BookingSection.tsx', 'utf8');

// Import LocationInsights
content = content.replace(
  'import { TransportHistory } from "./TransportHistory";',
  'import { TransportHistory } from "./TransportHistory";\nimport { LocationInsights } from "./LocationInsights";'
);

// Add state for pickup and dropoff string tracking
content = content.replace(
  'const [distance, setDistance] = useState<number>(5);',
  'const [distance, setDistance] = useState<number>(5);\n  const [pickup, setPickup] = useState("");\n  const [dropoff, setDropoff] = useState("");'
);

// Update inputs to bind state
content = content.replace(
  /name="pickup"[\s\S]*?className=/,
  'name="pickup"\n                      value={pickup}\n                      onChange={(e) => setPickup(e.target.value)}\n                      type="text"\n                      className='
);

content = content.replace(
  /name="dropoff"[\s\S]*?className=/,
  'name="dropoff"\n                      value={dropoff}\n                      onChange={(e) => setDropoff(e.target.value)}\n                      type="text"\n                      className='
);

// Insert LocationInsights below the locations div
content = content.replace(
  '                {/* Schedule */}',
  `                {/* AI Route Insights */}\n                <LocationInsights pickup={pickup} dropoff={dropoff} />\n\n                {/* Schedule */}`
);

fs.writeFileSync('src/components/BookingSection.tsx', content);
