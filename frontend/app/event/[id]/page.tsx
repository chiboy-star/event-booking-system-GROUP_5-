export default function EventDetail({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Event {params.id}</h1>
    </div>
  );
}