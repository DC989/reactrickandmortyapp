import Character from './Character';

import useFetchCharacters from './useFetchCharacters';

function Characters() {
  const { loading, data, error } = useFetchCharacters();

  return (
    <div className="odds">
      {loading && <div>Characters are loading...</div>}
      {data.length > 0 && <Character data={data} />}
      {error && <div>{`There is a problem fetching the data - ${error}`}</div>}
    </div>
  );
}

export default Characters;
