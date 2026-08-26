import Counter from "../components/Counter";

export default async function Page() {
  const res = await fetch("	https://jsonplaceholder.org/users");
  const data = await res.json();

  return (
    <div>
      <h1>Cabins page</h1>

      <ul>
        {data.map((user) => (
          <li key={user.id}>{user.firstname}</li>
        ))}
      </ul>

      <Counter data={data} />
    </div>
  );
}
