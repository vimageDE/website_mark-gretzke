export const Software = ({ software }) => {
  const symbol = '/Software_' + software.replace(' ', '-') + '_128.png';

  return (
    <div>
      <div className="w-16 h-16 bg-contain mx-auto mb-1" style={{ backgroundImage: `url(${symbol})` }}></div>
      <div className="text-xs">{software}</div>
    </div>
  );
};
