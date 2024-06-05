import { SearchBar } from './search-bar'
import Placeholder from './placeholder'

export function Browser() {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-start mt-2 mb-4 md:mb-8">
      <SearchBar />
      <Placeholder />
    </div>
  )
}
