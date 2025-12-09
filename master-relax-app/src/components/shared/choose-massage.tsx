import React from 'react';
import { cn } from '@/lib/utils';
import { FiMessageSquare } from 'react-icons/fi';
import getMassages from '@/services/get-prices';
import { Massage } from '@prisma/client';
import { BookMassageCard } from './book-massage-card';
import { CardSkeleton } from './card-skeleton';

interface Props {
  className?: string;
}

export const ChooseMassage: React.FC<Props> = ({ className }) => {
  const [massages, setMassages] = React.useState<Massage[]>([]);
  const [selectedMessage, setSelectedMessage] = React.useState<Massage | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const massages = await getMassages();
        setMassages(massages);
      } catch (error) {
        setIsError(true);
        console.error('Error in ChooseMassage:', error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <div className={cn('pb-4 w-full h-full flex flex-col', className)}>
      <div className="flex items-center gap-2 mb-2">
        <FiMessageSquare color="#d34545" />
        <h3 className="text-[20px] font-medium">Оберіть масаж</h3>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {isLoading
            ? [...Array(9)].map((_, i) => <CardSkeleton className="flex-1" key={i} />)
            : massages.map((massage) => (
                <BookMassageCard
                  name="massageType"
                  key={massage.id}
                  massage={massage}
                  isSelected={selectedMessage?.id === massage.id}
                  onSelect={() => setSelectedMessage(massage)}
                />
              ))}
        </div>
      </div>

      {isError && <h3 className="text-center text-red-500 mt-4">Помилка при завантаженні даних</h3>}
    </div>
  );
};
