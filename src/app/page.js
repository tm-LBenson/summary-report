import Header from '@/components/Header';
import PortalEntry from '@/components/PortalEntry';

export default function Home() {
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
          bg="bg-red-400"
        />
        <PortalEntry
          link={'staff-portal'}
          location={'Staff Portal'}
          portalDescription="View student progress and insights."
          bg="bg-slate-400"
        />
      </main>
    </>
  );
}
