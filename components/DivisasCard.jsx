import { Sparklines, SparklinesLine } from 'react-sparklines';

const DivisasCard = ({ currency, rate, trendData }) => {
  const isNegativeTrend = trendData[trendData.length - 1] < trendData[0];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h3 className="text-lg font-bold">{currency}</h3>
      <p>Tasa actual: {rate}</p>
      <div className="mt-2">
        <Sparklines data={trendData} limit={10}>
          <SparklinesLine
            color={isNegativeTrend ? 'red' : 'green'}
            style={{ strokeWidth: 3, fill: 'none' }}
          />
        </Sparklines>
        <p className={`text-sm mt-1 ${isNegativeTrend ? 'text-red-500' : 'text-green-500'}`}>
          {isNegativeTrend ? 'Baja' : 'Alza'}
        </p>
      </div>
    </div>
  );
};

export default DivisasCard;
