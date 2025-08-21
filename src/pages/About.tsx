export default function About() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">About Bondhu Courier</h1>

      <p className="mb-4">
        <strong>Overview:</strong> <br />
        Bondhu Courier is a web-based parcel delivery system designed to make sending, tracking, and managing parcels simple and efficient for senders. Users can view all their parcels, track their status, and cancel them if needed — all from a single dashboard.
      </p>

      <p className="mb-4">
        <strong>Key Features:</strong>
      </p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Sender Dashboard to view all parcels and their status</li>
        <li>Create, track, and cancel parcels easily</li>
        <li>Status summary: total parcels and parcels by status</li>
        <li>Secure operations with authorization checks</li>
        <li>Responsive design for desktop and mobile</li>
      </ul>

      <p className="mb-4">
        <strong>Technology Stack:</strong>
      </p>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Frontend: TypeScript, React, Vite, Tailwind CSS</li>
        <li>Backend: Node.js, Express</li>
        <li>Database: MongoDB</li>
        <li>Authentication: JWT-based secure login</li>
        <li>APIs: RESTful endpoints for parcel management</li>
      </ul>

      <p>
        <strong>Purpose:</strong> <br />
        The project aims to provide a convenient and secure platform for senders to manage their parcels efficiently, saving time and effort while keeping track of delivery progress in real-time.
      </p>
    </div>
  );
}
