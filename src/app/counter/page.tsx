import Counter from '../../components/NewAddCounter';
import Total from '../../components/NewTotal';

export default function Home() {
  return (
    <div>
      <Total />
      <div className="flex justify-center items-center flex-col gap-10 italic text-sm mb-50 mt-50">
        <Counter />
      </div>
    </div>
  );
}
