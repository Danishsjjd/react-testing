import SearchBox from "../components/SearchBox"

const PlaygroundPage = () => {
  return (
    <SearchBox
      onChange={(value) => {
        alert(value)
      }}
    />
  )
}

export default PlaygroundPage
