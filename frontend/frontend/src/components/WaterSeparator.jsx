
export function HorizonSeparator() {
  return (
    <div className="w-full h-16 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-purple-600 opacity-70" />
      <div className="absolute -bottom-1 w-full h-4 bg-white rounded-t-full" />
    </div>
  );
}