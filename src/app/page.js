import Header from '@/components/Header';
import PortalEntry from '@/components/PortalEntry';
import axios from 'axios';

async function wakeUpBackend() {
  await axios.get('https://astro-server-z1u9.onrender.com');
}

export default async function Home() {
  try {
    // Send a request to the backend to prevent cold start.
    await wakeUpBackend();
  } catch (error) {
    console.error('Could not wake up backend :(');
  }
  return (
    <>
      <Header
        welcomeMessage="Welcome to Codex Academy"
        description="Select your portal to begin:"
      />
      <main className="flex justify-center gap-20">
        <PortalEntry
          link={'instructor-portal'}
          location={'Instructor Portal'}
          portalDescription="Manage your classes and coursework"
          colors={['bg-red-400', 'hover:bg-red-700', 'focus:bg-red-700']}
        />
        <PortalEntry
          link={'staff-portal'}
          location={'Staff Portal'}
          portalDescription="View student progress and insights."
          colors={['bg-slate-400', 'hover:bg-slate-700', 'focus:bg-slate-700']}
        />
      </main>
    </>
  );
}
