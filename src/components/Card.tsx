import Cards from "./globalIterfaces";


interface Props {
  data: { 
    name: string;
    id: number;
    sprite: string;
  }[];
  onClick: (pokemon: Cards) => void;
}

export default function Card({ data, onClick }: Props) {
  return (
    <>
      {data.map((pokemon) => (
        <div className="card" key={pokemon.name} onClick={() => onClick(pokemon)}>
          <img src={pokemon.sprite}  className='sprite' />
        </div>
      ))}
    </>
  );
}
