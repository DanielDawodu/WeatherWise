import SearchBar from '../SearchBar';

export default function SearchBarExample() {
  const handleSearch = (city: string) => {
    console.log('Searching for city:', city);
  };

  return (
    <div className="p-8">
      <SearchBar onSearch={handleSearch} />
    </div>
  );
}
