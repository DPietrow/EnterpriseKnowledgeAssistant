export default function TradeoffCard({ title, decision, tradeoff }) {
  return (
    <div className="bg-gray-900 p-4 rounded">
      <h3 className="font-bold">{title}</h3>
      <p className="text-green-400 mt-2">Decision: {decision}</p>
      <p className="text-gray-400 mt-2 text-sm">{tradeoff}</p>
    </div>
  );
}