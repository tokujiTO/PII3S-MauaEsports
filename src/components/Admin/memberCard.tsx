export default function MemberCard({
  member,
}: {
  member: { name: string; role: string; hours: number };
}) {
  return (
    <div className="bg-deepBlue flex h-24 w-full items-center justify-between rounded-lg p-4 text-4xl text-white">
      <h1 className="mt-auto mb-auto flex w-1/5">{member.name}</h1>
      <h2 className="mt-auto mb-auto flex w-1/5">{member.role}</h2>
      <div className="flex h-4/5 w-1/5 items-center justify-center rounded-lg bg-white text-4xl text-black">
        <div className="flex items-end gap-2 text-black">
          <p>
            {member.hours} <span className="text-xl">horas</span>
          </p>
        </div>
      </div>
    </div>
  );
}
