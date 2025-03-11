export default function Stats({ items }) {
  const numItems = items.length;

  if (!numItems)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    );

  const numPacked = items.reduce((ac, item) => (item.packed ? ac + 1 : ac), 0);
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage !== 100
          ? `💼 You have ${numItems} items on your list, and you already packed ${numPacked} (${percentage}%)`
          : 'You got everything! Ready to go 🛩️'}
      </em>
    </footer>
  );
}
