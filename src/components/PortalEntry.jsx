import Link from 'next/link';
import React from 'react';

export default function PortalEntry({ portalDescription, location, link, bg }) {
  return (
    <section className="flex flex-col items-center gap-14 mt-20">
      <div className="flex flex-col items-center gap-8">
        <h2 className="text-5xl font-bold ">{location}</h2>
        <p>{portalDescription}</p>
      </div>
      <Link
        className={`border text-white text-4xl p-5 ${bg} rounded-lg outline-none`}
        href={link}
      >
        Go to {location}
      </Link>
    </section>
  );
}
