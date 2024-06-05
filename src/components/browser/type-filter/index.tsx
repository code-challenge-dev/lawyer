import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Dispatch, SetStateAction } from 'react'

const TypeFilter = () => {
  return (
    <Select
      value={type}
      onValueChange={(newType) => {
        setType(newType as string)
      }}
    >
      <SelectTrigger
        id="type-filter"
        className="w-[180px]"
        defaultValue="kontrakt"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="žaloba">Žaloba</SelectItem>
        <SelectItem value="předžalobní výzva">Předžalobní Výzva</SelectItem>
        <SelectItem value="kontrakt">Kontrakt</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default TypeFilter
